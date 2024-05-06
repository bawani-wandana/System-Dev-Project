import React, { useEffect, useState } from 'react'
import logo from '../../assets/logo.png'
import search from '../../assets/search.png'
import cart from '../../assets/cart.png'
import favourite from '../../assets/favourite.png'
import user from '../../assets/user.png'




const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);

    //set toggle Menu
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsSticky(true);
            }
            else {
                setIsMenuOpen(false);
            }
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.addEventListener('scroll', handleScroll);
        }
    });



    return (
        <div className='navbar w-full  flex justify-between bg-blue-100 fixed top-0 left-0 right-0 font-[lato]' >
            <div className='m-4 my-2.5 w-[200px]'>
                <img src={logo} alt="" className='cursor-pointer' />
            </div>

            <ul className='ml-12 my-9 mr-96 flex list-none text-b1 text-[23px] space-x-10 font-bold uppercase'>
                <li className='inline-block  cursor-pointer'>Home</li>
                <li className='inline-block  cursor-pointer'>Categories</li>
                <li className='inline-block  cursor-pointer'>Best Sellers</li>
                <li className='inline-block  cursor-pointer'>Contact Us</li>
                <li className='inline-block  cursor-pointer'>About Us</li>
            </ul>

            <div className='search-box h-14 w-[600px] items-center gap-28 justify-center mr-48 flex bg-b1  rounded-md shadow-c2'>
                <input type="text" placeholder='Search by Title/Author/ISBN' className=' bg-transparent border-none outline-none w-96 text-white text-[20px]' />
                <img src={search} alt="" className='w-10 h-10 cursor-pointer' />
            </div>
            





        </div>
    )
}


export default Navbar
