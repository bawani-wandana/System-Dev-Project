import React, { useState, useEffect } from 'react'
import loginimage from '../assets/loginimage.png'
import { Link, useNavigate } from 'react-router-dom'
import { FaHome } from "react-icons/fa";
// import validation from '../pages/Validation/LoginValidation';
import axiosInstance from '../utils/axiosInstance';
import { ToastContainer, toast } from "react-toastify";
import Axios from 'axios';
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from 'jwt-decode';


const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      if (!email || !password) {
        toast.error("Please enter both email and password");
        return;
      }

      const response = await Axios.post(
        "http://localhost:8081/routes/login",
        {
          email,
          password,
        },
      );


      if (response.status === 200) {
        const { token } = response.data;
        const { userType } = jwtDecode(token);
        localStorage.setItem("token", token);

        setIsButtonClicked(true);
        toast.success(`${userType}, Login Successful`);

        setTimeout(() => {
          if (userType === "Admin") {
            navigate("/admindashboard");
          } if(userType=== "Staff"){
            navigate("/staffDashboard");
          }else {
            navigate("/");
          };
        }, 3000); // Set a delay of 3 seconds before navigating
      } else {
        toast.error("Invalid Credentials");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during Login");
    }
  };

  useEffect(() => {
    let timer;
    if (isButtonClicked) {
      timer = setTimeout(() => {
        // Redirect to home page after 5 seconds if the button was clicked
        navigate("/"); // Redirect to homepage
      }, 3000);
    }
    // Clear the timer when the component unmounts or when button is clicked again
    return () => clearTimeout(timer);
  }, [isButtonClicked, navigate]); // Include history in dependencies array

  return (
    <div className='flex justify-center items-center dark:bg-gray-900 bg-orange-50 h-screen w-full m-auto border rounded-md
    overflow-hidden shadow-c3 font-[Lato]'>
      <div className='container flex h-3/4 w-3/5 m-auto justify-between
      rounded-[10px] bg-white'>
        <div className='img flex basis-1/2 h-full pl-0
        text-center   flex-col ml-0 rounded-md overflow-hidden relative'>
          <img src={loginimage} alt="" className='absolute h-full w-full object-cover top-0
          bottom-0 right-0 left-0 ' />
          <div className='footer flex absolute bottom-[10px] ml-3 mr-3 h-[60px] 
          left-0 right-0 justify-between rounded-md backdrop-blur-2xl'>
            <span className='text relative ml-20 mt-3 text-white text-[20px] font-medium'>
              Don't have an account?
              <Link to='/CreateAccount'>
                <button className='btn ml-3 bg-c3 text-white text-[20px] pr-3 pl-3 pt-1 pb-1 rounded-md font-medium
                duration-25'>
                  Create Account
                </button>
              </Link>
            </span>

          </div>
        </div>

        <div className='form flex ml-20 m-auto flex-col gap-20'>

          <div className='header text-[35px] text-black font-bold '>
            <h3>Welcome Back!</h3>

          </div>

          <form onSubmit={handleLogin} className='form grid gap-6 '>

            <div className='inputDiv gap-4 bg-none'>
              <label htmlFor="email" className='text-black pb-4  font-medium text-[25px]
              block'>Email</label>
              <div className='input text-[20px] '>
                <input type="email"
                  id='email'
                  placeholder='Enter Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='flex gap-3 rounded-md border-[2px] border-black pl-3 h-16 text-[20px] w-96 ' />
                {/* {errors.email && <span className='text-red-600'> {errors.email}</span>} */}
              </div>
            </div>

            <div className='inputDiv bg-none outline-none border-none
            w-[200px]'>
              <label htmlFor="password" className='text-black pb-4 font-medium text-[25px]
              block'>Password</label>
              <div className='input text-[20px] '>
                <input type="password" id='password'
                value={password}
                  placeholder='Enter Password'
                  onChange={(e) => setPassword(e.target.value)} className='flex gap-3 rounded-md border-[2px] pl-3 border-black h-16 text-[20px] w-96' />
                {/* {errors.password && <span className='text-red-600'> {errors.password}</span>} */}
              </div>
            </div>

            <button type='submit' className='btn rounded-md h-16 text-[25px] font-bold  w-96 items-center m-auto justify-center bg-c3 text-white hover:bg-black hover:text-white'>
              <span>Login</span>
            </button>

            <span className='forgot text-[18px]'>
              Forgot your password? <a href="" className='underline text-blue-700'>Click Here</a>
            </span>



          </form>


        </div>
        <Link to='/'>
          <FaHome className='w-12 h-8 mt-2 mr-2' />
        </Link>



      </div>

      <ToastContainer />
    </div>





  )
}

export default LoginPage;