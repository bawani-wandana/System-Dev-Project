import React from 'react'
import completed from '../../assets/completed.png'
import { Link } from 'react-router-dom'


const OrderComplete = () => {
  return (
    <div className='container md:mt-10'>
      <div className='flex flex-col items-center'>
        <div>
        <img src={completed} alt=""  className='w-36'/>

        </div>
       
        <div className='mt-3 text-[50px] font-bold uppercase text-c3'>
          Order Successfull
        </div>
        <div>
          <Link to ='/'>
          <button className='bg-b1 px-5 py-2 rounded-md text-white pt-3 mt-3'>
            close
          </button>
          </Link>
       
        </div>

        </div>
      </div>

   
  )
}

export default OrderComplete