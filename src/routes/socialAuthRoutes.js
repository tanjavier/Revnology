const express = require('express');
const passport = require('passport');
const router = express.Router();
const socialAuthController = require('../controllers/socialAuthController');

// Google OAuth routes
router.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/auth/google/callback',
    passport.authenticate('google', { 
        failureRedirect: '/api/auth/error',
        session: false 
    }),
    socialAuthController.handleGoogleCallback
);

router.get('/auth/error', socialAuthController.handleAuthError);

module.exports = router;