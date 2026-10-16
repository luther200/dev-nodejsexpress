import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../db.js';
import 'dotenv/config';
import { bytes } from 'node:stream/consumers';

const router = express.Router();

// register -> /auth/register
router.post('/register', (req, res) => {
    const {username, password} = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);
    
    // save new user with hashed passwd
    try {
        //create user
        const insertUser = db.prepare(`INSERT INTO users (username, password) VALUES ( ?, ? )`);
        const result = insertUser.run(username, hashedPassword);

        //default todo:
        const defaultTodo = `Hello ! Add your first todo! `
        const insertTodo = db.prepare(`INSERT INTO todos (user_id, task) 
            VALUES (?, ?)`);
        insertTodo.run(result.lastInsertRowid, defaultTodo);

        //create token:
        const token = jwt.sign({id: result.lastInsertRowid}, process.env.JWT_SECRET, {expiresIn: '24h'});
        
        res.json({ token });

    } catch(err) {
        console.log(err.message);
        res.sendStatus(503);
    }

});

router.post('/login', (req, res) => {
    // receive the email, look up password associated 
    // compare encrypted password received with the entered password

    const {username, password} = req.body;

    // encrypt passwd: 
    const hashedPassword = bcrypt.hashSync(password, 8);

    res.sendStatus(201);
});

export default router;