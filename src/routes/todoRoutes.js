import express from 'express';
import db from '../db.js';

const router = express.Router();

// Login: 
router.get('/get', (req, res) => { });


// Create TODO
router.post('/', (req, res) => { });

// Update TODO

router.put('/:id', (req, res) => { });

// Delete TODO

router.delete('/:id', (req, res) => { })

export default router;