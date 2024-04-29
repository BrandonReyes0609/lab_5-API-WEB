
// db.js
import conn from './conn.js';

export async function getAllPosts() {
    const [rows] = await conn.query('SELECT * FROM blog_posts');
    return rows;
}

export async function createPost(title, content) {
    const [result] = await conn.query('INSERT INTO blog_posts (title, content) VALUES (?, ?)', [title, content]);
    return result;
}

export async function getPostById(postId) {
    const [rows] = await conn.query('SELECT * FROM blog_posts WHERE id = ?', [postId]);
    if (rows.length > 0) {
        return rows[0];
    } else {
        return null;
    }
}

export async function updatePost(postId, title, content) {
    const [result] = await conn.query('UPDATE blog_posts SET title = ?, content = ? WHERE id = ?', [title, content, postId]);
    return result;
}

export async function deletePost(postId) {
    const [result] = await conn.query('DELETE FROM blog_posts WHERE id = ?', [postId]);
    return result;
}

/*
//Parte vieja
import conn from './conn.js'

export async function getAllPosts() {
 const [rows] = await conn.query('SELECT * FROM blog_posts')
 return rows
}

*/

/*import conn from './conn.js'

export async function getAllPosts() {
    const [rows] = await conn.query('SELECT * FROM blog_posts')
    return rows
}
export async function createPost(title, content) {
    const [result] = await db.query('INSERT INTO blog_posts (title, content) VALUES (?, ?)', [title, content])
    return result
 }
 */


 /*
 export async function createPost(title, content) {
    const [result] = await db.query('INSERT INTO blog_posts (title, content) VALUES (?, ?)', [title, content])
    return result
 }
 */