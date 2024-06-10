import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { FaRegBell } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";


const DashBoardView = () => {

  return (
    <div className='flex items-center justify-between h-[75px] shadow-lg px-[25px]'>
        <div className='flex items-center pl-5 pt-0.5 text-[20px] '>
            <input type="text" className='bg-gray-300 h-[50px] outline-none pl-[13px]
            w-[500px] rounded-tl-md rounded-bl-md text-b1 placeholder:text-[20px]  leading-[20px] font-normal ' placeholder='Search for...'/>
            <div className='bg-b1 h-[50px] px-[14px] flex items-center justify-center cursor-pointer rounded-br-md rounded-tr-md'>
                <FaSearch color='white'/>
            </div>

        </div>
        <div className='flex items-center gap-[15px] relative'>
            <div className='flex items-center gap-[25px] border-r-[1px] pr-[25px]'>
    
            </div>
            <div className='flex items-center gap-[15px] relative'>
                <p className='text-[20px] font-bold'>
                    Welcome! , Admin
                </p>
            </div>
        </div>
    </div>
  )
}

export default DashBoardView