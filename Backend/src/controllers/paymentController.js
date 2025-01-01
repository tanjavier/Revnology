const paymentService = require('../services/paymentService');
const db = require('../config/db');

const paymentController = {
    async createPaymentIntent(req, res) {
        try {
            const { amount, orderId } = req.body;

            // Verify order belongs to user
            const [orders] = await db.execute(
                'SELECT * FROM orders WHERE id = ? AND user_id = ?',
                [orderId, req.user.id]
            );

            if (orders.length === 0) {
                return res.status(404).json({ error: 'Order not found' });
            }

            const paymentIntent = await paymentService.createPaymentIntent(amount);

            console.log('Payment intent created for order:', orderId);
            res.json({
                clientSecret: paymentIntent.client_secret
            });
        } catch (error) {
            console.error('Create payment intent error:', error);
            res.status(500).json({ error: 'Payment initialization failed' });
        }
    }
};

module.exports = paymentController;