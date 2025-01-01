const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const auth = require('../middleware/auth');

router.post('/orders', auth, orderController.createOrder);
router.get('/orders', auth, orderController.getOrderHistory);
router.get('/orders/:orderId', auth, orderController.getOrderDetails);

module.exports = router;