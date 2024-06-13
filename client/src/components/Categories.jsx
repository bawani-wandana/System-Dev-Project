import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import ItemCard from './ItemCard';
import CategorySidebar from './CategorySidebar';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('Novels');
    const [items, setItems] = useState([]);

    useEffect(() => {
        // Fetch categories from your API or define them statically
        setCategories([
            { category: 'Novels' },
            { category: 'Short Stories' },
            { category: 'Translations' },
            { category: 'Poetry' },
            { category: "Children's" },
            { category: 'Educational - Grade 1-13' },
            { category: 'Stationery' },
            { category: 'Papers' },
            { category: 'Others' },
            // Add more categories as needed
        ]);
    }, []);

    useEffect(() => {
        if (selectedCategory) {
            const fetchItems = async () => {
                try {
                    const response = await axiosInstance.get(`/category/${selectedCategory}`);
                    setItems(response.data);
                } catch (error) {
                    console.error('Error fetching items:', error);
                }
            };
            fetchItems();
        }
    }, [selectedCategory]);

    return (
        <div className="flex">
            <CategorySidebar categories={categories} setSelectedCategory={setSelectedCategory} />
            <div className="flex flex-wrap gap-20 pl-12 pt-12 justify-center">
                {items.map(item => (
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
        </div>
    );
};

export default Categories;
