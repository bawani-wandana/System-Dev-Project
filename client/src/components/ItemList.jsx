import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import ItemCard from './ItemCard';

const ItemList = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axiosInstance.get('/getItemCard');
                setItems(response.data);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };

        fetchItems();

        // Set up polling to fetch items every 5 seconds
        // const intervalId = setInterval(fetchItems, 5000);

        // // Cleanup interval on component unmount
        // return () => clearInterval(intervalId);
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
                            price={`${item.price.toFixed(2)}`}
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
