import React, { useContext, useEffect, useState } from 'react';
import OrderSummary from '../components/OrderSummary';
import { CartContext } from '../contexts/CartContext';
import { FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { getDecodedToken } from '../services/jwtdecoder';

const ShoppingCart = ({ updateTotal }) => {
    const decodedToken = getDecodedToken();
    const { cart, addItemToCart, updateItemQuantity, removeItemFromCart } = useContext(CartContext);
    const navigate = useNavigate();
    const [subtotal, setSubtotal] = useState(0);
    const userId = decodedToken?.id;

    // useEffect(() => {
    //     if (addItemToCart) {
    //         addItemToCart();
    //     }
    // }, [addItemToCart]);


    useEffect(() => {
        const calculatedSubtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setSubtotal(calculatedSubtotal);
        updateTotal(calculatedSubtotal);

        // Update the cart total in the backend
        updateCartTotalInBackend(userId, calculatedSubtotal);
    }, [cart, updateTotal, userId]);

    const updateCartTotalInBackend = async (userId, cartTotal) => {
        try {
            await axiosInstance.post('/cart/updateTotal', { userId, cartTotal });
        } catch (error) {
            console.error('Error updating cart total in backend:', error);
        }
    };

    const handleQuantityChange = async (cartDetailID, itemID, originalQuantity, amount) => {
        const newQuantity = originalQuantity + amount;
        if (newQuantity > 0) {
            try {
                await updateItemQuantity(cartDetailID, newQuantity, itemID, originalQuantity);
            } catch (error) {
                console.error('Error updating item quantity:', error);
            }
        }
    };

    const handleRemoveItem = async (cartDetailID, itemID, quantity) => {
        try {
            await removeItemFromCart(cartDetailID, itemID, quantity);
            console.log('Item removed successfully');
        } catch (error) {
            console.error('Error removing item:', error);
        }
    };

    const handleCheckout = () => {
        navigate('/checkout');
    };

    return (
        <div className="bg-white py-8 font-[Lato]">
            <div className="container ml-20 my-4">
                <h1 className="text-[30px] text-c3 font-semibold mb-4">Shopping Cart</h1>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="md:w-3/4">
                        <div className="bg-c4 rounded-lg shadow-md p-6 mb-4">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-[20px]">
                                        <th className="text-left font-semibold">Item</th>
                                        <th className="text-left font-semibold">Price</th>
                                        <th className="text-left font-semibold">Quantity</th>
                                        <th className="text-left font-semibold">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.map((item) => (
                                        <tr key={item.cartDetailID}>
                                            <td className="py-6 text-[20px]">
                                                <div className="flex items-center">
                                                    <img className="h-16 w-16 mr-4" src={item.imageUrl} alt={item.title} />
                                                    <span className="font-semibold">{item.title}</span>
                                                </div>
                                            </td>
                                            <td className="py-6 pr-8 text-[20px]">{Number(item.price).toFixed(2)}</td>
                                            <td className="py-6 text-[20px]">
                                                <div className="flex items-center">
                                                    <button
                                                        className="border rounded-md text-white bg-c3 py-2 px-4 mr-2"
                                                        onClick={() => handleQuantityChange(item.cartDetailID, item.itemID, item.quantity, -1)}
                                                    >
                                                        -
                                                    </button>
                                                    <span className="text-center w-8">{item.quantity}</span>
                                                    <button
                                                        className="border bg-c3 text-white rounded-md py-2 px-4 ml-2"
                                                        onClick={() => handleQuantityChange(item.cartDetailID, item.itemID, item.quantity, 1)}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="py-6 text-[20px]">{(item.price * item.quantity).toFixed(2)}</td>
                                            <td className="py-6 text-[20px]">
                                                <button
                                                    className="border bg-c3 text-white rounded-md py-3 px-4 ml-2"
                                                    onClick={() => handleRemoveItem(item.cartDetailID, item.itemID, item.quantity)}
                                                >
                                                    <FaTrash />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="md:w-1/4 text-[20px]">
                        <OrderSummary cartTotal={subtotal} showDetails={false} />
                        <button 
                            className="bg-c3 text-white py-2 px-4 rounded-lg mt-4 w-full" 
                            onClick={handleCheckout}
                        >
                            Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShoppingCart;