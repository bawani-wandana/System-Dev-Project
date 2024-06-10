const db = require('../config/databaseConnection');

const Item = {
    getById: (itemId) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM items WHERE itemID = ?', [itemId], (err, results) => {
                if (err) return reject(err);
                resolve(results[0]);
            });
        });
    },

    reserveStock: (itemId, quantity) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM items WHERE itemID = ?', [itemId], (err, results) => {
                if (err) return reject(err);

                const item = results[0];
                if (item.stockCount >= quantity) {
                    db.query('UPDATE items SET stockCount = stockCount - ? WHERE itemID = ?', [quantity, itemId], (err) => {
                        if (err) return reject(err);
                        resolve();
                    });
                } else {
                    reject(new Error('Not enough stock available'));
                }
            });
        });
    },

    adjustStock: (itemId, quantity) => {
        return new Promise((resolve, reject) => {
            db.query('UPDATE items SET stockCount = stockCount + ? WHERE itemID = ?', [quantity, itemId], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    },

};

module.exports = Item;
