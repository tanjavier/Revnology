const jwt = require('jsonwebtoken');

const socialAuthController = {
    handleGoogleCallback(req, res) {
        try {
            // Generate JWT token
            const token = jwt.sign(
                { id: req.user.id },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );

            // Redirect to frontend with token
            res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${token}`);
        } catch (error) {
            console.error('Social auth callback error:', error);
            res.redirect(`${process.env.FRONTEND_URL}/auth/error`);
        }
    },

    handleAuthError(req, res) {
        res.status(401).json({ error: 'Authentication failed' });
    }
};

module.exports = socialAuthController;