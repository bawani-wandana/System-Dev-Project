const db = require('../config/databaseConnection');

const getItemsByCategory = (category, callback) => {
    const query = 'SELECT itemID, title, stockCount, price, imageUrl, author, isbn, description FROM items WHERE category = ?';
    db.query(query, [category], (err, results) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, results);
        }
    });
};

module.exports = {
    getItemsByCategory
};