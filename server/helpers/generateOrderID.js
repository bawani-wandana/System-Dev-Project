const db = require('../config/databaseConnection')

const generateOrderID = (callback) => {
    const sqlGetHighestID = "SELECT orderID FROM orders ORDER BY orderID DESC LIMIT 1";
  
    db.query(sqlGetHighestID, (err, result) => {
      if (err) {
        return callback(err, null);
      }
  
      if (result.length === 0) {
        return callback(null, 'OR001');
      } else {
        const highestID = result[0].orderID;
        const numericPart = parseInt(highestID.substring(2), 10) + 1;
        const newID = 'OR' + String(numericPart).padStart(3, '0');
        return callback(null, newID);
      }
    });
  };
  
  module.exports = generateOrderID;