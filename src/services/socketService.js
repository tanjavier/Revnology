const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');

const onlineUsers = new Map();

const setupSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.use((socket, next) => {
        const token = socket.handshake.auth.token;
        if (!token) {
            return next(new Error('Authentication error'));
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            socket.userId = decoded.id;
            next();
        } catch (err) {
            next(new Error('Authentication error'));
        }
    });

    io.on('connection', (socket) => {
        console.log('User connected:', socket.userId);
        onlineUsers.set(socket.userId, socket.id);

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.userId);
            onlineUsers.delete(socket.userId);
        });
    });

    return io;
};

const isUserOnline = (userId) => {
    return onlineUsers.has(userId);
};

module.exports = {
    setupSocket,
    isUserOnline
};