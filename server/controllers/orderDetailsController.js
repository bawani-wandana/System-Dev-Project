const OrderDetails = require('../models/orderDetailsModel');

exports.getOrderDetailsByOrderId = (req, res) => {
    const { orderId } = req.params;
    OrderDetails.getOrderDetailsByOrderId(orderId, (orderDetails) => {
        res.json(orderDetails);
    });
};
