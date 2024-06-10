const db = require('../config/databaseConnection');


const getAllOrders = (values, callback) => {
    const sqlGetAllOrders =
        `SELECT o.orderID, o.orderDate, o.orderType, o.totalAmount, o.orderStatus, u.firstName, u.phoneNumber, 
         CONCAT(a.street, ', ', a.city) AS shippingAddress,
         p.paymentMethod, p.paymentDate, p.paymentStatus
         FROM orders o
         JOIN users u ON o.userID = u.userID
         JOIN address a ON u.userID = a.userID
         JOIN cart c ON c.userID = u.userID
         JOIN payments p ON p.cartID = c.cartID
         `;
    db.query(sqlGetAllOrders, [values], callback);
}

const updateOrderStatus = (orderId, newStatus, callback) => {
    db.query('UPDATE orders SET orderStatus = ? WHERE orderID = ?', [newStatus, orderId], (err, result) => {
        if (err) throw err;
        callback(result);
    });
}

module.exports = { getAllOrders, updateOrderStatus };
