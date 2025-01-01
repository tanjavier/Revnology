const db = require('../config/db');

const orderController = {
    // Create new order
    async createOrder(req, res) {
        try {
            const { items, total_amount } = req.body;
            const userId = req.user.id;

            // Start transaction
            const connection = await db.getConnection();
            await connection.beginTransaction();

            try {
                // Create order
                const [orderResult] = await connection.execute(
                    'INSERT INTO orders (user_id, total_amount) VALUES (?, ?)',
                    [userId, total_amount]
                );

                const orderId = orderResult.insertId;

                // Insert order items
                for (const item of items) {
                    await connection.execute(
                        'INSERT INTO order_items (order_id, product_name, quantity, price) VALUES (?, ?, ?, ?)',
                        [orderId, item.product_name, item.quantity, item.price]
                    );
                }

                await connection.commit();
                console.log('Order created:', orderId);
                res.status(201).json({ message: 'Order created successfully', orderId });
            } catch (error) {
                await connection.rollback();
                throw error;
            } finally {
                connection.release();
            }
        } catch (error) {
            console.error('Create order error:', error);
            res.status(500).json({ error: 'Failed to create order' });
        }
    },

    // Get user's order history
    async getOrderHistory(req, res) {
        try {
            const userId = req.user.id;

            // Get orders with their items
            const [orders] = await db.execute(
                `SELECT o.*, 
                        JSON_ARRAYAGG(
                            JSON_OBJECT(
                                'id', oi.id,
                                'product_name', oi.product_name,
                                'quantity', oi.quantity,
                                'price', oi.price
                            )
                        ) as items
                FROM orders o
                LEFT JOIN order_items oi ON o.id = oi.order_id
                WHERE o.user_id = ?
                GROUP BY o.id
                ORDER BY o.created_at DESC`,
                [userId]
            );

            // Parse the JSON string for items
            const formattedOrders = orders.map(order => ({
                ...order,
                items: JSON.parse(order.items)
            }));

            console.log(`Retrieved ${orders.length} orders for user:`, userId);
            res.json(formattedOrders);
        } catch (error) {
            console.error('Get order history error:', error);
            res.status(500).json({ error: 'Failed to get order history' });
        }
    },

    // Get single order details
    async getOrderDetails(req, res) {
        try {
            const { orderId } = req.params;
            const userId = req.user.id;

            const [orders] = await db.execute(
                `SELECT o.*, 
                        JSON_ARRAYAGG(
                            JSON_OBJECT(
                                'id', oi.id,
                                'product_name', oi.product_name,
                                'quantity', oi.quantity,
                                'price', oi.price
                            )
                        ) as items
                FROM orders o
                LEFT JOIN order_items oi ON o.id = oi.order_id
                WHERE o.id = ? AND o.user_id = ?
                GROUP BY o.id`,
                [orderId, userId]
            );

            if (orders.length === 0) {
                return res.status(404).json({ error: 'Order not found' });
            }

            const order = {
                ...orders[0],
                items: JSON.parse(orders[0].items)
            };

            console.log('Retrieved order details:', orderId);
            res.json(order);
        } catch (error) {
            console.error('Get order details error:', error);
            res.status(500).json({ error: 'Failed to get order details' });
        }
    }
};

module.exports = orderController;