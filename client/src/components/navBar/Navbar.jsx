import React from 'react'
import logo from '../../assets/logo.png'
import search from '../../assets/search.png'
import cart from '../../assets/cart.png'
import favourite from '../../assets/favourite.png'
import user from '../../assets/user.png'




const Navbar = () => {
  return (
    <div className='navbar w-full flex items-center justify-between bg-white shadow-2 font-[lato]' >
        <img src={logo} alt="" className='logo w-[100px] h-[90px] cursor-pointer ml-10 my-2.5'/>

        <ul className='ml-5 flex-1 list-none text-purple-950  space-x-10  font-medium'>
            <li className='inline-block m-[10px] [20px] text-[30px] cursor-pointer'>Home</li>
            <li className='inline-block m-[10px] [20px] text-[30px] cursor-pointer'>Categories</li>
            <li className='inline-block m-[10px] [20px] text-[30px] cursor-pointer'>Contact Us</li>
            <li className='inline-block m-[10px] [20px] text-[30px] cursor-pointer'>About Us</li>
        </ul>
        
        <div className='search-box w-[600px] items-center gap-72 justify-center mr-48 flex bg-c1 py-2 rounded-[50px] shadow-c2'>
            <input type="text" placeholder='Search by Title/Author/ISBN' className=' bg-transparent border-none outline-none text-white text-[20px]' />
            <img src={search} alt="" className='w-[40px] cursor-pointer'/>
        </div>

        <div className='flex space-x-4 mx-[20px]'>
            <img src={favourite} alt="" className='w-[55px] cursor-pointer mx-[10px]'/>
            <img src={cart} alt="" className='w-[55px] m cursor-pointer' />
            <h4 className='text-[20px] font-medium mt-3'>Rs.0.00</h4>
        
        </div>

        <div className='mx-[20px]'>
            <button className='bg-c1 px-5 py-3 text-xl uppercase tracking-widest hover:gray-600 space-x-50 rounded-full text-white'> Login/Register </button>
        </div>

        <img src={user} alt="" className='w-[55px] cursor-pointer mr-10 mx-[20px]' />
        <hr/>
        

    </div>
  )
}


export default Navbar
