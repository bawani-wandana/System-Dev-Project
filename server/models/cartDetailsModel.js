const db = require('../config/databaseConnection');

const CartDetails = {
    addItem: (cartID, itemID, quantity, comment) => {
        return new Promise((resolve, reject) => {
            db.query(
                'INSERT INTO cart_details (cartID, itemID, quantity, comment) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE quantity = quantity + ?',
                [cartID, itemID, quantity, quantity, comment],
                (err, results) => {
                    if (err) return reject(err);
                    resolve(results);
                }
            );
        });
    },

    updateItemQuantity: (cartID, itemID, quantity) => {
        return new Promise((resolve, reject) => {
            db.query(
                'UPDATE cart_details SET quantity = ? WHERE cartID = ? AND itemID = ?',
                [quantity, cartID, itemID],
                (err, results) => {
                    if (err) return reject(err);
                    resolve(results);
                }
            );
        });
    },

    getItemQuantity: (cartID, itemID) => {
        return new Promise((resolve, reject) => {
            db.query(
                'SELECT quantity FROM cart_details WHERE cartID = ? AND itemID = ?',
                [cartID, itemID],
                (err, results) => {
                    if (err) return reject(err);
                    resolve(results[0]?.quantity || 0);
                }
            );
        });
    },

    removeItem: (cartID, itemID) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT quantity FROM cart_details WHERE cartID = ? AND itemID = ?', [cartID, itemID], (err, results) => {
                if (err) return reject(err);

                const itemQuantity = results[0]?.quantity;
                if (itemQuantity !== undefined) {
                    db.query('DELETE FROM cart_details WHERE cartID = ? AND itemID = ?', [cartID, itemID], (err) => {
                        if (err) return reject(err);
                        resolve(itemQuantity);
                    });
                } else {
                    reject(new Error('Item not found in cart'));
                }
            });
        });
    },

    clearCart: (cartID) => {
        return new Promise((resolve, reject) => {
            db.query(
                'DELETE FROM cart_details WHERE cartID = ?',
                [cartID],
                (err, results) => {
                    if (err) return reject(err);
                    resolve(results);
                }
            );
        });
    }
};

module.exports = CartDetails;
