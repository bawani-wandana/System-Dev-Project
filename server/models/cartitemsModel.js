const db = require('../config/databaseConnection');

const updateItemStock = (itemID, quantity, callback) => {
    const sqlUpdate = "UPDATE items SET stockCount = stockCount - ? WHERE itemID = ?";
    db.query(sqlUpdate, [quantity, itemID], callback);
};

const reserveItem = (itemID, quantity, callback) => {
    const sqlUpdate = "UPDATE items SET stockCount = stockCount - ? WHERE itemID = ? AND stockCount >= ?";
    db.query(sqlUpdate, [quantity, itemID, quantity], callback);
};

const releaseItemReservation = (itemID, quantity, callback) => {
    const sqlUpdate = "UPDATE items SET stockCount = stockCount + ? WHERE itemID = ?";
    db.query(sqlUpdate, [quantity, itemID], callback);
};

module.exports = {
    updateItemStock,
    reserveItem,
    releaseItemReservation,
};
