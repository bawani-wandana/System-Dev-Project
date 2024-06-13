import React, { createContext, useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { getDecodedToken } from '../services/jwtdecoder';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const decodedToken = getDecodedToken();
    const [cart, setCart] = useState([]);
    const userId = decodedToken?.id;
    const [timeouts, setTimeouts] = useState({});

    useEffect(() => {
        if (userId) {
            loadCartItems(userId);
        }
    }, [userId]);

    const loadCartItems = async (userId) => {
        try {
            const response = await axiosInstance.get(`/cart/${userId}`);
            setCart(response.data);
            console.log(response.data)
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };

    const addItemToCart = async (item) => {
        if (!userId) {
            console.error('User not authenticated');
            return;
        }

        try {
            const response = await axiosInstance.post('/cart', {
                userID: userId,
                itemID: item.id,
            });

            loadCartItems(userId);

            if (timeouts[item.id]) {
                clearTimeout(timeouts[item.id]);
            }

            const timeoutId = setTimeout(async () => {
                try {
                    await axiosInstance.post('/cart/remove', {
                        userID: userId,
                        itemID: item.id,
                    });

                    loadCartItems(userId);
                } catch (error) {
                    console.error('Error removing expired item from cart:', error);
                }
            }, 10 * 60 * 1000);

            setTimeouts((prevTimeouts) => ({
                ...prevTimeouts,
                [item.id]: timeoutId,
            }));
        } catch (error) {
            console.error('Error adding item to cart:', error);
        }
    };

    const updateItemQuantity = async (cartDetailID, newQuantity, itemID, originalQuantity) => {
        if (!userId) {
            console.error('User not authenticated');
            return;
        }

        try {
            console.log(itemID)
            await axiosInstance.post('/cart/updateQuantity', {
                userID: userId,
                cartDetailID,
                newQuantity,
                itemID,
                originalQuantity,
            });

            loadCartItems(userId);

            if (timeouts[itemID]) {
                clearTimeout(timeouts[itemID]);
            }

            const timeoutId = setTimeout(async () => {
                try {
                    await axiosInstance.post('/cart/remove', {
                        userID: userId,
                        itemID,
                    });

                    loadCartItems(userId);
                } catch (error) {
                    console.error('Error removing expired item from cart:', error);
                }
            }, 10 * 60 * 1000);

            setTimeouts((prevTimeouts) => ({
                ...prevTimeouts,
                [itemID]: timeoutId,
            }));
        } catch (error) {
            console.error('Error updating item quantity:', error);
        }
    };

    const removeItemFromCart = async (cartDetailID, itemID, quantity) => {
        if (!userId) {
            console.error('User not authenticated');
            return;
        }

        try {
            await axiosInstance.post('/cart/remove', {
                userID: userId,
                cartDetailID,
                itemID,
                quantity,
            });

            loadCartItems(userId);
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };

    return (
        <CartContext.Provider value={{ cart, addItemToCart, updateItemQuantity, removeItemFromCart }}>
            {children}
        </CartContext.Provider>
    );
};