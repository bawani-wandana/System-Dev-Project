import React from 'react'
import { Link } from 'react-router-dom'
import register from '../assets/register.png'
import { FaHome } from "react-icons/fa";

const CreateAccount = () => {
  return (
    <div className='md:flex justify-center items-center md:w-full min-h-screen bg-orange-50 h-screen m-auto border rounded-md
    overflow-hidden shadow-c3 font-[Lato]'>
      <div className='container flex h-4/5 w-full m-auto justify-between
      rounded-[10px] bg-white  '>
        <div className='img md:shrink-0 flex basis-1/2 h-full pl-0
        text-center   flex-col ml-0 rounded-md overflow-hidden relative'>
          <img src={register} alt="" className='absolute h-full w-full object-cover top-0
          bottom-0 right-0 left-0 ' />
          <div className='footer flex absolute bottom-[10px] ml-3 mr-3 h-[60px] 
          left-0 right-0 justify-between rounded-md backdrop-blur-2xl'>
            <span className='text relative ml-20 mt-3 text-white text-[20px] font-medium'>
              Already have an account?
              <Link to='/LoginPage'>
                <button className='btn ml-3 bg-c3 text-white text-[20px] pr-8 pl-8 pt-1 pb-1 rounded-md font-medium
                duration-25'>
                  Login
                </button>
              </Link>
            </span>

          </div>
        </div>

        <div className='form flex mt-3 flex-col mr-20 gap-4'>
          <div className='header pt-2 text-[35px] text-black font-bold '>
            <h3>Let Us Know You!</h3>
          </div>

          <form action="" className='form grid gap-5 '>
            {/* First Name & Last Name */}
            <div className='flex  '>
              <div className='inputDiv   bg-none'>
                <label htmlFor="firstname" className='text-black pb-2 font-medium text-[20px]
              block'>First Name</label>
                <div className='input text-[20px] '>
                  <input type="text" id='firstname' placeholder='Enter First Name' className='flex gap-3 rounded-md border-[2px] border-black pl-3 h-12 text-[20px] w-60 ' />
                </div>
              </div>

              <div className='inputDiv bg-none pl-12 outline-none border-none
            w-[200px]'>
                <label htmlFor="lastname" className='text-black pb-2 font-medium text-[20px]
              block'>Last Name</label>
                <div className='input text-[20px] '>
                  <input type="text" id='lastname' placeholder='Enter Last Name' className='flex gap-3 rounded-md border-[2px] pl-3 border-black h-12 text-[20px] w-60' />
                </div>
              </div>
            </div>

            {/* Email */}
            <div className='inputDiv  bg-none'>
                <label htmlFor="email" className='text-black pb-2 font-medium text-[20px]
              block'>Email</label>
                <div className='input text-[20px] '>
                  <input type="email" id='email' placeholder='Enter Email' className='flex gap-3 rounded-md border-[2px] border-black pl-3 h-12 text-[20px] w-96 ' />
                </div>
              </div>

              {/* username */}
              <div className='inputDiv   bg-none'>
                <label htmlFor="username" className='text-black pb-2 font-medium text-[20px]
              block'>Username</label>
                <div className='input text-[20px] '>
                  <input type="text" id='username' placeholder='Enter Username' className='flex gap-3 rounded-md border-[2px] border-black pl-3 h-12 text-[20px] w-96 ' />
                </div>
              </div>

              {/* phone Number */}
              <div className='inputDiv   bg-none'>
                <label htmlFor="phonenumber" className='text-black pb-2 font-medium text-[20px]
              block'>Phone Number</label>
                <div className='input text-[20px] '>
                  <input type="tel" id='phonenumber' placeholder='Enter Phone Number' className='flex gap-3 rounded-md border-[2px] border-black pl-3 h-12 text-[20px] w-96 ' />
                </div>
              </div>

              {/* Password */}
              <div className='inputDiv   bg-none'>
                <label htmlFor="password" className='text-black pb-2 font-medium text-[20px]
              block'>Password</label>
                <div className='input text-[20px] '>
                  <input type="password" id='password' placeholder='Enter Password' className='flex gap-3 rounded-md border-[2px] border-black pl-3 h-12 text-[20px] w-96 ' />
                </div>
              </div>

              {/* Confirm Password */}
              <div className='inputDiv   bg-none'>
                <label htmlFor="confirm" className='text-black pb-2 font-medium text-[20px]
              block'>Confirm Password</label>
                <div className='input text-[20px] '>
                  <input type="password" id='password' placeholder='Re-Enter Password' className='flex gap-3 rounded-md border-[2px] border-black pl-3 h-12 text-[20px] w-96 ' />
                </div>
              </div>

            <Link to='/LoginPage'>
            <button className='btn rounded-md h-16 text-[25px] font-bold  w-96 items-center mt-4 justify-center bg-c3 text-white hover:bg-black hover:text-white'>
              <span>Create Account</span>
            </button>
            </Link>
            



          </form>

        </div>
        <Link to='/'>
        <FaHome className='w-12 h-8 mt-2 mr-2' />
        </Link>

      </div>
     

    </div>


  )
}

export default CreateAccount