import React from 'react';

const CategorySidebar = ({ categories, setSelectedCategory }) => {
    return (
        <div className="w-[400px] bg-blue-100 rounded-md mt-12 ml-8 text-b1 text-[22px] p-4">
            <h2 className="text-3xl font-bold mb-4">Categories</h2>
            <ul>
                {categories.map(category => (
                    <li
                        key={category.category}
                        className="cursor-pointer p-2 hover:bg-gray-300"
                        onClick={() => setSelectedCategory(category.category)}
                    >
                        {category.category}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategorySidebar;
