const Cart = require('../models/cartModel');
const CartDetails = require('../models/cartDetailsModel');
const Item = require('../models/cartItemModel');
const jwt = require('jsonwebtoken');

const getUserIdFromToken = (req) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.decode(token);
    return decodedToken.id;
};

const addToCart = async (req, res) => {
    const { itemID, quantity } = req.body;
    const userID = getUserIdFromToken(req);

    try {
        let cart = await Cart.findByUserId(userID);

        if (!cart) {
            const cartID = await Cart.create(userID);
            cart = { cartID };
        }

        await CartDetails.addItem(cart.cartID, itemID, quantity);
        await Item.reserveStock(itemID, quantity);

        res.status(200).json({ message: 'Item added to cart' });
    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).json({ error: 'An error occurred while adding item to cart' });
    }
};

const updateItemQuantity = async (req, res) => {
    const { itemID, quantity } = req.body;
    const userID = getUserIdFromToken(req);

    try {
        const cart = await Cart.findByUserId(userID);

        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        const prevQuantity = await CartDetails.getItemQuantity(cart.cartID, itemID);
        const quantityDifference = quantity - prevQuantity;

        await CartDetails.updateItemQuantity(cart.cartID, itemID, quantity);
        await Item.adjustStock(itemID, -quantityDifference);

        res.status(200).json({ message: 'Item quantity updated' });
    } catch (error) {
        console.error('Error updating item quantity:', error);
        res.status(500).json({ error: 'An error occurred while updating item quantity' });
    }
};

const removeFromCart = async (req, res) => {
    const { cartID, itemID } = req.body;

    if (!cartID || !itemID) {
        return res.status(400).json({ error: 'cartID and itemID are required' });
    }

    try {
        // Remove item from cart and get the quantity removed
        const quantity = await CartDetails.removeItem(cartID, itemID);

        if (quantity) {
            // Increment stockCount of the item by the removed quantity
            await Item.adjustStock(itemID, quantity);
            res.status(200).json({ message: 'Item removed from cart and restocked' });
        } else {
            res.status(404).json({ error: 'Item not found in cart' });
        }
    } catch (error) {
        console.error('Error removing item from cart:', error);
        res.status(500).json({ error: 'An error occurred while removing item from cart' });
    }
};

const removeExpiredItems = async (req, res) => {
    const userID = getUserIdFromToken(req);

    try {
        const cart = await Cart.findByUserId(userID);

        if (cart) {
            const cartDetails = await CartDetails.getCartDetails(cart.cartID);
            for (const item of cartDetails) {
                await CartDetails.removeItem(cart.cartID, item.itemID);
                await Item.adjustStock(item.itemID, item.quantity);
            }
            await Cart.updateCartStatus(cart.cartID, 'expired');
        }

        res.status(200).json({ message: 'Expired items removed from cart' });
    } catch (error) {
        console.error('Error removing expired items from cart:', error);
        res.status(500).json({ error: 'An error occurred while removing expired items from cart' });
    }
};



module.exports = {
    addToCart,
    updateItemQuantity,
    removeFromCart,
    removeExpiredItems,
};