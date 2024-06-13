import React, { useContext, useState, useEffect } from 'react';
import logo from '../../assets/logo.png';
import { IoMdSearch } from "react-icons/io";
import DarkMode from '../navBar/DarkMode';
import { Link, useNavigate } from 'react-router-dom';
import { FaCartShopping } from "react-icons/fa6";
import { FaHeart, FaCaretDown } from "react-icons/fa";
import { CartContext } from '../../contexts/CartContext';
import { getDecodedToken } from '../../services/jwtdecoder';
import UserAccount from '../UserAccount';
import { toast } from "react-toastify";
import axiosInstance from '../../utils/axiosInstance';
import SearchResultBox from '../SearchResult';

const Menu = [
  { id: 1, name: "Home", link: "/" },
  { id: 2, name: "About", link: "/about" },
  { id: 3, name: "Contact Us", link: "/contact" },
];

const DropdownLinks = [
  { id: 1, name: "Novels", category: "Novels" },
  { id: 2, name: "Short Stories", category: "Short Stories" },
  { id: 3, name: "Translations", category: "Translations" },
  { id: 4, name: "Poetry", category: "Poetry" },
  { id: 5, name: "Children's", category: "Children's" },
  { id: 6, name: "Educational - Grade 1-13", category: "Educational - Grade 1-13" },
  { id: 7, name: "Stationery", category: "Stationery" },
  { id: 8, name: "Papers", category: "Papers" },
  { id: 9, name: "Others", category: "Others" },
];

const Navbar = () => {
  const { cart } = useContext(CartContext);
  const [userType, setUserType] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = getDecodedToken(token);
      if (decodedToken) {
        setUserType(decodedToken.userType);
      }
    }
  }, []);

  const handleLogout = () => {
    const userTypeName = userType === 'Admin' ? 'Administrator' : userType === 'Staff' ? 'Staff' : 'User';
    localStorage.removeItem('token');
    setUserType(null);
    navigate('/');
    toast.success(`Logged out successfully! Goodbye, ${userTypeName}!`, {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value.length > 2) {
      fetchSearchResults(e.target.value);
    } else {
      setSearchResults([]);
    }
  };

  const fetchSearchResults = async (query) => {
    try {
      const response = await axiosInstance.get('/searchItems', { params: { query } });
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <div className='w-full shadow-md bg-white dark:bg-gray-900 dark:text-white font-[lato] duration-200'>
      <div className='sm:py-0'>
        <div className='justify-between flex items-center'>
          <div>
            <Link to='/'>
              <img src={logo} alt="logo" className='ml-9 cursor-pointer md:my-2 h-20' />
            </Link>
          </div>
          <div className='flex justify-between ml-24 items-center gap-8 mx-64 pl-32'>
            <div className='relative'>
              <input
                type="text"
                placeholder='Search by title/Author'
                value={searchTerm}
                onChange={handleSearchChange}
                className='w-[600px] h-12 sm:w-[600px] transition-all duration-300 rounded-lg text-[19px] border bg-b1 border-b1 px-3 text-white py-1 focus:outline-none focus:border-4 focus:border-orange-500 dark:border-gray-500 dark:bg-gray-800'
              />
              <IoMdSearch className='text-white cursor-pointer w-8 h-8 absolute top-1/2 -translate-y-1/2 right-3' />
              {searchResults.length > 0 && (
                <div className='absolute w-full bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 mt-1 rounded-lg z-50'>
                  {searchResults.map(item => (
                    <SearchResultBox key={item.itemID} item={item} />
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className='flex justify-between gap-4'>
            <div className='flex gap-4'>
              {userType === 'Admin' || userType === 'Staff' ? (
                <Link to={userType === 'Admin' ? '/dashboard' : '/staffdashboard'}>
                  <button className='ml-4 bg-white border-c3 border-4 px-3 rounded-md text-[18px] text-c3 py-2 items-center'>
                    Dashboard
                  </button>
                </Link>
              ) : null}
              <Link to='/cartpage'>
                <button className='bg-gradient-to-r from-orange-300 to-c3 transition-all duration-200 text-white py-1 px-4 rounded-lg flex items-center gap-3 group'>
                  <span className='group-hover:block hidden transition-all duration-200 text-[17px] w-[30px]'>View</span>
                  <FaCartShopping className='text-xl w-7 h-10 text-white drop-shadow-sm cursor-pointer' />
                  {cart.length > 0 && (
                    <span className='absolute top-3 right-[530px] bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center'>
                      {cart.length}
                    </span>
                  )}
                </button>
              </Link>
              <button className='bg-gradient-to-r from-orange-300 to-c3 transition-all duration-200 text-white py-1 px-4 rounded-lg flex items-center gap-3 group'>
                <FaHeart className='text-xl h-10 w-6 text-white drop-shadow-sm cursor-pointer' />
              </button>
            </div>
            {userType ? (
              <button onClick={handleLogout} className='bg-gradient-to-r from-red-600 to-red-400 rounded-lg w-[110px] h-12 text-[20px] text-white'>
                Logout
              </button>
            ) : (
              <div className='flex gap-3'>
                <button className='border-4 border-b1 rounded-lg w-[150px] h-12 text-[18px] text-b1 font-bold'>
                  <Link to='/CreateAccount'>Create Account</Link>
                </button>
                <button className='bg-gradient-to-r from-blue-600 to-b1 rounded-lg w-[110px] h-12 text-[18px] text-white'>
                  <Link to='/LoginPage'>Login</Link>
                </button>
              </div>
            )}
          </div>
          <div className='pl-3'>
            <DarkMode />
          </div>
          <div className='mr-5'>
            <UserAccount className='mr-3' />
          </div>
        </div>
      </div>
      <div className='flex justify-center bg-b1 dark:bg-gray-800 h-14'>
        <ul className='sm:flex hidden items-center gap-7 text-white text-[23px]'>
          {Menu.map((data) => (
            <li key={data.id}>
              <Link to={data.link} className='inline-block px-4 hover:text-yellow-700 duration-200'>
                {data.name}
              </Link>
            </li>
          ))}
          <li className='group relative cursor-pointer'>
            <div className='flex items-center gap-[2px] py-2 hover:text-yellow-700'>
              Categories
              <span>
                <FaCaretDown className='transition-all duration-200 group-hover:rotate-180' />
              </span>
            </div>
            <div className='absolute z-[9999] hidden group-hover:block w-[200px] bg-blue-100 rounded-md p-2 text-b1 text-[18px] font-bold shadow-md'>
              <ul>
                {DropdownLinks.map((data) => (
                  <li key={data.id}>
                    <Link to={`/categories/${data.category}`} className='inline-block w-full rounded-md p-2 hover:bg-b1 hover:text-white'>
                      {data.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
