const { addItem, getItems, updateItem, deleteItem } = require('../models/itemModel');
const generateItemID = require('../helpers/generateItemID');

exports.addItem = async (req, res) => {
    const { title, category, stockCount, price, imageUrl, author, isbn, description, userTypeID, threshold } = req.body;

    try {
        generateItemID((err, newItemID) => {
            if (err) {
                console.error("Error generating new itemID: ", err);
                return res.status(500).json({ error: "Database Error" });
            }

            if (!title || !category || !stockCount || !price || !imageUrl || !threshold) {
                return res.status(400).json({ error: 'All required fields must be filled' });
            }

            const newItem = [
                newItemID,
                title,
                category,
                stockCount,
                price,
                imageUrl,
                author || '',
                isbn || '',
                description || '',
                userTypeID,
                threshold,
            ];

            addItem(newItem, (err) => {
                if (err) {
                    console.error("Error inserting new item into item table", err);
                    return res.status(500).json({ error: "Database error" });
                }
                res.status(200).json({ message: 'Item added successfully', itemID: newItemID });
            });
        });
    } catch (error) {
        console.error("Failed to add item:", error);
        res.status(500).json({ error: 'Failed to add item' });
    }
};

exports.getallItems = (req, res) => {
    getItems([], (error, results) => {
        if (error) {
            console.error("Error fetching items from the database: ", error);
            return res.status(500).json({ error: "Database query error" });
        }
        res.json(results);
    });
};

exports.updateItem = (req, res) => {
    try {
        const item = req.body;
        updateItem(item);
        res.json({ message: 'Item updated successfully' });
    } catch (err) {
        console.error("Error updating item: ", err);
        res.status(500).json({ error: err.message });
    }
};

exports.deleteItem = (req, res) => {
    try {
        const { itemID } = req.params;
        const result = deleteItem(itemID);
        res.json({ message: 'Item deleted successfully', result });
    } catch (err) {
        console.error("Error deleting item: ", err);
        res.status(500).json({ error: err.message });
    }
};
