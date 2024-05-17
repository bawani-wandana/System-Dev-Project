const User = require("../models/userModels")


const createUser = (req, res) => {
  const { firstname, lastname, email, username, phonenumber, password, confirmpassword } = req.body;

  // Check if user already exists
  User.findByEmail(email, (err, result) => {
    if (err) {
      return res.status(500).send('Server error');
    }
    if (result.length > 0) {
      return res.status(400).send('User already exists');
    }

    // Create new user
    User.create({ firstname, lastname, email, username, phonenumber, password, confirmpassword }, (err, result) => {
      if (err) {
        return res.status(500).send('Error creating user');
      }
      res.status(201).send('User created successfully');
    });
  });
};

module.exports = { createUser };






