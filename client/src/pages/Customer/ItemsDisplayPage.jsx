import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../../components/navBar/Navbar';
import Footer from '../../components/footer/Footer';
import axiosInstance from '../../utils/axiosInstance';
import { FaHeart } from "react-icons/fa";
import { IoMdArrowBack } from "react-icons/io";

const ItemsDisplayPage = () => {
    const { itemID } = useParams();
    const [item, setItem] = useState(null);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                console.log(`Fetching item with ID: ${itemID}`);
                const response = await axiosInstance.get(`/getitems/${itemID}`);
                console.log('Item data:', response.data);
                setItem(response.data);
            } catch (error) {
                console.error('Error fetching item details:', error);
            }
        };

        fetchItem();
    }, [itemID]);

    if (!item) {
        return <div>Loading...</div>;
    }

    const {
        title = 'N/A',
        price,
        imageUrl = '',
        stockCount = 0,
        author = 'Unknown',
        isbn = 'Unknown',
        description = 'No description available',
    } = item;

    const availability = stockCount > 0 ? 'Available' : 'Out of Stock';
    const availabilityClass = stockCount > 0 ? 'text-green-500' : 'text-red-500';

    return (
        <div className='bg-blue-50 dark:bg-gray-900'>
            <Navbar />
            <div className='flex '>
                <Link to='/'>
                    <h2 className='flex text-b1 items-start text-[25px] mt-8 pt-4 ml-12'>
                        <IoMdArrowBack className='mt-2 w-6 h-6' />Back to HomePage
                    </h2>
                </Link>
            </div>

            <div className="flex justify-center bg-c4 items-center mt-12">
                <div className='w-[500px] h-[550px] bg-c3 rounded-md flex items-center justify-center'>
                    <img className="max-w-full pl-8 pr-8 max-h-full object-contain" src={imageUrl} alt={title} />
                </div>
                <div className='ml-16'>
                    <div className=''>
                        <h1 className="text-4xl font-bold mt-4">{title}</h1>
                        <p className="text-2xl mt-2">{`Rs. ${(Number(price) || 0).toFixed(2)}`}</p>
                        <p className={`mt-2 text-[22px] ${availabilityClass}`}>{availability}</p>
                        <p className="mt-2 text-[20px]">Author: {author}</p>
                        <p className="mt-2 text-[20px]">ISBN: {isbn}</p>
                        <p className="mt-2 w-[500px] justify-center text-[20px]">Description: {description}</p>
                    </div>

                    <div className="flex items-center gap-8 mt-8">
                        <button className='bg-gradient-to-r from-orange-300 to-c3 text-white hover:bg-b1 hover:text-white rounded-md px-8 py-4 tracking-wider text-[22px] transition'>
                            Add to cart
                        </button>
                        <button className='bg-gradient-to-r from-orange-300 to-c3 transition-all duration-200 text-white py-4 px-6 rounded-lg flex items-center gap-3 group'>
                            <FaHeart className='text-xl h-10 w-8 text-white drop-shadow-sm cursor-pointer' />
                        </button>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default ItemsDisplayPage;
