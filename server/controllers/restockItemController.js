const { adjustStock } = require('../models/cartItemModel');

const restockItem =  (req, res) => {
    const { itemId, quantity } = req.body;

    try {
        adjustStock(itemId, quantity);
        res.status(200).json({ message: 'Item restocked successfully' });
    } catch (error) {
        console.error('Error restocking item:', error); // Log the error for debugging
        res.status(500).json({ message: 'Error restocking item', error });
    }
};

module.exports = {
    restockItem,
};
