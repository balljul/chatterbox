const express = require('express');
const router = express.Router();
const { servers } = require('../data/servers');

router.get('/', (req, res) => {
    res.json({ serverIds: Object.keys(servers.servers) });
});

router.get('/:serverId', (req, res) => {
    const server = servers.servers[req.params.serverId];
    if (!server) {
        return res.status(404).json({ error: 'Server not found' });
    }
    const { channels, ...serverInfo } = server;
    res.json(serverInfo);
});

router.get('/:serverId/channel', (req, res) => {
    const server = servers.servers[req.params.serverId];
    if (!server) {
        return res.status(404).json({ error: 'Server not found' });
    }
    res.json({ channelIds: Object.keys(server.channels) });
});

router.get('/:serverId/channel/:channelId', (req, res) => {
    const server = servers.servers[req.params.serverId];
    if (!server) {
        return res.status(404).json({ error: 'Server not found' });
    }
    const channel = server.channels[req.params.channelId];
    if (!channel) {
        return res.status(404).json({ error: 'Channel not found' });
    }
    res.json(channel);
});

module.exports = router;
