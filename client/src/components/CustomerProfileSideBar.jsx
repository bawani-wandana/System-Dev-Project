import React from 'react'
import { ImProfile } from "react-icons/im";
import { FiPackage } from "react-icons/fi";
import { FaRegAddressBook } from "react-icons/fa";
import { Link } from 'react-router-dom';

const SideBar = () => {
  return (
    <div className='bg-c3 h-screen font-[Lato] uppercase' >
      <div className='px-[68px] h-28 py-[30px] flex items-center border-b-[4px]
        border-[#EDEDED]/[0.3]'>
        <h1 className='text-white   text-[30px] leading-[24px] font-bold
            cursor-pointer'>My Account</h1>
      </div>

      <Link to='/profilepage/:id'>
        <div className='flex items-center cursor-pointer gap-[15px] py-[20px] border-b-[1px]
        border-[#EDEDED]/[0.3] '>
          <ImProfile color='white' className='w-8 ml-5 h-10' />
          <p className='text-[18px] leading-[20px] font-medium text-white'> Edit Profile</p>
        </div>
      </Link>


      <Link to='/customerorders'>
        <div className='flex items-center cursor-pointer gap-[15px] py-[20px] border-b-[1px]
        border-[#EDEDED]/[0.3]  '>
          <FiPackage color='white' className='w-8 ml-5 h-10' />
          <p className='text-[18px] leading-[20px] font-medium text-white'>Orders</p>
        </div>
      </Link>

      <Link to='/address'>
        <div className='flex items-center cursor-pointer gap-[15px] py-[20px] border-b-[1px]
        border-[#EDEDED]/[0.3]  '>
          <FaRegAddressBook color='white' className='w-8 ml-5 h-10' />
          <p className='text-[18px] leading-[20px] font-medium text-white'>Addresses</p>
        </div>
      </Link>

    </div>
  )
}

export default SideBar