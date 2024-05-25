// src/components/ItemCard.js
import React from 'react';
import { FaHeart } from "react-icons/fa";
import akuru from '../assets/akuru.jpg';
import wassane from '../assets/wassane.jpg'
import ladybird from '../assets/ladybird.png'
import changesing from '../assets/changesing.png'
import saman from '../assets/saman.jpg'
import patigaya from '../assets/patigaya.png'
// Item data array
const itemData = [
    {
        id: 1,
        name: 'Akuru',
        price: 'Rs. 440.00',
        image: akuru, // Make sure to import akuru or use the correct path
    },
    // Add more items as needed
    {
        id: 2,
        name: 'Wassane',
        price: 'Rs. 550.00',
        image: wassane,
    },
    {
        id: 3,
        name: 'Lady Bird',
        price: 'Rs. 330.00',
        image: ladybird,
    },
    {
        id: 4,
        name: "Change Sing",
        price: 'Rs. 460.00',
        image: changesing,
    },
    {
        id: 5,
        name: "Mama Saman",
        price: 'Rs.870.00',
        image: saman,         
    },
    {
        id: 6,
        name: "Patigaya",
        price: "Rs.380.00",
        image: patigaya,
    }
];

const ItemCard = ({ name, price, image }) => {
    return (
        <div className='bg-c4 text-black w-72  shadow-lg shadow-blue-200 rounded-md overflow-hidden font-[Lato]'>
            <div>
                <div className=''>
                    <img className='  mt-5 pt-3 object-cover' src={image} alt={name} />
                </div>
                <div className='pl-8'>
                    <h2 className='pt-3 text-[25px] overflow-ellipsis overflow-hidden'>{name}</h2>
                    <span className='text-[20px] font-bold'>{price}</span>
                </div>
                <div className='flex items-center justify-center gap-12 pb-4 pt-2'>
                    <button className='bg-gradient-to-r from-orange-300 to-c3 text-white hover:bg-black hover:text-white rounded-md px-5 py-3 tracking-wider text-[17px] transition'>
                        Add to cart
                    </button>
                    <button className='bg-gradient-to-r from-orange-300 to-c3 transition-all duration-200 text-white py-1 px-4 rounded-lg flex items-center gap-3 group'>
                        <FaHeart className='text-xl h-10 w-6 text-white drop-shadow-sm cursor-pointer' />
                    </button>
                </div>
            </div>
        </div>
    );
};

const ItemList = () => {
    return (
        <div className='flex flex-wrap gap-20'>
            {itemData.map(item => (
                <ItemCard
                    key={item.id}
                    name={item.name}
                    price={item.price}
                    image={item.image}
                />
            ))}
        </div>
    );
};

export default ItemList;
