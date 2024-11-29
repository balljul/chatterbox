const express = require('express');
const path = require('path');

const userRoutes = require('./routes/userRoutes');
const serverRoutes = require('./routes/serverRoutes');
const messageRoutes = require('./routes/messageRoutes');

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, 'static')));

app.use('/api/users', userRoutes);
app.use('/api/servers', serverRoutes);
app.use('/api/messages', messageRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
