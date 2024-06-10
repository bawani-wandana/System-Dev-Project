const db = require('../config/databaseConnection');

const Cart = {
    create: (userID) => {
        return new Promise((resolve, reject) => {
            db.query(
                'INSERT INTO cart (userID, createdDate, cartStatus) VALUES (?, NOW(), "active")',
                [userID],
                (err, result) => {
                    if (err) return reject(err);
                    resolve(result.insertId);
                }
            );
        });
    },

    findByUserId: (userID) => {
        return new Promise((resolve, reject) => {
            db.query(
                'SELECT * FROM cart WHERE userID = ? AND cartStatus = "active"',
                [userID],
                (err, rows) => {
                    if (err) return reject(err);
                    resolve(rows[0]);
                }
            );
        });
    },

    deleteCart: (cartID) => {
        return new Promise((resolve, reject) => {
            db.query(
                'DELETE FROM cart WHERE cartID = ?',
                [cartID],
                (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                }
            );
        });
    },

    
};

module.exports = Cart;
