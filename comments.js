// Create web server
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// In-memory data store
let comments = [];

// Create a new comment
app.post('/comments', (req, res) => {
    const { postId, name, email, body } = req.body;
    const newComment = { postId, name, email, body };
    comments.push(newComment);
    res.status(201).json(newComment);
});

// Retrieve all comments
app.get('/comments', (req, res) => {
    res.json(comments);
});

// Retrieve a comment by ID
app.get('/comments/:id', (req, res) => {
    const commentId = parseInt(req.params.id);
    const comment = comments.find(c => c.id === commentId);
    if (!comment) {
        return res.status(404).send('Comment not found');
    }
    res.json(comment);
});

// Update a comment by ID
app.put('/comments/:id', (req, res) => {
    const commentId = parseInt(req.params.id);
    const { postId, name, email, body } = req.body;
    const commentIndex = comments.findIndex(c => c.id === commentId);
    if (commentIndex === -1) {
        return res.status(404).send('Comment not found');
    }
    const updatedComment = { postId, name, email, body };
    comments[commentIndex] = updatedComment;
    res.json(updatedComment);
});

// Delete a comment by ID
app.delete('/comments/:id', (req, res) => {
    const commentId = parseInt(req.params.id);
    const commentIndex = comments.findIndex(c => c.id === commentId);
    if (commentIndex === -1) {
        return res.status(404).send('Comment not found');
    }
    comments.splice(commentIndex, 1);
    res.status(204).send();
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});