import React from 'react'
import { RiDashboard3Fill } from "react-icons/ri";
import { LuPackage } from "react-icons/lu";
import { Link } from 'react-router-dom';

const SideBar = () => {
  return (
    <div className='bg-b1 h-screen font-[Lato] uppercase' >
      <div className='px-[68px] h-28 py-[30px] flex items-center border-b-[4px]
        border-[#EDEDED]/[0.3]'>
        <h1 className='text-white   text-[30px] leading-[24px] font-bold
            cursor-pointer'>Staff Panel</h1>
      </div>

      <Link to='/staffdashboard'>
        <div className='flex items-center cursor-pointer gap-[15px] py-[20px] border-b-[1px]
        border-[#EDEDED]/[0.3] '>
          <RiDashboard3Fill color='white' className='w-8 ml-5 h-10' />
          <p className='text-[18px] leading-[20px] font-medium text-white'>Dashboard</p>
        </div>
      </Link>

     
      <Link to='/stafforderstatus'>
        <div className='flex items-center cursor-pointer gap-[15px] py-[20px] border-b-[1px]
        border-[#EDEDED]/[0.3]  '>
          <LuPackage color='white' className='w-8 ml-5 h-10' />
          <p className='text-[18px] leading-[20px] font-medium text-white'>Orders</p>
        </div>
      </Link>


    



    </div>
  )
}

export default SideBar