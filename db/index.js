const Database = require('better-sqlite3');
const path = require('path');

class ChatDatabase {
    constructor() {
        this.db = new Database(path.join(__dirname, 'chatterbox.db'));
        this.init();
    }

    init() {
        this.db.exec('PRAGMA foreign_keys = ON');

        this.db.exec(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                login TEXT NOT NULL UNIQUE,
                firstName TEXT NOT NULL,
                lastName TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL
            )
        `);

        this.db.exec(`
            CREATE TABLE IF NOT EXISTS servers (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                description TEXT,
                admin_user_id INTEGER,
                FOREIGN KEY (admin_user_id) REFERENCES users(id)
            )
        `);

        this.db.exec(`
            CREATE TABLE IF NOT EXISTS channels (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                description TEXT,
                moderator_user_id INTEGER,
                server_id INTEGER,
                FOREIGN KEY (moderator_user_id) REFERENCES users(id),
                FOREIGN KEY (server_id) REFERENCES servers(id)
            )
        `);

        this.db.exec(`
            CREATE TABLE IF NOT EXISTS messages (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                timestamp REAL NOT NULL,
                user_id INTEGER,
                channel_id INTEGER,
                message TEXT NOT NULL,
                FOREIGN KEY (user_id) REFERENCES users(id),
                FOREIGN KEY (channel_id) REFERENCES channels(id)
            )
        `);
    }

    createUser(user) {
        const stmt = this.db.prepare(`
            INSERT INTO users (login, firstName, lastName, email, password)
            VALUES (@login, @firstName, @lastName, @email, @password)
        `);
        return stmt.run(user);
    }

    getUsers() {
        return this.db.prepare('SELECT * FROM users').all();
    }

    createServer(server) {
        const stmt = this.db.prepare(`
            INSERT INTO servers (name, description, admin_user_id)
            VALUES (@name, @description, @admin_user_id)
        `);
        return stmt.run(server);
    }

    getServers() {
        return this.db.prepare('SELECT * FROM servers').all();
    }

    createChannel(channel) {
        const stmt = this.db.prepare(`
            INSERT INTO channels (name, description, moderator_user_id, server_id)
            VALUES (@name, @description, @moderator_user_id, @server_id)
        `);
        return stmt.run(channel);
    }

    getChannels(serverId) {
        return this.db.prepare('SELECT * FROM channels WHERE server_id = ?').all(serverId);
    }

    createMessage(message) {
        const stmt = this.db.prepare(`
            INSERT INTO messages (timestamp, user_id, channel_id, message)
            VALUES (@timestamp, @user_id, @channel_id, @message)
        `);
        return stmt.run(message);
    }

    getMessages(channelId) {
        return this.db.prepare('SELECT * FROM messages WHERE channel_id = ? ORDER BY timestamp DESC').all(channelId);
    }
}

module.exports = new ChatDatabase();
