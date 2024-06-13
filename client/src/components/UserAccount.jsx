import React, { useEffect, useState } from 'react'
import { MdAccountCircle } from "react-icons/md";
import { Link } from 'react-router-dom';
import { getDecodedToken } from '../services/jwtdecoder';



const UserAccount = () => { 
  const [open, setOpen] = useState(false)
  const decodedToken = getDecodedToken();
  const [userId, setUserId] = useState(decodedToken?.id);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (decodedToken?.id) {
      setUserId(decodedToken.id); // Ensure userId is set only once
    }
  }, [decodedToken?.id]);
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
}, []);

  const showDropDown = () => {
    setOpen(!open)
  }

  // console.log(userId);

  return (
    <div>
      <div onClick={showDropDown} className='flex items-center gap-[15px] relative'>
        <div className='h-[55px] w-[55px] rounded-full bg-c3
                cursor-pointer flex items-center justify-center relative '>
          <MdAccountCircle color='white' className='w-[40px] h-[40px]' />
        </div>

        {
          open &&
          <div className='bg-c4 border-4 border-c3 h-[120px] w-[160px] absolute  bottom-[100px]
                    z-20 right-0 pt-4  top-[62px] text-[20px] rounded-md  text-c3 pl-[15px] space-y-[10px]'>
            <Link to={`/profilepage/${userId}`}>      
            <p className='cursor-pointer hover:text-orange-600 font-medium'>Profile</p>
            </Link >
            <Link to='/customerorders'>       
            <p className='cursor-pointer pt-4 hover:text-orange-600 font-medium'>Orders</p>
            </Link>

          </div>
        }
      </div>
    </div>
  )
}

export default UserAccount