const staffHandlingModel = require ('../models/staffHandlingModel')

exports.getStaffUsers = (req, res) => {
    staffHandlingModel.getStaffUsers((error, results) => {
      if (error) {
        console.error('Error fetching staff users:', error);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(results);
    });
  };

  exports.deleteStaff = (req, res) => {
    const userID = req.params.userID;
    staffHandlingModel.deleteStaff(userID, (error, result) => {
      if (error) {
        console.error('Error deleting user:', error);
        return res.status(500).json({ error: 'Database error' });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json({ message: 'User deleted successfully' });
    });
  };