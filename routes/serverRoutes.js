const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
    try {
        const servers = db.getServers();
        res.json({ servers });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', (req, res) => {
    try {
        const { name, description, admin_user_id } = req.body;
        if (!name || !admin_user_id) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const result = db.createServer({
            name,
            description,
            admin_user_id
        });

        res.status(201).json({ 
            id: result.lastInsertRowid,
            name,
            description,
            admin_user_id
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:serverId/channels', (req, res) => {
    try {
        const channels = db.getChannels(req.params.serverId);
        res.json({ channels });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/:serverId/channels', (req, res) => {
    try {
        const { name, description, moderator_user_id } = req.body;
        const server_id = req.params.serverId;

        if (!name || !moderator_user_id) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const result = db.createChannel({
            name,
            description,
            moderator_user_id,
            server_id
        });

        res.status(201).json({
            id: result.lastInsertRowid,
            name,
            description,
            moderator_user_id,
            server_id
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
