const db = require ('../config/databaseConnection')

const createUser = ( user, callback) => {
    const {
      userID,
      userName,
      email,
      firstName,
      lastName,
      phoneNumber,
      password,
    } = user;
  
    const sqlCreateUser = `INSERT INTO users (userID, userName, email, firstName, lastName, phoneNumber, password)
              VALUES (?, ?, ?, ?, ?, ?, ?)`;
    db.query(
      sqlCreateUser,
      [
        userID,
        userName,
        email,
        firstName,
        lastName,
        phoneNumber,
        password,
      ],
      callback
    );
  };

  const createUserRole = (userID, userTypeID, callback) => {
    const sqlCreateUserRole = `INSERT INTO userroles (userID, userTypeID)
                                VALUES (?, ?)`;
    db.query(sqlCreateUserRole, [userID, userTypeID], callback);
  };
  
  
  const checkUserByEmail = (email, callback) => {
    const query = `SELECT * FROM users WHERE email = ?` ;
    db.query(query, [email], callback);
  };

  const getUserByEmail = (email, callback) => {
    const sql = `
      SELECT u.userID, u.email, u.password, ur.userTypeID, ut.userType
      FROM users u 
      JOIN userroles ur ON u.userID = ur.userID 
      JOIN usertype ut ON ur.userTypeID = ut.userTypeID
      WHERE u.email = ?
    `;
    db.query(sql, [email], callback);

  };


  
  module.exports = {createUser, createUserRole, checkUserByEmail, getUserByEmail}