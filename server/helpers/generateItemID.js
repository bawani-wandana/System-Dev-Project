const db = require('../config/databaseConnection');

const generateItemID = (callback) => {
    const sqlGetHighestID = "SELECT itemID FROM items ORDER BY itemID DESC LIMIT 1";

    db.query(sqlGetHighestID, (err, result) => {
        if (err) {
            return callback(err, null);
        }

        if (result.length === 0) {
            return callback(null, 'IT001');
        } else {
            const highestID = result[0].itemID;
            const numericPart = parseInt(highestID.substring(2), 10) + 1;
            const newID = 'IT' + String(numericPart).padStart(3, '0');
            return callback(null, newID);
        }
    });
};

module.exports = generateItemID;
