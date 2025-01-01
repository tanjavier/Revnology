const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const auth = require('../middleware/auth');

router.post('/payments/create-intent', auth, paymentController.createPaymentIntent);

module.exports = router;