import React, { createContext, useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { getDecodedToken } from '../services/jwtdecoder';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const user = getDecodedToken();
    const [timeouts, setTimeouts] = useState({});

    const addItemToCart = async (item) => {
        if (!user) {
            console.error('User not authenticated');
            return;
        }

        try {
            const response = await axiosInstance.post('/addtocart', {
                itemID: item.id,
                quantity: 1,
            });

            setCart((prevCart) => {
                const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
                if (existingItem) {
                    return prevCart.map(cartItem =>
                        cartItem.id === item.id
                            ? { ...cartItem, quantity: cartItem.quantity + 1 }
                            : cartItem
                    );
                } else {
                    return [...prevCart, { ...item, quantity: 1 }];
                }
            });

            if (timeouts[item.id]) {
                clearTimeout(timeouts[item.id]);
            }

            const timeoutId = setTimeout(async () => {
                try {
                    await axiosInstance.post('/removeexpired', {
                        itemID: item.id,
                    });

                    setCart((prevCart) => {
                        const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
                        if (existingItem && existingItem.quantity === 1) {
                            return prevCart.filter(cartItem => cartItem.id !== item.id);
                        } else if (existingItem) {
                            return prevCart.map(cartItem =>
                                cartItem.id === item.id
                                    ? { ...cartItem, quantity: cartItem.quantity - 1 }
                                    : cartItem
                            );
                        }
                        return prevCart;
                    });
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

    const updateItemQuantity = async (itemID, quantity) => {
        if (!user) {
            console.error('User not authenticated');
            return;
        }

        try {
            await axiosInstance.post('/updateitemquantity', {
                itemID,
                quantity,
            });

            setCart((prevCart) =>
                prevCart.map((item) =>
                    item.id === itemID
                        ? { ...item, quantity }
                        : item
                )
            );

            if (timeouts[itemID]) {
                clearTimeout(timeouts[itemID]);
            }

            const timeoutId = setTimeout(async () => {
                try {
                    await axiosInstance.post('/removeexpired', {
                        itemID,
                    });

                    setCart((prevCart) => {
                        const existingItem = prevCart.find(cartItem => cartItem.id === itemID);
                        if (existingItem && existingItem.quantity === 1) {
                            return prevCart.filter(cartItem => cartItem.id !== itemID);
                        } else if (existingItem) {
                            return prevCart.map(cartItem =>
                                cartItem.id === itemID
                                    ? { ...cartItem, quantity: cartItem.quantity - 1 }
                                    : cartItem
                            );
                        }
                        return prevCart;
                    });
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

    const removeItemFromCart = (itemID) => {
        const itemIndex = cart.findIndex(item => item.id === itemID);
        if (itemIndex !== -1) {
            setCart(prevCart => prevCart.filter(item => item.id !== itemID));
            console.log('Item removed successfully');
        } else {
            console.error('Cart ID not found for item');
        }
    };
    return (
        <CartContext.Provider value={{ cart, addItemToCart, updateItemQuantity, removeItemFromCart }}>
            {children}
        </CartContext.Provider>
    );
};