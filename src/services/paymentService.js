const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const paymentService = {
    async createPaymentIntent(amount, currency = 'usd') {
        try {
            const paymentIntent = await stripe.paymentIntents.create({
                amount: Math.round(amount * 100), // Convert to cents
                currency: currency
            });

            return paymentIntent;
        } catch (error) {
            console.error('Stripe payment intent error:', error);
            throw error;
        }
    }
};

module.exports = paymentService;