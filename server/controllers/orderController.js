const { getAllOrders, updateOrderStatus } = require('../models/orderModel');

exports.getAllOrders = (req, res) => {

    getAllOrders([], (error, results) => {
        if (error) {
            console.error("Error fetching order details: ", error);
            return res.status(500).json({ error: "Database query error" })
        }  
        console.log(results);
        res.json(results);
    })
};

exports.updateOrderStatus = (req, res) => {
    const { orderId, newStatus } = req.body;
    updateOrderStatus(orderId, newStatus, (result) => {
        res.json(result);
    });
};
