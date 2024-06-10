const db = require('../config/databaseConnection');

const Item = {
    reserveStock: (itemID, quantity) => {
        return new Promise((resolve, reject) => {
            db.query(
                'UPDATE items SET stockCount = stockCount - ? WHERE itemID = ? AND stockCount >= ?',
                [quantity, itemID, quantity],
                (err, result) => {
                    if (err) return reject(err);
                    if (result.affectedRows === 0) {
                        return reject(new Error('Insufficient stock'));
                    }
                    resolve();
                }
            );
        });
    },

    adjustStock: (itemID, quantityChange) => {
        return new Promise((resolve, reject) => {
            db.query(
                'UPDATE items SET stockCount = stockCount + ? WHERE itemID = ?',
                [quantityChange, itemID],
                (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                }
            );
        });
    },

    updateStockCount: (itemID, newStockCount) => {
        return new Promise((resolve, reject) => {
            db.query(
                'UPDATE items SET stockCount = ? WHERE itemID = ?',
                [newStockCount, itemID],
                (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                }
            );
        });
    }
};

module.exports = Item;