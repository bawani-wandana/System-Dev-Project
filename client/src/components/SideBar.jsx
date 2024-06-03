import React from 'react'
import { RiDashboard3Fill } from "react-icons/ri";
import { MdInventory } from "react-icons/md";
import { FaUserGroup } from "react-icons/fa6";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { LuPackage } from "react-icons/lu";
import { Link } from 'react-router-dom';

const SideBar = () => {
  return (
    <div className='bg-b1 h-screen font-[Lato] uppercase' >
      <div className='px-[68px] h-28 py-[30px] flex items-center border-b-[4px]
        border-[#EDEDED]/[0.3]'>
        <h1 className='text-white   text-[30px] leading-[24px] font-bold
            cursor-pointer'>Admin Panel</h1>
      </div>

      <Link to='/dashboard'>
        <div className='flex items-center cursor-pointer gap-[15px] py-[20px] border-b-[1px]
        border-[#EDEDED]/[0.3] '>
          <RiDashboard3Fill color='white' className='w-8 ml-5 h-10' />
          <p className='text-[18px] leading-[20px] font-medium text-white'>Dashboard</p>
        </div>
      </Link>


      <Link to='/inventory'>
        <div className='flex items-center cursor-pointer gap-[15px] py-[20px] border-b-[1px]
        border-[#EDEDED]/[0.3]  '>
          <MdInventory color='white' className='w-8 ml-5 h-10' />
          <p className='text-[18px] leading-[20px] font-medium text-white'>Inventory</p>
        </div>
      </Link>

      <Link to='/additems'>
        <div className='flex items-center cursor-pointer gap-[15px] py-[20px] border-b-[1px]
        border-[#EDEDED]/[0.3]  '>
          <MdOutlineAddCircleOutline color='white' className='w-8 ml-5 h-10' />
          <p className='text-[18px] leading-[20px] font-medium text-white'>Add Items</p>
        </div>
      </Link>
      <Link to='/orderstatus'>
        <div className='flex items-center cursor-pointer gap-[15px] py-[20px] border-b-[1px]
        border-[#EDEDED]/[0.3]  '>
          <LuPackage color='white' className='w-8 ml-5 h-10' />
          <p className='text-[18px] leading-[20px] font-medium text-white'>Orders</p>
        </div>
      </Link>

      <Link to='/userhandling'>
        <div className='flex items-center cursor-pointer gap-[15px] py-[20px] border-b-[1px]
        border-[#EDEDED]/[0.3]  '>
          <FaUserGroup color='white' className='w-8 ml-5 h-10' />
          <p className='text-[18px] leading-[20px] font-medium text-white'>User Handling</p>
        </div>

      </Link>

      <Link to='/staffhandling'>
        <div className='flex items-center cursor-pointer gap-[15px] py-[20px] border-b-[1px]
        border-[#EDEDED]/[0.3]  '>
          <FaUserGroup color='white' className='w-8 ml-5 h-10' />
          <p className='text-[18px] leading-[20px] font-medium text-white'>Manage Staff</p>
        </div>

      </Link>



    </div>
  )
}

export default SideBar