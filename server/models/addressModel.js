const db = require('../config/databaseConnection');

const Address = {
  create: (data, callback) => {
    const { street, district, city, postalCode, userID } = data;
    db.query(
      'INSERT INTO address (street, district, city, postalCode, userID) VALUES (?, ?, ?, ?, ?)',
      [street, district, city, postalCode, userID],
      (err, results) => {
        if (err) {
          console.error('Error inserting address:', err);
          return callback(err);
        }
        callback(null, results);
      }
    );
  },

  update: (userId, data, callback) => {
    const { street, district, city, postalCode } = data;
    db.query(
      'UPDATE address SET street = ?, district = ?, city = ?, postalCode = ? WHERE userID = ?',
      [street, district, city, postalCode, userId],
      (err, results) => {
        if (err) {
          console.error('Error updating address:', err);
          return callback(err);
        }
        callback(null, results);
      }
    );
  },

  getAllByUserId: (userId, callback) => {
    db.query('SELECT * FROM address WHERE userID = ?', [userId], (err, results) => {
      if (err) {
        console.error('Error fetching addresses:', err);
        return callback(err);
      }
      callback(null, results);
    });
  },


};

module.exports = Address;
