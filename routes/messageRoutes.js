const express = require('express');
const router = express.Router();
const { messages } = require('../data/messages');

router.get('/server/:serverId/channel/:channelId/message', (req, res) => {
    const { serverId, channelId } = req.params;
    const count = parseInt(req.query.count) || 100;

    const channelMessages = Object.values(messages.messages)
        .filter(msg => msg.channelId === channelId && msg.serverId === serverId)
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .slice(0, count);

    res.json({ messages: channelMessages });
});

router.get('/server/:serverId/channel/:channelId/message/:messageId', (req, res) => {
    const { messageId } = req.params;
    const message = messages.messages[messageId];

    if (!message) {
        return res.status(404).json({ error: 'Message not found' });
    }

    res.json(message);
});

module.exports = router;
