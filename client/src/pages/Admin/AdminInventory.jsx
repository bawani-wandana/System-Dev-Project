import React, { useState, useEffect } from 'react'
import SideBar from '../../components/SideBar'
import DashBoardView from '../../components/DashBoardView'
import { Link } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'
import Navbar from '../../components/navBar/Navbar'

function getStockStatus(status) {
    if (!status) {
        return null;  // Or some default value or element if status is undefined
    }
    switch (status) {
        default:
        case 'in stock':
            return (
                <span className='py-2 px-5 rounded-md text-[18px] text-white bg-green-700'>
                    {status.replaceAll('_', '').toUpperCase()}
                </span>
            )
        case 'low stock':
            return (
                <span className='py-2 px-5 rounded-md text-[18px] text-white bg-orange-800'>
                    {status.replaceAll('_', '').toUpperCase()}
                </span>
            )
        case 'out of stock':
            return (
                <span className='py-2 px-5 rounded-md text-[18px] text-white bg-red-800'>
                    {status.replaceAll('_', '').toUpperCase()}
                </span>
            )
    }
}

const categories = [
    'Novels', 'Short Stories', 'Translations', 'Poetry', "Children's",
    'Educational - Grade 1-13', 'Stationery', 'Papers', 'Others'
];

const EditForm = ({ item, onClose, onSave }) => {
    const [title, setTitle] = useState(item.title);
    const [category, setCategory] = useState(item.category);
    const [author, setAuthor] = useState(item.author);
    const [isbn, setIsbn] = useState(item.isbn);
    const [description, setDescription] = useState(item.description);
    const [stockCount, setStockCount] = useState(item.stockCount)
    const [price, setPrice] = useState(item.price);
    const [threshold, setThreshold] = useState(item.threshold);

    const handleSubmit = (e) => {
        e.preventDefault()
        onSave({
            ...item, title,
            category,
            stockCount,
            price,
            author,
            isbn,
            description,
            threshold,
        })
        onClose()
    }

    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
            <div className='bg-white p-5 rounded-md w-[90%] max-w-[400px]'>
                <h2 className='text-[20px] font-bold mb-4'>Edit Item</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <label className='block text-[20px] text-gray-900'>Title</label>
                        <input
                            type='text'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className='w-full px-3 py-2 border border-green-800 rounded-md'
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-[20px] text-gray-900'>Category</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className='w-full px-3 py-2 border border-green-800 rounded-md'
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                    <div className='mb-4'>
                        <label className='block text-[20px] text-gray-900'>Stock Count</label>
                        <input
                            type='number'
                            value={stockCount}
                            onChange={(e) => setStockCount(e.target.value)}
                            className='w-full px-3 py-2 border border-green-800 rounded-md'
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-[20px] text-gray-900'>Threshold</label>
                        <input
                            type='number'
                            value={threshold}
                            onChange={(e) => setThreshold(e.target.value)}
                            className='w-full px-3 py-2 border border-green-800 rounded-md'
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-[20px] text-gray-900'>Price</label>
                        <input
                            type='text'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className='w-full px-3 py-2 border border-green-800 rounded-md'
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-[20px] text-gray-900'>Author</label>
                        <input
                            type='text'
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            className='w-full px-3 py-2 border border-green-800 rounded-md'
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-[20px] text-gray-900'>ISBN</label>
                        <input
                            type='text'
                            value={isbn}
                            onChange={(e) => setIsbn(e.target.value)}
                            className='w-full px-3 py-2 border border-green-800 rounded-md'
                        />
                    </div>

                    <div className='mb-4'>
                        <label className='block text-[20px] text-gray-900'>Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className='w-full px-3 py-2 border border-green-800 rounded-md'
                        />
                    </div>
                    <div className='flex justify-end gap-4'>
                        <button
                            type='button'
                            onClick={onClose}
                            className='px-4 py-2 bg-gray-800 text-white rounded-md'
                        >
                            Cancel
                        </button>
                        <button
                            type='submit'
                            className='px-4 py-2 bg-green-900 text-white rounded-md'
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

const DeleteConfirmation = ({ item, onClose, onDelete }) => {
    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
            <div className='bg-c4 p-5 rounded-md'>
                <h2 className='text-[22px] font-bold mb-4'>Are you sure you want to delete this item?</h2>
                <p className='mb-4 text-[18px]'>Item ID: {item.itemID}</p>
                <div className='flex justify-end gap-4'>
                    <button
                        type='button'
                        onClick={onClose}
                        className='px-6 py-2 bg-gray-800 text-white rounded-md'
                    >
                        No
                    </button>
                    <button
                        type='button'
                        onClick={() => onDelete(item.itemID)}
                        className='px-6 py-2 bg-red-700 text-white rounded-md'
                    >
                        Yes
                    </button>
                </div>
            </div>
        </div>
    )
}

const AdminInventory = () => {
    const [isEditing, setIsEditing] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null)
    const [isDeleting, setIsDeleting] = useState(false)
    const [inventoryData, setInventoryData] = useState([]);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async() => {
        try {
            const response =await axiosInstance.get('/getitems');
            const itemsWithStockStatus = response.data.map(item => ({
                ...item,
                stockStatus: calculateStockStatus(item.stockCount, item.threshold)
            }));
            setInventoryData(itemsWithStockStatus);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };


    const calculateStockStatus = (stockCount, threshold) => {
        if (stockCount === 0) {
            return 'out of stock';
        } else if (stockCount <= threshold) {
            return 'low stock';
        } else {
            return 'in stock';
        }
    };


    const handleEditClick = (item) => {
        setSelectedItem(item)
        setIsEditing(true)
    }
    const handleDeleteClick = (item) => {
        setSelectedItem(item)
        setIsDeleting(true)
    }

    const handleClose = () => {
        setIsEditing(false)
        setIsDeleting(false)
        setSelectedItem(null)
    }

    const handleSave = async (updatedItem) => {
        try {
            await axiosInstance.put(`/updateitem/${updatedItem.itemID}`, updatedItem);
            fetchItems();
            handleClose();
            toast.success('Item updated successfully');
        } catch (error) {
            console.error('Error updating item:', error);
            toast.error('Failed to update item');
        }
    };

    const handleDelete = async (itemID) => {
        try {
            await axiosInstance.delete(`/deleteitem/${itemID}`);
            fetchItems();
            handleClose();
            toast.success('Item deleted successfully');
        } catch (error) {
            console.error('Error deleting item:', error);
            toast.error('Failed to delete item');
        }
    };

    return (
        <div className='font-[Lato] dark:bg-gray-900 '>
            <div >
                <Navbar />
            </div>
            <div className='flex  flex-col md:flex-row'>
                <div className='basis-[15%] h-[100vh]'>
                    <SideBar />
                </div>
                <div className='basis-[85%] p-4'>
                    <DashBoardView />
                    <div className='flex justify-between items-center'>
                        <h2 className='text-black font-bold ml-5 mt-5 text-[30px] uppercase'>Inventory</h2>
                        <Link to='/additems'><button className='mr-5 bg-green-700 text-white text-[20px] rounded-md mt-6 px-3 py-2 '>Add New Items</button></Link>
                    </div>

                    <div className='bg-c4 px-4 pt-5 mt-10 rounded-md border border-gray-600'>
                        <table className='w-full text-[20px]'>
                            <thead className='bg-c3 text-white text-[20px] rounded-md'>
                                <tr className=''>
                                    <td className='px-4 py-2 text-center'>Item ID</td>
                                    <td className='px-4 py-2 text-center'>Title</td>
                                    <td className='px-4 py-2 text-center'>Category</td>
                                    <td className='px-4 py-2 text-center'>Stock Count</td>
                                    <td className='px-4 py-2 text-center'>Price (Rs.) </td>
                                    <td className='px-4 py-2 text-center'>Threshold</td>
                                    <td className='px-4 py-2 text-center'>Stock Status</td>
                                    <td className='px-4 py-2 text-center'>Actions</td>
                                </tr>
                            </thead>
                            <tbody >
                                {Array.isArray(inventoryData) && inventoryData.length > 0 ? (
                                    inventoryData.map((item) => (
                                        <tr key={item.itemID} className='text-center '>
                                            <td className='py-2'>{item.itemID}</td>
                                            <td className='py-2'>{item.title}</td>
                                            <td className='py-2'>{item.category}</td>
                                            <td className='py-2'>{item.stockCount}</td>
                                            <td className='py-2'>{item.price.toFixed(2)}</td>
                                            <td className='py-2'>{item.threshold}</td>
                                            <td className='py-2'>{getStockStatus(item.stockStatus)}</td>
                                            <td className='py-2'>
                                                <button
                                                    onClick={() => handleEditClick(item)}
                                                    className='mr-2 bg-blue-700 text-white py-1 px-2 rounded-md'
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteClick(item)}
                                                    className='bg-red-700 text-white py-1 px-2 rounded-md'
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan='7' className='text-center py-4'>
                                            No items found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    {isEditing && selectedItem && (
                        <EditForm item={selectedItem} onClose={handleClose} onSave={handleSave} />
                    )}
                    {isDeleting && selectedItem && (
                        <DeleteConfirmation item={selectedItem} onClose={handleClose} onDelete={handleDelete} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default AdminInventory
