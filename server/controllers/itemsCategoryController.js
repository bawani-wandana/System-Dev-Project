const { getItemsByCategory } = require('../models/itemsCategoryModel');

exports.getItemsByCategory = (req, res) => {
    const { category } = req.params;
    getItemsByCategory(category, (err, items) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch items' });
        }
        res.json(items);
    });
};
