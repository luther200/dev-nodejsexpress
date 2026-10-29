/* UNSUPORT (v4.0.0) -> update Prisma.

import { DatabaseSync } from "node:sqlite";

const db = new DatabaseSync('./data/database.db');

// SQL Exec : 
db.exec(`

    CREATE TABLE IF NOT EXISTS users (
        uid INTEGER PRIMARY KEY AUTOINCREMENT,
        username VARCHAR(25) UNIQUE,
        password VARCHAR(25)

    )
`);

db.exec(`
    
    CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        task TEXT,
        completed BOOLEAN DEFAULT 0,
        FOREIGN KEY(user_id) REFERENCES users(uid)
    )
`);

export default db;

*/