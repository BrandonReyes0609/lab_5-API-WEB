// conn.js

import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'blog_comida_uvg',
    password: '116611',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Función para probar la conexión al iniciar la aplicación
async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('Conexión exitosa a la base de datos!');
        connection.release();  // Es importante liberar la conexión
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
    }
}

testConnection();

export default pool;
/*
//---------------------------- ultima coneccion
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'mysql',
    database: 'blog_comida_uvg',
    password: '116611',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default pool;
//________________________
*/
/*
//-----------------------------
import mysql from 'mysql2/promise'

const pool = mysql.createPool({
    host: 'localhost',
    user: 'mysql',
    database: 'blog_comida_uvg',
    password: '116611',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

export default pool
//----------------------------

*/
/*
import mysql from 'mysql2/promise'; // Asegúrate de incluir el punto y coma al final

// La configuración de la conexión debe estar correctamente indentada
const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'mariadb',
  database: 'blog_comida_uvg',
  password: '116611',
  waitForConnections: true,
  connectionLimit: 10, // La opción debe ser en minúsculas
  queueLimit: 0,
}); // Añadir una coma al final y punto y coma

export default pool; // Punto y coma al final
*/