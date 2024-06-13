import React, { useEffect, useState } from 'react';
import SideBar from '../../components/SideBar';
import DashBoardView from '../../components/DashBoardView';
import Navbar from '../../components/navBar/Navbar';
import axiosInstance from '../../utils/axiosInstance';

function getPaymentStatus(status) {
    switch (status) {
        default:
        case 'pending':
            return (
                <span className='py-2 px-5 rounded-md text-[18px] text-white bg-purple-700'>
                    {status.replaceAll('_', '').toUpperCase()}
                </span>
            );
        case 'paid':
            return (
                <span className='py-2 px-5 rounded-md text-[18px] text-white bg-green-700'>
                    {status.replaceAll('_', '').toUpperCase()}
                </span>
            );
    }
}

const OrderStatus = () => {
    const [ordersData, setOrdersData] = useState([]);

    useEffect(() => {
        axiosInstance.get('/ordersTable')
            .then((response) => {
                console.log('Fetched data:', response.data); // Log the fetched data
                setOrdersData(response.data);
            })
            .catch(error => {
                console.error('Error fetching orders:', error);
            });
    }, []);
    

    const handleStatusChange = (orderId, newStatus) => {
        axiosInstance.put(`/orders/${orderId}/status`, { newStatus })
            .then(response => {
                setOrdersData(prevOrders => {
                    return prevOrders.map(order => {
                        if (order.orderID === orderId) {
                            return { ...order, orderStatus: newStatus };
                        }
                        return order;
                    });
                });
            })
            .catch(error => {
                console.error('Error updating order status:', error);
            });
    };
    return (
        <div className='font-[Lato] dark:bg-gray-900'>
            <div>
                <Navbar />
            </div>
            <div className='flex'>
                <div className='basis-[15%] h-[100vh]'>
                    <SideBar />
                </div>
                <div className='basis-[85%]'>
                    <DashBoardView />
                    <h2 className='text-black font-bold ml-5 mt-5 text-[30px] uppercase'>Orders</h2>
                    <div className='bg-c4  px-4 pt-5 mt-10 ml-5 mr-5 rounded-md border justify-between border-gray-600 flex '>
                        <table className='flex-col w-full '>
                            <thead className=' bg-c3 text-white text-[20px] '>
                                <tr className=''>
                                    <td className='px-4 py-2 text-center'>Order ID</td>
                                    <td className='px-4 py-2 text-center'>Order Date</td>
                                    <td className='px-4 py-2 text-center'>Order Type</td>
                                    <td className='px-4 py-2 text-center'>Total Amount</td>
                                    <td className='px-4 py-2 text-center'>Order Status</td>
                                    <td className='px-4 py-2 text-center'>Name</td>
                                    <td className='px-4 py-2 text-center'>Phone Number</td>
                                    <td className='px-4 py-2 text-center'>Shipping Address</td>
                                    <td className='px-4 py-2 text-center'>Payment Type</td>
                                    <td className='px-4 py-2 text-center'>Payment Date</td>
                                    <td className='px-4 py-2 text-center'>Payment Status</td>
                                </tr>
                            </thead>
                            <tbody >
                            {Array.isArray(ordersData) && ordersData.map((order) => (
                                    <tr key={order.orderID} className=''>
                                        <td className='px-4 py-4 text-center'>{order.orderID}</td>
                                        <td className='px-4 py-4 text-center'>{order.orderDate}</td>
                                        <td className='px-4 py-4 text-center'>{order.orderType}</td>
                                        <td className='px-4 py-4 text-center'>{order.totalAmount}</td>
                                        <td className='px-4 py-4 text-center'>
                                            <select
                                                value={order.orderStatus}
                                                onChange={(e) => handleStatusChange(order.orderID, e.target.value)}
                                                className={`px-2 py-3 uppercase bg-blue-800 text-white rounded-md ${
                                                    order.orderStatus === 'processing' ? 'bg-yellow-700' : 'bg-brown-800',
                                                    order.orderStatus === 'completed' ? 'bg-green-700' :
                                                    order.orderStatus === 'out for delivery' ? 'bg-pink-700' :
                                                    order.orderStatus === 'delivered' ? 'bg-cyan-700' : ''
                                                }`}
                                            >
                                                <option value="processing">Processing</option>
                                                <option value="completed">Completed</option>
                                                <option value="out for delivery">Out for Delivery</option>
                                                <option value="delivered">Delivered</option>
                                            </select>
                                        </td>
                                        <td className='px-4 py-4 text-center'>{order.firstName}</td>
                                        <td className='px-4 py-4 text-center'>{order.phoneNumber}</td>
                                        <td className='px-4 py-4 text-center'>{order.shippingAddress}</td>
                                        <td className='px-4 py-4 text-center'>{order.paymentMethod}</td>
                                        <td className='px-4 py-4 text-center'>{order.paymentDate}</td>
                                        <td className='px-4 py-4 text-center'>{getPaymentStatus(order.paymentStatus)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderStatus;
