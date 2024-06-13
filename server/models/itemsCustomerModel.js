const db = require('../config/databaseConnection');

const getCardItems = (callback) => {
    const query = 'SELECT itemID, title, stockCount, price, imageUrl, author, isbn, description FROM items';
    db.query(query, (err, results) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, results);
        }
    });
};

const getItemByID = (itemID, callback) => {
    const query = 'SELECT itemID, title, stockCount, price, imageUrl, author, isbn, description FROM items WHERE itemID = ?';
    db.query(query, [itemID], (err, results) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, results[0]);
        }
    });
};

const searchItems = (query, callback) => {
    const searchTerm = `%${query}%`;
    const sql = 'SELECT * FROM items WHERE title LIKE ? OR author LIKE ?';
    db.query(sql, [searchTerm, searchTerm], (err, results) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, results);
        }
    });
};

module.exports = {
    getCardItems,
    getItemByID,
    searchItems,
};
