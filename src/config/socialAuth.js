const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const db = require('./db');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/api/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // Check if user exists
        const [users] = await db.execute(
            'SELECT * FROM users WHERE email = ?',
            [profile.emails[0].value]
        );

        if (users.length > 0) {
            // Update last login
            await db.execute(
                'UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?',
                [users[0].id]
            );
            return done(null, users[0]);
        }

        // Create new user if doesn't exist
        const [result] = await db.execute(
            'INSERT INTO users (email, is_active) VALUES (?, true)',
            [profile.emails[0].value]
        );

        const [newUser] = await db.execute(
            'SELECT * FROM users WHERE id = ?',
            [result.insertId]
        );

        done(null, newUser);
    } catch (error) {
        done(error, null);
    }
}));