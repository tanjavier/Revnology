const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

const userController = {
    // Register new user
    async register(req, res) {
        try {
            const { email, phone, password } = req.body;
            
            // Validate input
            if ((!email && !phone) || !password) {
                return res.status(400).json({ error: 'Email/phone and password are required' });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);
            
            // Insert user
            const [result] = await db.execute(
                'INSERT INTO users (email, phone, password) VALUES (?, ?, ?)',
                [email || null, phone || null, hashedPassword]
            );
            
            console.log('User registered:', result.insertId);
            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            console.error('Registration error:', error);
            res.status(500).json({ error: 'Registration failed' });
        }
    },

    // Login user
    async login(req, res) {
        try {
            const { email, phone, password } = req.body;
            
            // Find user
            const [users] = await db.execute(
                'SELECT * FROM users WHERE email = ? OR phone = ?',
                [email || '', phone || '']
            );
            
            if (users.length === 0) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }
            
            const user = users[0];
            const isMatch = await bcrypt.compare(password, user.password);
            
            if (!isMatch) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }
            
            // Update last login
            await db.execute(
                'UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?',
                [user.id]
            );
            
            // Generate token
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
            
            console.log('User logged in:', user.id);
            res.json({ token });
        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({ error: 'Login failed' });
        }
    },

    // Get all users
    async getAllUsers(req, res) {
        try {
            const [users] = await db.execute(
                'SELECT id, email, phone, created_at, last_login, is_active FROM users'
            );
            console.log('Retrieved users count:', users.length);
            res.json(users);
        } catch (error) {
            console.error('Get users error:', error);
            res.status(500).json({ error: 'Failed to get users' });
        }
    },

    // Get single user
    async getUser(req, res) {
        try {
            const [users] = await db.execute(
                'SELECT id, email, phone, created_at, last_login, is_active FROM users WHERE id = ?',
                [req.params.id]
            );
            
            if (users.length === 0) {
                return res.status(404).json({ error: 'User not found' });
            }
            
            console.log('Retrieved user:', users[0].id);
            res.json(users[0]);
        } catch (error) {
            console.error('Get user error:', error);
            res.status(500).json({ error: 'Failed to get user' });
        }
    },

    // Update user
    async updateUser(req, res) {
        try {
            const { email, phone } = req.body;
            const userId = req.params.id;
            
            await db.execute(
                'UPDATE users SET email = ?, phone = ? WHERE id = ?',
                [email, phone, userId]
            );
            
            console.log('Updated user:', userId);
            res.json({ message: 'User updated successfully' });
        } catch (error) {
            console.error('Update user error:', error);
            res.status(500).json({ error: 'Failed to update user' });
        }
    },

    // Delete user
    async deleteUser(req, res) {
        try {
            await db.execute(
                'DELETE FROM users WHERE id = ?',
                [req.params.id]
            );
            
            console.log('Deleted user:', req.params.id);
            res.json({ message: 'User deleted successfully' });
        } catch (error) {
            console.error('Delete user error:', error);
            res.status(500).json({ error: 'Failed to delete user' });
        }
    },

    // Upload profile picture
    async uploadProfilePicture(req, res) {
        try {
            if (!req.file) {
                return res.status(400).json({ error: 'No file uploaded' });
            }

            const filePath = req.file.path;
            
            await db.execute(
                'UPDATE users SET profile_picture = ? WHERE id = ?',
                [filePath, req.user.id]
            );

            console.log('Profile picture uploaded for user:', req.user.id);
            res.json({ message: 'Profile picture uploaded successfully', filePath });
        } catch (error) {
            console.error('Profile picture upload error:', error);
            res.status(500).json({ error: 'Failed to upload profile picture' });
        }
    },

    // Upload document
    async uploadDocument(req, res) {
        try {
            if (!req.file) {
                return res.status(400).json({ error: 'No file uploaded' });
            }

            const filePath = req.file.path;
            
            await db.execute(
                'UPDATE users SET document_path = ? WHERE id = ?',
                [filePath, req.user.id]
            );

            console.log('Document uploaded for user:', req.user.id);
            res.json({ message: 'Document uploaded successfully', filePath });
        } catch (error) {
            console.error('Document upload error:', error);
            res.status(500).json({ error: 'Failed to upload document' });
        }
    },

    // Get user document
    async getUserDocument(req, res) {
        try {
            const [users] = await db.execute(
                'SELECT document_path FROM users WHERE id = ?',
                [req.user.id]
            );

            if (!users[0] || !users[0].document_path) {
                return res.status(404).json({ error: 'Document not found' });
            }

            console.log('Document retrieved for user:', req.user.id);
            res.sendFile(path.resolve(users[0].document_path));
        } catch (error) {
            console.error('Get document error:', error);
            res.status(500).json({ error: 'Failed to retrieve document' });
        }
    }
};

module.exports = userController;