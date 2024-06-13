import React from 'react';
import { Link } from 'react-router-dom';

const SearchResultBox = ({ item, onItemClick }) => {
    const { itemID, title, author, imageUrl } = item;

    return (
        <Link to={`/itemsdisplay/${itemID}`} className="flex items-center h-24 shadow-sm shadow-c3 bg-c4 border-2 border-c3 gap-4 p-2  rounded-lg hover:bg-gray-100">
            <img src={imageUrl} alt={title} className="w-20 h-20 border-2  border-c3 object-cover rounded-md" />
            <div>
                <h3 className="text-xl font-bold">{title}</h3>
                <p className="text-[20px]">{author}</p>
            </div>
        </Link>
    );
};

export default SearchResultBox;