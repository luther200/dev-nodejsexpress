import express from 'express';
import db from '../db.js';

const router = express.Router();

// Login: 
router.get('/', (req, res) => {
    const getTodos = db.prepare(`SELECT * FROM todos WHERE user_id = ?`);
    const todos = getTodos.all(req.userId);
    res.json(todos);
 });


// Create TODO
router.post('/', (req, res) => { });

// Update TODO

router.put('/:id', (req, res) => { });

// Delete TODO

router.delete('/:id', (req, res) => { })

export default router;