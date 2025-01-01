const express = require('express');
const cors = require('cors');
const http = require('http');
const path = require('path');
const passport = require('passport');
require('dotenv').config();
require('./config/socialAuth');

const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const socialAuthRoutes = require('./routes/socialAuthRoutes');
const scheduleUserCleanup = require('./jobs/userCleanup');
const { setupSocket } = require('./services/socketService');

const app = express();
const server = http.createServer(app);

// Setup Socket.io
setupSocket(server);

// Middleware
app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api', userRoutes);
app.use('/api', orderRoutes);
app.use('/api', paymentRoutes);
app.use('/api', socialAuthRoutes);

// Start cleanup job
scheduleUserCleanup();

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});