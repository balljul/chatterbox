const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
    try {
        const users = db.getUsers();
        res.json({ users });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', (req, res) => {
    try {
        const { login, firstName, lastName, email, password } = req.body;
        if (!login || !firstName || !lastName || !email || !password) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const result = db.createUser({
            login,
            firstName,
            lastName,
            email,
            password
        });

        res.status(201).json({ 
            id: result.lastInsertRowid,
            login,
            firstName,
            lastName,
            email
        });
    } catch (error) {
        if (error.code === 'SQLITE_CONSTRAINT') {
            res.status(409).json({ error: 'User already exists' });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
});

module.exports = router;
