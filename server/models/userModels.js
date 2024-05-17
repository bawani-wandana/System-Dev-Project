const db = require('../config/databaseConnection');

const User = {
  create: (userData, callback) => {
    const { username,firstname, lastname, email,  phonenumber, password, confirmpassword } = userData;
    const sql = 'INSERT INTO user (userName,firstName, lastName, email,  phoneNumber, password, confirmPassword) VALUES (?, ?, ?, ?, ?, ?,?)';
    db.query(sql, [username, firstname, lastname, email,  phonenumber, password, confirmpassword], callback);
  },
  findByEmail: (email, callback) => {
    const sql = 'SELECT * FROM user WHERE email = ?';
    db.query(sql, [email], callback);
  }
};

module.exports = User;
