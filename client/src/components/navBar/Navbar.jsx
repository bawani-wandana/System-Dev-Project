import React, { useContext, useState, useEffect } from 'react'
import logo from '../../assets/logo.png'
import { IoMdSearch } from "react-icons/io";
import DarkMode from '../navBar/DarkMode'
import { Link } from 'react-router-dom';
import { FaCartShopping } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa";
import { CartContext } from '../../contexts/CartContext';
import { getDecodedToken } from '../../services/jwtdecoder';


const Menu = [
    {
        id: 1,
        name: "Home",
        link: "/",
    },
    {
        id: 2,
        name: "Best Sellers",
        link: "/bestsellers",
    },
    {
        id: 3,
        name: "About",
        link: "/about",
    },
    {
        id: 4,
        name: "Contact Us",
        link: "/contact",
    },
];

const DropdownLinks = [
    {
        id: 1,
        name: "Novels",
        link: "/novels",
    },
    {
        id: 2,
        name: "Short Stories",
        link: "/shortstories",
    },
    {
        id: 3,
        name: "Translations",
        link: "/translations",
    },
    {
        id: 4,
        name: "Poetry",
        link: "/poetry",
    },
    {
        id: 5,
        name: "Children's",
        link: "/children",
    },
    {
        id: 6,
        name: "Educational- Grade 1-13",
        link: "/educational",
    },
    {
        id: 7,
        name: "Stationery",
        link: "/stationery",
    },
    {
        id: 8,
        name: "Papers",
        link: "/papers",
    },
    {
        id: 9,
        name: "Others",
        link: "/others",
    },
]
const Navbar = () => {
    const { cart } = useContext(CartContext);
    const [userType, setUserType] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token'); // Adjust as per your token storage mechanism
        if (token) {
            const decodedToken = getDecodedToken(token);
            if (decodedToken) {
                setUserType(decodedToken.userType);
            }
        }
    }, []);


    return (
        <div className='w-full shadow-md bg-white dark:bg-gray-900 dark:text-white font-[lato]
        duration-200 '>
            {/* upper Navbar */}
            <div className='sm:py-0'>
                <div className='justify-between flex items-center '>
                    <div>
                        <img src={logo} alt="logo" className='ml-9 cursor-pointer md:my-2 h-20' /><Link to='/'></Link>
                    </div>
                    {/* search bar*/}
                    <div className='flex justify-between ml-24 items-center gap-8 mx-64 pl-32 '>
                        <div className='relative group hidden sm:block'>
                            <input type="text" placeholder='Search by title/Author' className='w-[600px] h-12 sm:w-[600px] group-hover:w-[800px]
                         transition-all duration-300 rounded-lg text-[19px] border bg-b1 border-b1 px-3 text-white py-1 focus:outline-none
                         focus:border-4 focus:border-orange-500 dark:border-gray-500 dark:bg-gray-800'/>
                            <IoMdSearch className='text-white cursor-pointer w-8 h-8 group-hover:text-orange-200 absolute top-1/2 -translate-y-1/2 right-3' />
                        </div>

                    </div>
                    <div>

                    </div>
                    <div className='flex justify-between gap-20'>
                        <div className='flex gap-3 '>
                            {/* cart and favorite*/}

                            {userType === 'Admin' || userType === 'Staff' ? (
                                <Link to={userType === 'Admin' ? '/dashboard' : '/staffdashboard'}>
                                    <button className='ml-4 bg-white border-c3 border-4 px-3 rounded-md text-[18px] text-c3 py-2 items-center'>
                                        DashBoard
                                    </button>
                                </Link>

                            ) : null}
                            <Link to='/cartpage'>
                                <button className='bg-gradient-to-r from-orange-300 to-c3 transition-all duration-200 text-white py-1 px-4 rounded-lg flex items-center
                    gap-3 group '>
                                    <span className='group-hover:block hidden transition-all duration-200 text-[17px] w-[30px]'> View</span>
                                    <FaCartShopping className='text-xl w-7 h-10 text-white drop-shadow-sm cursor-pointer' />
                                    {cart.length > 0 && (
                                        <span className='absolute top-3 right-80 mr-60 bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center'>
                                            {cart.length}
                                        </span>
                                    )}
                                </button>
                            </Link>

                            <button className='bg-gradient-to-r from-orange-300 to-c3 transition-all duration-200 text-white py-1 px-4 rounded-lg flex items-center
                    gap-3 group '>
                                <FaHeart className='text-xl h-10 w-6 text-white drop-shadow-sm cursor-pointer' />
                            </button>
                        </div>

                        {/* Login and Create account */}
                        <div className='flex gap-3 '>
                            <button className='border-4  border-b1 rounded-lg w-[150px] h-12 text-[18px] text-b1 font-bold '>
                                <Link to='/CreateAccount'>Create Account</Link>
                            </button>
                            <button className='bg-gradient-to-r from-blue-600 to-b1 rounded-lg w-[110px] h-12 text-[18px] text-white '>
                                <Link to='/LoginPage'>Login</Link>
                            </button>
                        </div>
                    </div>



                    {/* Darkmode switch */}
                    <div className='mr-4 pl-4 '>
                        <DarkMode />
                    </div>
                </div>
            </div>
            {/* lower Navbar */}
            <div className='flex justify-center bg-b1  dark:bg-gray-800 h-14'>
                <ul className='sm:flex hidden items-center
                gap-7 text-white text-[23px]'>
                    {
                        Menu.map((data) => (
                            <li key={data.id}>
                                <a href={data.link}
                                    className='inline-block px-4 hover:text-yellow-700 duration-200
                                '> {data.name}</a>
                            </li>

                        ))
                    }
                    {/* dropdown */}
                    <li className='group relative cursor-pointer'>
                        <a href='#' className='flex items-center gap-[2px] py-2 hover:text-yellow-700'>
                            Categories
                            <span>
                                <FaCaretDown className='transition-all duration-200 group-hover:rotate-180 ' />
                            </span>
                        </a>
                        <div className='absolute z-[9999] hidden group-hover:block
                        w-[200px] bg-blue-100 rounded-md p-2 text-b1 text-[18px] font-bold shadow-md'>
                            <ul>
                                {DropdownLinks.map((data) => (
                                    <li key={data.id}>
                                        <a href={data.link} className='inline-block *:w-full rounded-md p-2 hover:bg-b1 hover:text-white
                                        '>
                                            {data.name}
                                        </a>

                                    </li>
                                ))}
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>





        </div>
    )
}

export default Navbar