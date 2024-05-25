import React, { useState } from 'react'
import SideBar from '../../components/SideBar'
import DashBoardView from '../../components/DashBoardView'
import CurrencyInput from 'react-currency-input-field';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AddItems = () => {
    const [items, setItems] = useState({
        title: '',
        category: '',
        stockcount: '',
        price: '',
        description: '',
        imageurl: '',
        author: '',
        isbn: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setItems({
            ...items,
            [name]: value
        });
    };
    const handlePriceChange = (value) => {
        setItems({
            ...items,
            price: value
        });
    };


    const validate = () => {
        const newErrors = {};

        if (!items.title) {
            newErrors.title = 'Product title is required';
            toast.error('Product title is required');
        }

        if (!items.category) {
            newErrors.category = 'Category is required';
            toast.error('Category is required');
        }

        if (!items.stockcount) {
            newErrors.stockcount = 'Count In Stock is required';
            toast.error('Count In Stock is required');
        }

        if (!items.price) {
            newErrors.price = 'Price is required';
            toast.error('Price is required');
        }

        if (!items.imageurl) {
            newErrors.imageurl = 'Image URL is required';
            toast.error('Image URL is required');
        }

        return newErrors;
    };
    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const formErrors = validate();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            toast.error("All fields are required");
        } else {
            setErrors({});
            // Handle form submission
            console.log('Items added successfully', items);

        }
    };


    return (
        <div className='flex flex-col md:flex-row font-[Lato]'>
            <div className='md:w-1/6 h-screen'>
                <SideBar />
            </div>
            <div className='md:w-5/6'>
                <DashBoardView />
                <div className=''>
                    <div className='mt-6 ml-8 flex items-center justify-between '>
                        <Link to='/inventory'>
                            <button className='bg-c3 rounded-md text-[22px] text-white p-4  ml-3'>Go to Inventory</button>
                        </Link>

                        <h1 className='text-[40px] font-medium'>Add Items</h1>

                        <button type='submit' onClick={handleSubmit} className='bg-green-700 rounded-md text-[22px] text-white p-4  mr-10'>Publish Now</button>

                    </div>
                    <div>
                        <form onSubmit={handleSubmit} className='grid '>
                            <div className='flex gap-40'>
                                <div className='ml-7 pl-4 mt-8 '>
                                    <label htmlFor="title" className='text-[20px] '>Title</label>
                                    <div className='pt-3'>
                                        <input type="text" id='title' name='title' value={items.title} onChange={handleChange} placeholder='Enter Item Title' className={`w-[650px] rounded-md border-[2px] border-black pl-3 h-14 text-[20px] ${errors.title ? 'border-red-500' : ''}  `} />
                                        {errors.title && <p className="text-red-500 text-lg italic">{errors.title}</p>}
                                    </div>
                                </div>
                                <div className='ml-7 pl-4 mt-8 '>
                                    <label htmlFor="author" className='text-[20px] '>Author (Optional)</label>
                                    <div className='pt-3'>
                                        <input type="text" id='author' name='author' value={items.author} onChange={handleChange} placeholder='Enter Book Author' className='w-[650px] rounded-md border-[2px] border-black pl-3 h-14 text-[20px]  ' />
                                    </div>
                                </div>
                            </div>
                            <div className='flex gap-40'>
                                <div className='ml-7 pl-4 mt-6 '>
                                    <label htmlFor="category" className='text-[20px] '>Category</label>
                                    <div className='pt-3'>
                                        <input type="text" id='category' name='category' list='categories' onChange={handleChange} value={items.category} placeholder='Select a Category' className={`w-[650px] rounded-md border-[2px] border-black pl-3 h-14 text-[20px]${errors.category ? 'border-red-500' : ''}`} />
                                        <datalist id="categories">
                                            <option value="Novels" />
                                            <option value="Short Stories" />
                                            <option value="Translations" />
                                            <option value="Poetry" />
                                            <option value="Children's" />
                                            <option value="Educational - Grade 1-13" />
                                            <option value="Stationery" />
                                            <option value="Papers" />
                                            <option value="Others" />
                                        </datalist>
                                        {errors.category && <p className="text-red-500 text-lg italic">{errors.category}</p>}
                                    </div>
                                </div>
                                <div className='ml-7 pl-4 mt-6 '>
                                    <label htmlFor="isbn" className='text-[20px] '>ISBN (Optional)</label>
                                    <div className='pt-3'>
                                        <input type="text" id='isbn' name='isbn' value={items.isbn} onChange={handleChange} placeholder='Enter ISBN ' className='w-[650px] rounded-md border-[2px] border-black pl-3 h-14 text-[20px]' />
                                    </div>
                                </div>

                            </div>
                            <div className='flex gap-40'>
                                <div className='ml-7 pl-4 mt-6 '>
                                    <label htmlFor="stockcount" className='text-[20px] '>Stock Count</label>
                                    <div className='pt-3'>
                                        <input type="number" id='stockcount' name='stockcount' min='1' value={items.stockcount} onChange={handleChange} placeholder='0' className={`w-[650px]  rounded-md border-[2px] border-black pl-3 h-14 text-[20px] ${errors.stockcount ? 'border-red-500' : ''}`} />
                                        {errors.stockcount && <p className="text-red-500 text-lg italic">{errors.stockcount}</p>}
                                    </div>
                                </div>
                                <div className='ml-7 pl-4 mt-6 '>
                                    <label htmlFor="description" className='text-[20px] '>Description</label>
                                    <div className='pt-3'>
                                        <textarea id='description' name='description' value={items.description} onChange={handleChange} placeholder='Type here' rows='4' className='w-[650px] h-24 rounded-md border-[2px] border-black pl-3  text-[20px]' >
                                        </textarea>
                                    </div>
                                </div>
                            </div>

                            <div className='ml-7 pl-4 mt-6  '>
                                <label htmlFor="price" className='text-[20px] '>Price</label>
                                <div className='pt-3'>
                                    <CurrencyInput
                                        id="price"
                                        name="price"
                                        placeholder="Please enter a price"
                                        value={items.price}
                                        onValueChange={handlePriceChange}
                                        defaultValue={100}
                                        decimalsLimit={2}
                                        maxLength={10}
                                        prefix='Rs '
                                        className={`w-[650px]  rounded-md border-[2px] border-black pl-3 h-14 text-[20px] ${errors.price ? 'border-red-500' : ''}`}
                                    />
                                    {errors.price && <p className="text-red-500 text-lg italic">{errors.price}</p>}
                                </div>
                            </div>

                            <div className='ml-7 pl-4 mt-6 p'>
                                <label htmlFor="imageurl" className='text-[20px] '>Image URL</label>
                                <div className='pt-3'>
                                    <input type="text" id='imageurl' name='imageurl' value={items.imageurl} onChange={handleChange} placeholder='https://example.com/image.jpg' className={`w-[650px]  rounded-md border-[2px] border-black pl-3 h-14 text-[20px] ${errors.imageurl ? 'border-red-500' : ''}`} />
                                    {errors.imageurl && <p className="text-red-500 text-lg italic">{errors.imageurl}</p>}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddItems