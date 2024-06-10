import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navBar/Navbar'
import Footer from '../../components/footer/Footer'
import CustomerProfileSideBar from '../../components/CustomerProfileSideBar'
import CustomerProfileHeader from '../../components/CustomerProfileHeader'
import { getDecodedToken } from '../../services/jwtdecoder'
import axiosInstance from '../../utils/axiosInstance'

function getOrderStatus(status) {
    switch (status) {
        default:
        case 'processing':
            return (
                <span className='py-2 px-5 rounded-md text-[18px] text-white bg-cyan-700'>
                    {status.replaceAll('_', '').toUpperCase()}
                </span>
            )
        case 'completed':
            return (
                <span className='py-2 px-5 rounded-md text-[18px] text-white bg-green-700'>
                    {status.replaceAll('_', '').toUpperCase()}
                </span>
            )
    }
}


function getPaymentStatus(status) {
    switch (status) {
        default:
        case 'pending':
            return (
                <span className='py-2 px-5 rounded-md text-[18px] text-white bg-purple-700'>
                    {status.replaceAll('_', '').toUpperCase()}
                </span>
            )
        case 'paid':
            return (
                <span className='py-2 px-5 rounded-md text-[18px] text-white bg-green-700'>
                    {status.replaceAll('_', '').toUpperCase()}
                </span>
            )
    }
}


function getDeliveryStatus(status) {
    switch (status) {
        default:
        case 'not delivered':
            return (
                <span className='py-2 px-5 rounded-md text-[18px] text-white bg-red-700'>
                    {status.replaceAll('_', '').toUpperCase()}
                </span>
            )
        case 'delivered':
            return (
                <span className='py-2 px-5 rounded-md text-[18px] text-white bg-green-700'>
                    {status.replaceAll('_', '').toUpperCase()}
                </span>
            )
    }
}



const CustomerOrder = () => {
    const decodedToken = getDecodedToken();
    const [customerOrders, setCustomerOrders] = useState([]);

const userId = decodedToken?.id;

useEffect(() => {
    // Fetch data from the backend when the component mounts
    axiosInstance
      .get(`/userOrders?userId=${userId}`) // Assuming your backend endpoint is /api/stocks
      .then((response) => {
        console.log(response.data);
        setCustomerOrders(response.data); // Update the state with fetched data
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [userId]);


    return (
        <div>
            <div>
                <Navbar />
                <CustomerProfileHeader />
            </div>
                <div className='flex'>
                    <div className='basis-[20%] '>
                        <CustomerProfileSideBar />
                        </div>
                        <div className='basis-[80%] '>
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
                                        <td className='px-4 py-2 text-center'>Payment Type</td>
                                        <td className='px-4 py-2 text-center'>Payment Date</td>
                                        <td className='px-4 py-2 text-center'>Payment Status</td>
                                    </tr>

                                </thead>
                                <tbody >
                                    {customerOrders.map((cOrder) => (
                                        <tr key={cOrder.id} className=''>
                                            <td className='px-4 py-4 text-center'>{cOrder.orderID}</td>
                                            <td className='px-4 py-4 text-center'>{cOrder.orderDate}</td>
                                            <td className='px-4 py-4 text-center'>{cOrder.orderType}</td>
                                            <td className='px-4 py-4 text-center'>{cOrder.totalAmount}</td>
                                            <td className='px-4 py-4 text-center'>{getOrderStatus(cOrder.orderStatus)}</td>
                                            <td className='px-4 py-4 text-center'>{cOrder.paymentMethod}</td>
                                            <td className='px-4 py-4 text-center'>{cOrder.paymentDate}</td>
                                            <td className='px-4 py-4 text-center'>{getPaymentStatus(cOrder.paymentStatus)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>

       

            <Footer />
        </div>
    )
}

export default CustomerOrder