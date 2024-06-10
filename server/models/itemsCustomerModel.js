const db = require('../config/databaseConnection');

const getCardItems =  (callback) => {
    const query = 'SELECT itemID, title, stockCount, price, imageUrl, author, isbn, description FROM items';
    db.query(query, (err, results) => {
        if (err) {
            callback(err, null);
        } else {
            console.log('Fetched items:', results);  // Log fetched items
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
            callback(null, results[0]);  // results[0] to get the single item
        }
    });    };



module.exports ={
    getCardItems, getItemByID
};