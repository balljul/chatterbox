const express = require('express');
const router = express.Router();
const { users } = require('../data/users');

router.get('/', (req, res) => {
    res.json({ userIds: Object.keys(users.users) });
});

router.get('/:userId', (req, res) => {
    const user = users.users[req.params.userId];
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
});

module.exports = router;
