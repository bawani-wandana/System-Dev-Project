// src/components/ItemCard.js
import React, { useState, useEffect, useContext} from 'react';
import { FaHeart } from "react-icons/fa";
import axiosInstance from '../utils/axiosInstance'
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';



const ItemCard = ({ itemID, name, price, image, stockCount }) => {
    const navigate = useNavigate();
    const { addItemToCart } = useContext(CartContext);
    const [isAdded, setIsAdded] = useState(false);


    const handleClick = () => {
        navigate(`/itemsdisplay/${itemID}`);
    }

    const handleAddToCart = () => {
        const item = { id: itemID, name, price, image, stockCount };
        addItemToCart(item);
        setIsAdded(true);
    };

    return (
        <div className='bg-c4  text-black w-72 shadow-lg shadow-blue-200 rounded-md overflow-hidden font-[Lato]'>
            <div >
                <div onClick={handleClick} className='cursor-pointer'>
                    <div className=''>
                        <img className='w-full h-[18rem] object-contain mt-3 pl-4 pr-4 pt-3' src={image} alt={name} />
                    </div>
                    <div className='pl-8'>
                        <h2 className='pt-3 text-[23px] overflow-ellipsis whitespace-nowrap overflow-hidden'>{name}</h2>
                        <span className='text-[20px] font-bold'>{price}</span>
                        <div className={`pt-1 font-bold text-[20px] ${stockCount > 0 ? 'text-green-500' : 'text-red-500'}`}>{stockCount > 0 ? 'Available' : 'Out of Stock'}</div>
                    </div>
                </div>

                <div className='flex items-center justify-center gap-12 pb-3 pt-2'>
                    <button onClick={handleAddToCart} disabled={isAdded} className={`bg-gradient-to-r ${isAdded ? 'from-green-300 to-green-500' : 'from-orange-300 to-c3'}   text-white hover:bg-b1 hover:text-white rounded-md px-5 py-2 tracking-wider text-[17px] transition`}>
                    {isAdded ? 'Added to cart' : 'Add to cart'}
                    </button>
                    <button  className='bg-gradient-to-r from-orange-300 to-c3 transition-all duration-200 text-white py-1 px-4 rounded-lg flex items-center gap-3 group'>
                        <FaHeart className='text-xl h-10 w-6 text-white drop-shadow-sm cursor-pointer' />
                    </button>
                </div>
            </div>
        </div>
    );
};

const ItemList = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axiosInstance.get('/getitems');
                setItems(response.data);
                console.log('dsvsdv');
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };

        fetchItems();

        // Set up polling to fetch items every 5 seconds
        const intervalId = setInterval(fetchItems, 5000);

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    // Split items into rows of six
    const rows = [];
    for (let i = 0; i < items.length; i += 6) {
        rows.push(items.slice(i, i + 6));
    }

    return (
        <div className='flex flex-col gap-10'>
            {rows.map((row, rowIndex) => (
                <div key={rowIndex} className='flex flex-wrap gap-20 justify-center'>
                    {row.map(item => (
                        <ItemCard
                            key={item.itemID}
                            itemID={item.itemID}
                            name={item.title}
                            price={`Rs. ${item.price.toFixed(2)}`}
                            image={item.imageUrl}
                            stockCount={item.stockCount}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default ItemList;
