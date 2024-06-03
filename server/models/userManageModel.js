const db = require ('../config/databaseConnection')



const getUsers = (values, callback) => {
    const sqlGetUsers =  `
      SELECT u.userID, u.firstName, u.username, u.email, u.phoneNumber, ut.userType 
      FROM users u
      JOIN userroles ur ON u.userID = ur.userID
      JOIN usertype ut ON ur.userTypeID = ut.userTypeID
    `;

    db.query(sqlGetUsers, values, callback);
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
        console.error('Error executing query:', error); // Add log
        return callback(error);
      }
      console.log('Query executed successfully:', results); // Add log
      callback(null, results);
    });
  };
  
  module.exports = {getUsers, updateUserType};