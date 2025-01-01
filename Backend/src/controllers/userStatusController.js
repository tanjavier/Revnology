const { isUserOnline } = require('../services/socketService');

const userStatusController = {
    async checkUserStatus(req, res) {
        try {
            const { userId } = req.params;
            const online = isUserOnline(parseInt(userId));
            
            res.json({ 
                userId, 
                online,
                lastChecked: new Date().toISOString()
            });
        } catch (error) {
            console.error('Check user status error:', error);
            res.status(500).json({ error: 'Failed to check user status' });
        }
    }
};

module.exports = userStatusController;