/*
import express from 'express';
import db from '../db.js'; // Cambiar según cómo exportes la conexión a la base de datos en conn.js o db.js

const router = express.Router();
*/
// ... aquí irían todos los endpoints para '/posts' como los GET, POST, etc.
// El código sería similar al que te proporcioné en respuestas anteriores.
//-----------------------------------------
import express from 'express';
import db from '../db/index.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM posts');
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/:postId', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM posts WHERE id = ?', [req.params.postId]);
        if (rows.length > 0) {
            res.status(200).json(rows[0]);
        } else {
            res.status(404).json({ error: 'Post not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { title, content } = req.body;
        const [result] = await db.query('INSERT INTO posts (title, content) VALUES (?, ?)', [title, content]);
        const [created] = await db.query('SELECT * FROM posts WHERE id = ?', [result.insertId]);
        res.status(200).json(created[0]);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/:postId', async (req, res) => {
    try {
        const { title, content } = req.body;
        await db.query('UPDATE posts SET title = ?, content = ? WHERE id = ?', [title, content, req.params.postId]);
        const [updated] = await db.query('SELECT * FROM posts WHERE id = ?', [req.params.postId]);
        res.status(200).json(updated[0]);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete('/:postId', async (req, res) => {
    try {
        await db.query('DELETE FROM posts WHERE id = ?', [req.params.postId]);
        res.status(204).end();
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;

//------------------------------------------
//export default router;
