// main.js
import express from 'express';
import { getAllPosts, createPost, getPostById, updatePost, deletePost } from './db.js';

const app = express();
const port = 3000;

app.use(express.json());  // Middleware para parsear JSON

// GET /posts - Retrieve all posts
app.get('/posts', async (req, res) => {
    const posts = await getAllPosts();
    res.json(posts);
});

// POST /posts - Create a new post
app.post('/posts', async (req, res) => {
    const { title, content } = req.body;
    const result = await createPost(title, content);
    res.status(201).json({ message: "Post created successfully", postId: result.insertId });
});

// GET /posts/:postId - Retrieve a single post by ID
app.get('/posts/:postId', async (req, res) => {
    const { postId } = req.params;
    const post = await getPostById(postId);
    if (post) {
        res.json(post);
    } else {
        res.status(404).json({ message: "Post not found" });
    }
});

// PUT /posts/:postId - Update a post
app.put('/posts/:postId', async (req, res) => {
    const { postId } = req.params;
    const { title, content } = req.body;
    const result = await updatePost(postId, title, content);
    if (result.affectedRows > 0) {
        res.json({ message: "Post updated successfully" });
    } else {
        res.status(404).json({ message: "Post not found" });
    }
});

// DELETE /posts/:postId - Delete a post
app.delete('/posts/:postId', async (req, res) => {
    const { postId } = req.params;
    const result = await deletePost(postId);
    if (result.affectedRows > 0) {
        res.json({ message: "Post deleted successfully" });
    } else {
        res.status(404).json({ message: "Post not found" });
    }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

//---------------------
/*
import express from 'express';
import { getAllPosts, createPost, getPostById, updatePost, deletePost } from './db.js';

const app = express();
const port = 3000;

app.use(express.json());  // Middleware para parsear JSON

// GET /posts - Retrieve all posts
app.get('/posts', async (req, res) => {
    const posts = await getAllPosts();
    res.json(posts);
});

// POST /posts - Create a new post
app.post('/posts', async (req, res) => {
    const { title, content } = req.body;
    const result = await createPost(title, content);
    res.status(201).json({ message: "Post created successfully", postId: result.insertId });
});

// GET /posts/:postId - Retrieve a single post by ID
app.get('/posts/:postId', async (req, res) => {
    const { postId } = req.params;
    const post = await getPostById(postId);
    if (post) {
        res.json(post);
    } else {
        res.status(404).json({ message: "Post not found" });
    }
});

// PUT /posts/:postId - Update a post
app.put('/posts/:postId', async (req, res) => {
    const { postId } = req.params;
    const { title, content } = req.body;
    const result = await updatePost(postId, title, content);
    if (result.affectedRows > 0) {
        res.json({ message: "Post updated successfully" });
    } else {
        res.status(404).json({ message: "Post not found" });
    }
});

// DELETE /posts/:postId - Delete a post
app.delete('/posts/:postId', async (req, res) => {
    const { postId } = req.params;
    const result = await deletePost(postId);
    if (result.affectedRows > 0) {
        res.json({ message: "Post deleted successfully" });
    } else {
        res.status(404).json({ message: "Post not found" });
    }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

*/
//---------------------------------------
/*
//A
import express from 'express'

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Server listening at http://127.0.0.1:${port}`)
})
*/
//... resto de su codigo 
/*import express from 'express'

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Server listening at http://127.0.0.1:${port}`)
})
*/