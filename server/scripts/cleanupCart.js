const CartDetails = require('../models/cartDetailsModel');

const removeExpiredItems = async () => {
    try {
        await CartDetails.removeExpiredItems();
        console.log('Expired cart items removed successfully.');
    } catch (error) {
        console.error('Error removing expired cart items:', error);
    }
};

// Run cleanup every 10 minutes
setInterval(removeExpiredItems, 10 * 60 * 1000);
