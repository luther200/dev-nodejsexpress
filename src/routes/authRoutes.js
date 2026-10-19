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

    try {

        const getUser = db.prepare(`SELECT * FROM users WHERE username= ? `);
//        getUser.run(username);
        const user = getUser.get(username);
        
        // if no user associated:
        if (!user) { return res.status(404).send({ message: "User not fount" }) }
        console.log(user);
        // compare passwd:
        const passwordIsValid = bcrypt.compareSync(password, user.password);
        // return invalid password:
        if (!passwordIsValid) { return res.status(401).send({ message: "Invalid password"}) };

        // if password is correct:
        
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: "24h"});
        res.json({ token });

    } catch (err) {
        console.log(err.message);
        res.sendStatus(503);
    }

});

export default router;