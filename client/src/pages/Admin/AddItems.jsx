import React, { useState, useEffect } from 'react'
import SideBar from '../../components/SideBar'
import DashBoardView from '../../components/DashBoardView'
import CurrencyInput from 'react-currency-input-field';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../../utils/axiosInstance';
import { jwtDecode } from 'jwt-decode';
import { storage } from '../../services/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import Navbar from '../../components/navBar/Navbar';



const getDecodedToken = () => {
    const token = localStorage.getItem('token');
    return jwtDecode(token);
};

const AddItems = () => {
    const [imageUpload, setImageUpload] = useState(null)
    const [errors, setErrors] = useState({});
    const [userTypeID, setUserTypeID] = useState("");
    const navigate = useNavigate();
    const [items, setItems] = useState({
        title: '',
        category: '',
        stockCount: '',
        price: '',
        imageUrl: '',
        author: '',
        isbn: '',
        description: '',
        userTypeID: '',
    });

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImageUpload(e.target.files[0]);
        }
    }


    const handleChange = (e) => {
        setItems({
            ...items,
            [e.target.name]: (e.target.value)
        })
    }

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

        if (!items.stockCount) {
            newErrors.stockCount = 'Count In Stock is required';
            toast.error('Count In Stock is required');
        }

        if (!items.price) {
            newErrors.price = 'Price is required';
            toast.error('Price is required');
        }

        if (!imageUpload) {
            newErrors.imageUrl = 'Image is required';
            toast.error('Image is required');
        }

        return newErrors;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // const user = getDecodedToken();
        // setUserTypeID(user.userTypeID);

        const formErrors = validate();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        const decodedToken = getDecodedToken();
        const userTypeID = decodedToken ? decodedToken.userTypeID : null;
        const saveFromData = (imageUrl) => {

            const itemsToSend = {
                ...items,
                userTypeID: userTypeID,
                imageUrl: imageUrl,
            };

            const request = axiosInstance.post('/additem', itemsToSend);

            request.then((response) => {
                toast.success("Item added successfully");
                response.data;
                setItems({
                    title: '',
                    category: '',
                    stockCount: '',
                    price: '',
                    imageUrl: '',
                    author: '',
                    isbn: '',
                    description: '',
                    userTypeID: '',
                });
            });
        }

        try {
            //Uploading images to the firebase storage
            let imageUrl = null;
            if (imageUpload) {
                //Generate a unique name for the image
                const uniqueImageName = `${imageUpload.name}-${v4()}`;
                const imageRef = ref(storage, `images/${uniqueImageName}`);
                const snapshot = await uploadBytes(imageRef, imageUpload);
                imageUrl = await getDownloadURL(snapshot.ref);
            } saveFromData(imageUrl)
        } catch (error) {
            console.error("Error uploading image to firebase storage", error);
            toast.error("Error uploading image to firebase storage");
        }


    };


    return (
        <div className=' flex-col md:flex-row bg-[#fdf1e0] font-[Lato]'>
            <div>
                <Navbar/>
            </div>
            <div className='flex'>
                <div className='md:w-1/6 h-screen'>
                    <SideBar />
                </div>
                <div className='md:w-5/6'>
                    <DashBoardView />
                    <div className=''>
                        <form onSubmit={handleSubmit} className='grid '>
                            <div className='mt-6 ml-8 flex items-center justify-between '>
                                <Link to='/inventory'>
                                    <button className='bg-c3 rounded-md text-[22px] text-white p-4  ml-3'>Go to Inventory</button>
                                </Link>

                                <h1 className='text-[40px] font-medium'>Add Items</h1>

                                <button type='submit' className='bg-green-700 rounded-md text-[22px] text-white p-4  mr-10'>Publish Now</button>

                            </div>
                            <div>

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
                                            <input type="number" id='stockCount' name='stockCount' min='1' value={items.stockCount} onChange={handleChange} placeholder='0' className={`w-[650px]  rounded-md border-[2px] border-black pl-3 h-14 text-[20px] ${errors.stockcount ? 'border-red-500' : ''}`} />
                                            {errors.stockCount && <p className="text-red-500 text-lg italic">{errors.stockCount}</p>}
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
                                            className={`w-[650px]  rounded-md border-[2px] border-black pl-3 h-14 text-[20px] ${errors.price ? 'border-red-500' : ''}`}
                                        />
                                        {errors.price && <p className="text-red-500 text-lg italic">{errors.price}</p>}
                                    </div>
                                </div>

                                <div className='ml-7 pl-4 mt-6 p'>
                                    <label htmlFor="imageUrl" className='text-[20px] '>Upload Image</label>
                                    <div className='pt-3'>
                                        <input type="file" accept="images/*" onChange={handleImageChange} className={`w-[650px]  rounded-md   h-14 text-[20px] ${errors.imageUrl ? 'border-red-500' : ''}`} />
                                        {errors.imageUrl && <p className="text-red-500 text-lg italic">{errors.imageUrl}</p>}
                                    </div>
                                </div>

                            </div>
                        </form>
                    </ div>
                </div>
            </div>

            <ToastContainer />
        </div>
    )
}

export default AddItems;