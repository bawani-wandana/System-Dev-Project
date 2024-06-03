const { getUsers , updateUserType} = require('../models/userManageModel')


exports.getUsers = (req, res) => {
    getUsers([], (error, results) => {
        if (error) {
            console.error("Error fetching user details from the database: ", error)
            return res.status(500).json({ error: "Database query error" });
        }
        res.json(results);
    });
};

exports.updateUserType = (req, res) => {
    const { userId, userType } = req.body;
    console.log('Received request to update user type:', userId, userType); // Add log
    updateUserType(userId, userType, (error, results) => {
      if (error) {
        console.error("Error updating user type: ", error);
        return res.status(500).json({ error: "Database update error" });
      }
      console.log('Update result:', results); // Add log
      res.json({ message: "User type updated successfully" });
    });
  };