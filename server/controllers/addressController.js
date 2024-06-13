const Address = require('../models/addressModel');

const addAddress = (req, res) => {
  const { street, district, city, postalCode, userID } = req.body;

  // Validate input
  if (!street || !district || !city || !postalCode || !userID) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  Address.create(req.body, (err, results) => {
    if (err) {
      console.error('Error in addAddress controller:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(201).json({ message: 'Address added successfully', data: results });
  });
};

const updateAddress = (req, res) => {
  const userId = req.params.userId;
  const { street, district, city, postalCode } = req.body;

  // Validate input
  if (!street || !district || !city || !postalCode) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  Address.update(userId, req.body, (err, results) => {
    if (err) {
      console.error('Error in updateAddress controller:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(200).json({ message: 'Address updated successfully', data: results });
  });
};

const getAddressesByUserId = (req, res) => {
  const userId = req.params.userId;
  Address.getAllByUserId(userId, (err, results) => {
    if (err) {
      console.error('Error in getAddressesByUserId controller:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(200).json(results);
  });
};



module.exports = {
  addAddress,
  updateAddress,
  getAddressesByUserId,
};
