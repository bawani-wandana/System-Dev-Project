import React, { useContext, useEffect } from 'react';
import OrderSummary from '../components/OrderSummary';
import { CartContext } from '../contexts/CartContext';
import { FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';

const ShoppingCart = ({ updateTotal }) => {
    const { cart, fetchCart, updateItemQuantity, removeItemFromCart } = useContext(CartContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (fetchCart) {
            fetchCart();
        }
    }, [fetchCart]);

    let subtotal = 0;

    useEffect(() => {
        subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        updateTotal(subtotal);
    }, [cart, updateTotal]);

    const handleQuantityChange = (itemID, amount) => {
        const item = cart.find(item => item.id === itemID);
        const newQuantity = item.quantity + amount;
        if (newQuantity > 0) {
            updateItemQuantity(itemID, newQuantity);
        }
    };

    const handleRemoveItem = async (itemID) => {
        const item = cart.find(item => item.id === itemID);
        const restockQuantity = item.quantity;

        try {
            await axiosInstance.put(`/restock`, { itemId: itemID, quantity: restockQuantity });
            removeItemFromCart(itemID);
            console.log('Item removed and restocked successfully');
        } catch (error) {
            console.error('Error removing item and restocking:', error);
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
                                        <tr key={item.id}>
                                            <td className="py-6 text-[20px]">
                                                <div className="flex items-center">
                                                    <img className="h-16 w-16 mr-4" src={item.image} alt={item.name} />
                                                    <span className="font-semibold">{item.name}</span>
                                                </div>
                                            </td>
                                            <td className="py-6 pr-8 text-[20px]">{Number(item.price).toFixed(2)}</td>
                                            <td className="py-6 text-[20px]">
                                                <div className="flex items-center">
                                                    <button
                                                        className="border rounded-md text-white bg-c3 py-2 px-4 mr-2"
                                                        onClick={() => handleQuantityChange(item.id, -1)}
                                                    >
                                                        -
                                                    </button>
                                                    <span className="text-center w-8">{item.quantity}</span>
                                                    <button
                                                        className="border bg-c3 text-white rounded-md py-2 px-4 ml-2"
                                                        onClick={() => handleQuantityChange(item.id, 1)}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="py-6 text-[20px]">{(item.price * item.quantity).toFixed(2)}</td>
                                            <td className="py-6 text-[20px]">
                                                <button
                                                    className="border bg-c3 text-white rounded-md py-3 px-4 ml-2"
                                                    onClick={() => handleRemoveItem(item.id)}
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
                        <OrderSummary subtotal={subtotal} showDetails={false} />
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