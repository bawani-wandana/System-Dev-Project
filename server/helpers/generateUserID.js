const db = require('../config/databaseConnection')

exports.generateUserID = (callback) => {
    const sqlGetHighestID = "SELECT userID FROM users ORDER BY userID DESC LIMIT 1";
  
    db.query(sqlGetHighestID, (err, result) => {
      if (err) {
        return callback (err, null);
      }
  
      if (result.length === 0) {
        return callback (null, 'U001');
      } else {
        const highestID = result[0].userID;
        const numericPart = parseInt(highestID.substring(2), 10) + 1;
        const newID = 'U' + String(numericPart).padStart(3, '0');
        return callback (null, newID);
      }
    });
  };
  
