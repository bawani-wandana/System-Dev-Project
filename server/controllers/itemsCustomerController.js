const { getCardItems, getItemByID, searchItems } = require('../models/itemsCustomerModel');

exports.getItems = (req, res) => {
    getCardItems((err, items) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch items' });
        }
        res.json(items);
    });
};

exports.getItem = (req, res) => {
    const { itemID } = req.params;
    getItemByID(itemID, (err, item) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch item' });
        }
        res.json(item);
    });
};

exports.searchItems = (req, res) => {
    const query = req.query.query;
    searchItems(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching search results' });
        }
        res.json(results);
    });
};
