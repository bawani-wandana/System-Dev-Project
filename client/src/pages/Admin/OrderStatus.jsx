import React from 'react'
import SideBar from '../../components/SideBar'
import DashBoardView from '../../components/DashBoardView'
import Navbar from '../../components/navBar/Navbar'



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

const ordersdata = [
    {
        id: '1',
        orderID: '',
        orderDate: '',
        orderType: '',
        totalAmount: '',
        orderStatus: 'processing',
        firstName: '',
        phoneNumber: '',
        shippingAddress: '',
        paymentType: '',
        paymentDate: '',
        paymentStatus: 'paid',
        deliveryStatus: 'delivered',
    }
]

const OrderStatus = () => {



    return (
        <div className='font-[Lato]'>
            <div>
                <Navbar/>
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
                                    <td className='px-4 py-2 text-center'>Delivery Status</td>
                                </tr>

                            </thead>
                            <tbody >
                                {ordersdata.map((order) => (
                                    <tr key={order.id} className=''>
                                        <td className='px-4 py-4 text-center'>{order.orderID}</td>
                                        <td className='px-4 py-4 text-center'>{order.orderDate}</td>
                                        <td className='px-4 py-4 text-center'>{order.orderType}</td>
                                        <td className='px-4 py-4 text-center'>{order.totalAmount}</td>
                                        <td className='px-4 py-4 text-center'>{getOrderStatus(order.orderStatus)}</td>
                                        <td className='px-4 py-4 text-center'>{order.firstName}</td>
                                        <td className='px-4 py-4 text-center'>{order.phoneNumber}</td>
                                        <td className='px-4 py-4 text-center'>{order.shippingAddress}</td>
                                        <td className='px-4 py-4 text-center'>{order.paymentType}</td>
                                        <td className='px-4 py-4 text-center'>{order.paymentDate}</td>
                                        <td className='px-4 py-4 text-center'>{getPaymentStatus(order.paymentStatus)}</td>
                                        <td className='px-4 py-4 text-center'>{getDeliveryStatus(order.deliveryStatus)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>


                </div>
            </div>


        </div>

    )
}

export default OrderStatus