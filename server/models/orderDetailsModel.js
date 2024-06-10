const db = require('../config/databaseConnection');

class OrderDetails {
    static getOrderDetailsByOrderId(orderId, callback) {
        db.query('SELECT * FROM order details WHERE orderID = ?', [orderId], (err, result) => {
            if (err) throw err;
            callback(result);
        });
    }
}

module.exports = OrderDetails;
