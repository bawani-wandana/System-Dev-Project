const { getUsersAdmin, getUsers, updateUserType, updateUserProfile, getOrders } = require('../models/userManageModel');
const bcrypt = require('bcrypt');

exports.getUsersAdmin = (req, res) => {
    getUsersAdmin(null, (error, results) => { // Assuming you want to fetch all users, hence passing `null`
        if (error) {
            console.error("Error fetching user details from the database: ", error);
            return res.status(500).json({ error: "Database query error" });
        }
        res.json(results); // Return the array of user objects
    });
};


exports.getUsers = (req, res) => {
  const { userId } = req.params;

  console.log('Fetching user with ID:', userId);
  getUsers(userId, (error, results) => {
      if (error) {
          console.error("Error fetching user details from the database: ", error);
          return res.status(500).json({ error: "Database query error" });
        }
        if (results.length > 0) {
            res.json(results[0]); // Return the first user object
        } else {
            res.status(404).json({ error: "User not found" });
        }
  });
};

exports.updateUserType = (req, res) => {
  const { userId, userType } = req.body;
  console.log('Received request to update user type:', userId, userType);

  updateUserType(userId, userType, (error, results) => {
      if (error) {
          console.error("Error updating user type: ", error);
          return res.status(500).json({ error: "Database update error" });
      }
      console.log('Update result:', results);
      res.json({ message: "User type updated successfully" });
  });
};

exports.updateUserProfile = (req, res) => {
  const { userID, firstName, lastName, phoneNumber, existingPassword, newPassword } = req.body;

  // Validate input fields
  if (!userID) {
      return res.status(400).json({ error: "UserID is required" });
  }

  const fieldsToUpdate = {};
  if (firstName) fieldsToUpdate.firstName = firstName;
  if (lastName) fieldsToUpdate.lastName = lastName;
  if (phoneNumber) fieldsToUpdate.phoneNumber = phoneNumber;

  // If no password change is required, update profile without checking existing password
  if (!existingPassword && !newPassword) {
      updateUserProfile(userID, fieldsToUpdate, (error, results) => {
          if (error) {
              console.error("Error updating user profile:", error);
              return res.status(500).json({ error: "Database update error" });
          }
          res.json({ message: "User profile updated successfully" });
      });
      return;
  }

  // Fetch user to compare existing password
  getUsers(userID, (error, results) => {
      if (error) {
          console.error("Error fetching user details from the database:", error);
          return res.status(500).json({ error: "Database query error" });
      }

      if (results.length === 0) {
          return res.status(404).json({ error: "User not found" });
      }

      const user = results[0];

      // Compare existing password if provided
      bcrypt.compare(existingPassword, user.password, (error, isMatch) => {
          if (error) {
              console.error("Error comparing passwords:", error);
              return res.status(500).json({ error: "Password comparison error" });
          }

          if (!isMatch) {
              return res.status(401).json({ error: "Existing password is incorrect" });
          }

          // If a new password is provided, hash it and add to fieldsToUpdate
          if (newPassword) {
              bcrypt.hash(newPassword, 10, (error, hashedPassword) => {
                  if (error) {
                      console.error("Error hashing new password:", error);
                      return res.status(500).json({ error: "Password hashing error" });
                  }

                  fieldsToUpdate.password = hashedPassword;
                  updateUserProfile(userID, fieldsToUpdate, (error, results) => {
                      if (error) {
                          console.error("Error updating user profile:", error);
                          return res.status(500).json({ error: "Database update error" });
                      }
                      res.json({ message: "User profile updated successfully" });
                  });
              });
          }
      });
  });
};

exports.userOrders = (req, res) => {
    const userId = req.query.userId;

    if (!userId) {
        return res.status(400).json({ error: "userId is required" });
    }

    console.log(userId);
    getOrders(userId, (error, results) => {
      if (error) {
        console.error("Error fetching order details from the database:", error);
        return res.status(500).json({ error: "Database query error" });
      }
      res.json(results);
    });
};