const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/channel/:channelId', (req, res) => {
    try {
        const messages = db.getMessages(req.params.channelId);
        res.json({ messages });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/channel/:channelId', (req, res) => {
    try {
        const { user_id, message } = req.body;
        const channel_id = req.params.channelId;
        
        if (!user_id || !message) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const result = db.createMessage({
            timestamp: Date.now() / 1000,
            user_id,
            channel_id,
            message
        });

        res.status(201).json({
            id: result.lastInsertRowid,
            timestamp: Date.now() / 1000,
            user_id,
            channel_id,
            message
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
