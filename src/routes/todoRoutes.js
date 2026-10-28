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
router.post('/', (req, res) => { 
    const { task } = req.body;
    const insertTodo = db.prepare(`INSERT INTO todos (user_id, task) VALUES (?, ?)`);
    const result = insertTodo.run( req.userId, task);

    res.json({id: result.lastInsertRowid, task, completed: 0});
});

// Update TODO

router.put('/:id', (req, res) => { 
    const { completed } = req.body;
    const { id } = req.params;
    const { page } = req.query;


    const updateTodo = db.prepare(`UPDATE todos SET completed = ? WHERE id = ? `);
    
    updateTodo.run(completed, id);

    res.json({ message: "Todo updated" })


});

// Delete TODO

router.delete('/:id', (req, res) => { 
    const { id } = req.params;
    const { userID } = req.userID
    const deleteTodo = db.prepare(`DELETE FROM todos WHERE id = ? and user_id = ?`);
    deleteTodo.run(id, userID);

    res.send({ message: "Todo remove" })
})

export default router;