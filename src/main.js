//Lab 5: Server Side Javascript
//Brandon Reyes Morales 22992	
//22992

//const express = require('express');

//import express from 'express';
const express = require('express');
const pool = require('./conn.js')
const fs = require('fs')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerSpec = require('../swaggerConfig')
const app = express()
const port = process.env.PORT || 3000

// Habilita CORS para permitir que tu API reciba solicitudes de otros dominios
app.use(cors());

// Habilita el middleware de express.json para parsear cuerpos de solicitud en formato JSON
app.use(express.json());


// Sirve la interfaz de usuario de Swagger para acceder a la documentación de la API, definida en `swaggerSpec`
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware para manejar errores específicos de formato JSON incorrecto en las solicitudes entrantes
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    res.status(400).send('Formato JSON No correcto en la solicitud del body');
  } else {
    next(); // Pasa el control al siguiente middleware si no es un error de JSON
  }
});

// Middleware que registra cada solicitud recibida, incluyendo método, URL y cuerpo de la solicitud
app.use((req, res, next) => {
  const timestamp = new Date().toISOString(); // Obtiene el timestamp actual en formato ISO
  const logMessage = `${timestamp} - Método: ${req.method}, URL: ${req.originalUrl}, Payload: ${JSON.stringify(req.body)}\n`; // Crea un mensaje de log
  fs.appendFile('log.txt', logMessage, (err) => { // Añade el mensaje de log al archivo 'log.txt'
    if (err) {
      console.error('Error al escribir en el archivo de log:', err);
    }
  });
  next(); // Pasa el control al siguiente middleware
});

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Obtiene una lista de todos los posts
 *     description: Retorna un array de posts desde la base de datos.
 *     responses:
 *       200:
 *         description: Una lista de posts.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Error al obtener posts"
 */

// GET /posts - Función return posts
app.get('/posts', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM post')
    res.status(200).json(rows)
  } catch (error) {
    console.error('Error al obtener posts:', error)
    res.status(500).send('Error al obtener posts')
  }
})

/**
 * @swagger
 * /posts/{postId}:
 *   get:
 *     summary: Obtiene un post específico por su ID
 *     description: Retorna los detalles de un post específico basado en el ID proporcionado en la URL.
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del post a obtener
 *     responses:
 *       200:
 *         description: Detalles del post encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: Post no encontrado.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Post no encontrado"
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Error al obtener el post"
 */

// GET /posts/:postId - Función para retornar un post específico
app.get('/posts/:postId', async (req, res) => {
  const postId = req.params.postId
  try {
    const [rows] = await pool.query('SELECT * FROM post WHERE id = ?', postId)
    if (rows.length === 0) {
      res.status(404).send('Post no encontrado')
    } else {
      res.status(200).json(rows[0])
    }
  } catch (error) {
    console.error('Error al obtener el post:', error)
    res.status(500).send('Error al obtener el post')
  }
})

// POST /posts - Función para crear un nuevo post
/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Crea un nuevo post
 *     description: Inserta un nuevo post en la base de datos utilizando los datos proporcionados en el cuerpo de la solicitud.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *                 description: Título del post.
 *                 example: "Un nuevo título"
 *               content:
 *                 type: string
 *                 description: Contenido del post.
 *                 example: "Contenido del nuevo post"
 *               banner:
 *                 type: string
 *                 description: URL del banner o imagen del post.
 *                 example: "https://example.com/banner.jpg"
 *               locationU:
 *                 type: string
 *                 description: Ubicación asociada con el post.
 *                 example: "Ciudad, País"
 *     responses:
 *       201:
 *         description: Post creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 affectedRows:
 *                   type: integer
 *                   description: Número de filas afectadas.
 *                   example: 1
 *       400:
 *         description: Información faltante o inválida en el cuerpo de la solicitud.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Por favor, proporcione un título y un contenido para el post"
 *       500:
 *         description: Error interno al intentar crear el post.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Error al crear el post"
 */

// POST /posts - Función para crear un nuevo post
app.post('/posts', async (req, res) => {
  const {title, content, banner, locationU} = req.body
  if (!title || !content) {
    return res.status(400).send('Por favor, proporcione un título y un contenido para el post')
  }
  try {
    const [result] = await pool.query('INSERT INTO post (title, content, banner, locationU) VALUES (?, ?, ?, ?)', [title, content, locationU || '', locationU || 0])
    res.status(201).json(result)
  } catch (error) {
    console.error('Error en la creación del post:', error)
    res.status(500).send('Error al creación el post')
  }
})

// PUT /posts/:postId - Función para modificar un post existente
/**
 * @swagger
* /posts/{postId}:
 *   put:
 *     summary: Modifica un post existente
 *     description: Actualiza los detalles de un post existente basado en el ID proporcionado en la URL y los datos suministrados en el cuerpo de la solicitud.
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del post que se va a modificar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *                 description: Título del post.
 *                 example: "Título actualizado"
 *               content:
 *                 type: string
 *                 description: Contenido del post.
 *                 example: "Contenido actualizado"
 *               banner:
 *                 type: string
 *                 description: URL del banner o imagen del post, opcional.
 *                 example: "https://example.com/banner_updated.jpg"
 *               locationU:
 *                 type: string
 *                 description: Ubicación asociada con el post, opcional.
 *                 example: "Ciudad actualizada, País"
 *     responses:
 *       200:
 *         description: Post actualizado correctamente.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Post actualizado correctamente"
 *       400:
 *         description: Información faltante o inválida en el cuerpo de la solicitud.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Por favor, proporcione un título y un contenido para el post"
 *       404:
 *         description: Post no encontrado.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Post no encontrado"
 *       500:
 *         description: Error interno al intentar actualizar el post.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Error al actualizar el post"
 */

// PUT /posts/:postId - Función para modificar un post existente
app.put('/posts/:postId', async (req, res) => {
  const postId = req.params.postId
  const {title, content, banner, locationU} = req.body
  if (!title || !content) {
    return res.status(400).send('Ingrese  un título y un contenido para el post')
  }
  try {
    const [result] = await pool.query('UPDATE post SET title = ?, content = ?, banner = ?, locationU = ? WHERE id = ?', [title, content, banner || '', locationU || 0, postId])
    if (result.affectedRows === 0) {
      return res.status(404).send('Post no encontrado')
    }
    res.status(200).send('Post actualizado correctamente')
  } catch (error) {
    console.error('Error al actualizar el post:', error)
    res.status(500).send('Error al actualizar el post')
  }
})

// DELETE /posts/:postId - Función para borrar un post existente
/**
 * @swagger
 * /posts/{postId}:
 *   delete:
 *     summary: Borra un post existente
 *     description: Elimina un post existente de la base de datos basándose en el ID proporcionado.
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del post que se va a eliminar
 *     responses:
 *       204:
 *         description: Post eliminado correctamente. No se devuelve contenido.
 *       404:
 *         description: Post no encontrado.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Post no encontrado"
 *       500:
 *         description: Error interno al intentar borrar el post.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Error no se borro el post"
 */

// DELETE /posts/:postId - Función para borrar un post que exista
app.delete('/posts/:postId', async (req, res) => {
  const postId = req.params.postId
  try {
    const [result] = await pool.query('DELETE FROM post WHERE id = ?', postId)
    if (result.affectedRows === 0) {
      return res.status(404).send('Post no encontrado')
    }
    res.status(204).send('Post Borrado')

    //res.status(204).send()
  } catch (error) {
    console.error('Error no se borro el post:', error)
    res.status(500).send('Error no se borro el post')
  }
})

// Middleware para manejar cualquier solicitud HTTP que no esté implementada  
app.use((req, res) => {
  res.status(501).send('Método HTTP no implementado')
})

// Inicia el servidor en el puerto especificado y registra un mensaje en la consola
app.listen(port, () => {
  console.log(`Servidor Express corriendo en http://127.0.0.1:${port}`)
})

