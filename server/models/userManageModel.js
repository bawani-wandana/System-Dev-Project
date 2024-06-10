const db = require('../config/databaseConnection');
const bcrypt = require('bcrypt');

const getUsersAdmin = (userId, callback) => {
    const sqlGetUsers = `
        SELECT u.userID, u.firstName, u.lastName, u.username, u.email, u.phoneNumber,u.password, ut.userType 
        FROM users u
        JOIN userroles ur ON u.userID = ur.userID
        JOIN usertype ut ON ur.userTypeID = ut.userTypeID
    `;

    db.query(sqlGetUsers, [userId], callback);
};

const getUsers = (userId, callback) => {
    const sqlGetUsers = `
        SELECT u.userID, u.firstName, u.lastName, u.username, u.email, u.phoneNumber,u.password, ut.userType 
        FROM users u
        JOIN userroles ur ON u.userID = ur.userID
        JOIN usertype ut ON ur.userTypeID = ut.userTypeID
        WHERE u.userID = ?
    `;

    db.query(sqlGetUsers, [userId], callback);
};

const updateUserType = (userId, userType, callback) => {
    const sqlUpdateUserType = `
        UPDATE userroles ur
        JOIN usertype ut ON ur.userTypeID = ut.userTypeID
        SET ur.userTypeID = (
            SELECT userTypeID FROM usertype WHERE userType = ?
        )
        WHERE ur.userID = ?;
    `;
    db.query(sqlUpdateUserType, [userType, userId], (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            return callback(error);
        }
        console.log('Query executed successfully:', results);
        callback(null, results);
    });
};

const updateUserProfile = (userID, fieldsToUpdate, callback) => {
  const setClause = Object.keys(fieldsToUpdate).map(field => `${field} = ?`).join(', ');
  const values = [...Object.values(fieldsToUpdate), userID];

  const sqlUpdateUserProfile = `UPDATE users SET ${setClause} WHERE userID = ?`;

  db.query(sqlUpdateUserProfile, values, (error, results) => {
      if (error) {
          console.error('Error updating user profile:', error);
          return callback(error);
      }
      console.log('User profile updated successfully:', results);
      callback(null, results);
  });
};

const getOrders = (userId, callback) => {
    const sqlOrders = `SELECT o.orderID, DATE_FORMAT(o.orderDate, '%Y-%m-%d') AS orderDate, o.orderType, o.totalAmount, o.orderStatus, p.paymentMethod, p.paymentDate, p.paymentStatus 
      FROM orders o
      JOIN payments p ON p.paymentID = o.paymentID
      JOIN users u ON o.userID = u.userID
      WHERE u.userID = ?`;
    db.query(sqlOrders, [userId], callback);
  };

module.exports = { getUsersAdmin, getUsers, updateUserType, updateUserProfile, getOrders };
