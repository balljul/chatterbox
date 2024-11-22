let currentServer = 'server1';
let currentChannel = 'channel1';

document.addEventListener('DOMContentLoaded', () => {
    fetchServers();
    fetchChannels(currentServer);
    fetchMessages();
    setupMessageInput();
});

async function fetchServers() {
    try {
        const response = await fetch('http://localhost:3000/server');
        const data = await response.json();
        const serverList = document.getElementById('server-list');

        serverList.innerHTML = data.serverIds.map(serverId => `
            <div class="channel-item ${serverId === currentServer ? 'active' : ''}"
                 onclick="selectServer('${serverId}')">
                <span class="online-indicator"></span>
                ${serverId}
            </div>
        `).join('');
    } catch (error) {
        console.error('Error fetching servers:', error);
    }
}

async function fetchChannels(serverId) {
    try {
        const response = await fetch(`http://localhost:3000/server/${serverId}/channel`);
        const data = await response.json();
        const channelList = document.getElementById('channel-list');

        channelList.innerHTML = data.channelIds.map(channelId => `
            <div class="channel-item ${channelId === currentChannel ? 'active' : ''}"
                 onclick="selectChannel('${channelId}')">
                <span>#</span>
                ${channelId}
            </div>
        `).join('');
    } catch (error) {
        console.error('Error fetching channels:', error);
    }
}

async function fetchMessages() {
    try {
        const response = await fetch(
            `http://localhost:3000/server/${currentServer}/channel/${currentChannel}/message?count=100`
        );
        const data = await response.json();
        const messagesContainer = document.getElementById('messages');

        messagesContainer.innerHTML = data.messages.map(msg => `
            <div class="message">
                <div class="message-avatar"></div>
                <div class="message-content">
                    <div class="message-header">
                        <span class="message-author">${msg.userId}</span>
                        <span class="message-time">
                            ${new Date(msg.timestamp).toLocaleString()}
                        </span>
                    </div>
                    <div class="message-text">${msg.content}</div>
                </div>
            </div>
        `).join('');

        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    } catch (error) {
        console.error('Error fetching messages:', error);
    }
}

function selectServer(serverId) {
    currentServer = serverId;
    document.querySelectorAll('#server-list .channel-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`#server-list .channel-item[onclick*="${serverId}"]`).classList.add('active');
    fetchChannels(serverId);
    document.getElementById('current-channel').textContent = 'general';
    fetchMessages();
}

function selectChannel(channelId) {
    currentChannel = channelId;
    document.querySelectorAll('#channel-list .channel-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`#channel-list .channel-item[onclick*="${channelId}"]`).classList.add('active');
    document.getElementById('current-channel').textContent = channelId;
    fetchMessages();
}

function setupMessageInput() {
    const messageInput = document.getElementById('message-input');
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const message = messageInput.value.trim();
            if (message) {
                messageInput.value = '';
                fetchMessages();
            }
        }
    });
}
