const { getUsersAdmin } = require('../models/AdminUserHandlingModel');

exports.getUsersAdmin = (req, res) => {
    const { userId } = req.params;
  
    console.log('Fetching user with ID:', userId);
    getUsersAdmin(userId, (error, results) => {
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