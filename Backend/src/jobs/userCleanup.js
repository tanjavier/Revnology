const schedule = require('node-schedule');
const db = require('../config/db');

// Schedule job to run every day at midnight
const scheduleUserCleanup = () => {
    schedule.scheduleJob('0 0 * * *', async () => {
        try {
            console.log('Running user cleanup job...');
            const [result] = await db.execute(`
                DELETE FROM users 
                WHERE last_login < DATE_SUB(NOW(), INTERVAL 1 MONTH)
                AND is_active = true
            `);
            console.log(`Cleaned up ${result.affectedRows} inactive users`);
        } catch (error) {
            console.error('User cleanup job failed:', error);
        }
    });
};

module.exports = scheduleUserCleanup;