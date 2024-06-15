const db = require("../config/databaseConnection");

const CheckoutModel = {
    getAddress: (userId, callback) => {
        console.log('Fetching address for userId:', userId); // Log the userId
        const sqlGetAddress = `
          SELECT u.firstName, u.phoneNumber, u.email, a.street, a.district, a.city, a.postalCode, a.addressID
          FROM address a
          JOIN users u ON u.userID = a.userID
          WHERE u.userID = ?
        `;
        db.query(sqlGetAddress, [userId], (error, results) => {
          if (error) {
            console.error('Database query error:', error);
          } else {
            console.log('Query results:', results); // Log the query results
          }
          callback(error, results);
        });
      },

    getCartByUserId: async (userId, callback) => {
        const cartQuery = "SELECT * FROM cart WHERE userID = ?";
        db.query(cartQuery, [userId], callback);
    },

    getCartItemsByCartId: async (cartID, callback) => {
        const cartItemsQuery = `SELECT * 
    FROM cart_details cd 
    JOIN cart c ON c.cartID = cd.cartID WHERE c.cartID = ?`;
        db.query(cartItemsQuery, [cartID], callback);
    },



    createPayment: (paymentData, callback) => {
        db.query('INSERT INTO payments SET ?', paymentData, (error, results) => {
            if (error) {
                return callback(error);
            }
            callback(null, { insertId: results.insertId });
        });
    },


    createOrder: (orderData, callback) => {
        db.query("INSERT INTO orders SET ?", orderData, (error, results) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, { insertId: results.insertId }); // Include the inserted ID in the response
            }
        });
    },

    createOrderDetails: (orderDetails, callback) => {
        db.query(
            "INSERT INTO 'order details' (orderID, itemID, quantity) VALUES ?",
            [
                orderDetails.map((detail) => [
                    detail.orderID,
                    detail.itemID,
                    detail.quantity,
                ]),
            ],
            callback
        );
    },

    clearCart: (cartId, callback) => {
        db.query(`DELETE 
    FROM cart_details 
    WHERE cartID = ?`, [cartId], callback);
    },

};

module.exports = CheckoutModel;