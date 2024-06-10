const { getCardItems, getItemByID } = require('../models/itemsCustomerModel');


exports.getItems = (req, res) => {
    getCardItems((err, items) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch items' });
        }
        console.log('Items sent to frontend:', items);  // Log items before sending to frontend
        res.json(items);
    });
};


exports.getItem = (req, res) => {
    const { itemID } = req.params;
    console.log(`Received request for itemID: ${itemID}`);
    getItemByID(itemID, (err, item) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch item' });
        }
        res.json(item);
    });
};