import pool from './conn.js'

export async function getAllPosts() {
  try {
    const [rows] = await pool.query('SELECT * FROM post')
    return rows
  } catch (error) {
    console.error('Error al obtener todos los posts:', error)
    throw error
  }
}

export async function createPost(title, content) {
  try {
    const [result] = await pool.query('INSERT INTO post (title, content) VALUES (?, ?)', [title, content])
    return result
  } catch (error) {
    console.error('Error al crear un nuevo post:', error)
    throw error
  }
}

