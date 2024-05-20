import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import register from '../assets/register.png';
import { FaHome } from "react-icons/fa";
import validation from './CreateAccountValidation';
import axios from 'axios';

const CreateAccount = () => {
  const [values, setValues] = useState({
    firstname: '',
    lastname: '',
    email: '',
    username: '',
    phonenumber: '',
    password: '',
    confirmpassword: '',
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validation(values));
    if (errors.username==="" && errors.email === "" && errors.firstname === "" && errors.lastname === "" 
      && errors.phonenumber === "" && errors.password === "" && errors.confirmpassword === ""
    ){
      axios.post('http://localhost:8081/api/createaccount', values)
      .then (res => {
        navigate('/loginpage')
      })
      .catch (err=> console.log(err));
    }

  };

  return (
    <div className='flex flex-col md:flex-row justify-center items-center w-full min-h-screen bg-orange-50 border rounded-md overflow-hidden shadow-c3 font-[Lato]'>
      <div className='container flex flex-col md:flex-row h-full w-full justify-between bg-white rounded-[10px]'>
        <div className='relative flex flex-col basis-full md:basis-1/2 '>
          <img src={register} alt="Register" className='absolute h-full w-full object-cover' />
          <div className='footer flex absolute pl-10 bottom-2 left-0 right-0 justify-center md:justify-between p-4 backdrop-blur-2xl'>
            <span className='text-white text-[20px] font-medium'>
              Already have an account?
              <Link to='/LoginPage'>
                <button className='ml-3 bg-c3 text-white text-[20px] px-8 py-1 rounded-md font-medium duration-25'>
                  Login
                </button>
              </Link>
            </span>
          </div>
        </div>

        <div className='form flex flex-col mt-4 md:mt-0 ml-4 md:ml-8 mr-4 md:mr-8 gap-4 mb-5 w-full md:w-1/2'>
          <div className='header text-[35px] text-black font-bold'>
            <h3>Let Us Know You!</h3>
          </div>

          <form onSubmit={handleSubmit} className='form grid gap-4'>
            <div className='flex flex-col md:flex-row'>
              <div className='inputDiv w-full md:w-1/2 md:pr-2'>
                <label htmlFor="firstname" className='text-black pb-2 font-medium text-[20px] block'>First Name</label>
                <div className='input text-[20px]'>
                  <input
                    type="text"
                    id='firstname'
                    name='firstname'
                    placeholder='Enter First Name'
                    onChange={handleInput}
                    className='w-full rounded-md border-[2px] border-black pl-3 h-12 text-[20px]'
                  />
                  {errors.firstname && <span className='text-red-600'>{errors.firstname}</span>}
                </div>
              </div>

              <div className='inputDiv w-full md:w-1/2 md:pl-2 mt-4 md:mt-0'>
                <label htmlFor="lastname" className='text-black pb-2 font-medium text-[20px] block'>Last Name</label>
                <div className='input text-[20px]'>
                  <input
                    type="text"
                    id='lastname'
                    name='lastname'
                    placeholder='Enter Last Name'
                    onChange={handleInput}
                    className='w-full rounded-md border-[2px] border-black pl-3 h-12 text-[20px]'
                  />
                  {errors.lastname && <span className='text-red-600'>{errors.lastname}</span>}
                </div>
              </div>
            </div>

            <div className='inputDiv'>
              <label htmlFor="email" className='text-black pb-2 font-medium text-[20px] block'>Email</label>
              <div className='input text-[20px]'>
                <input
                  type="email"
                  id='email'
                  name='email'
                  onChange={handleInput}
                  placeholder='example@gmail.com'
                  className='w-full rounded-md border-[2px] border-black pl-3 h-12 text-[20px]'
                />
                {errors.email && <span className='text-red-600'>{errors.email}</span>}
              </div>
            </div>

            <div className='inputDiv'>
              <label htmlFor="username" className='text-black pb-2 font-medium text-[20px] block'>Username</label>
              <div className='input text-[20px]'>
                <input
                  type="text"
                  id='username'
                  name='username'
                  onChange={handleInput}
                  placeholder='Enter Username'
                  className='w-full rounded-md border-[2px] border-black pl-3 h-12 text-[20px]'
                />
                {errors.username && <span className='text-red-600'>{errors.username}</span>}
              </div>
            </div>

            <div className='inputDiv'>
              <label htmlFor="phonenumber" className='text-black pb-2 font-medium text-[20px] block'>Phone Number</label>
              <div className='input text-[20px]'>
                <input
                  type="tel"
                  id='phonenumber'
                  name='phonenumber'
                  onChange={handleInput}
                  placeholder='Enter Phone Number'
                  className='w-full rounded-md border-[2px] border-black pl-3 h-12 text-[20px]'
                />
                {errors.phonenumber && <span className='text-red-600'>{errors.phonenumber}</span>}
              </div>
            </div>

            <div className='inputDiv'>
              <label htmlFor="password" className='text-black pb-2 font-medium text-[20px] block'>Password</label>
              <div className='input text-[20px]'>
                <input
                  type="password"
                  id='password'
                  name='password'
                  onChange={handleInput}
                  placeholder='******'
                  className='w-full rounded-md border-[2px] border-black pl-3 h-12 text-[20px]'
                />
                {errors.password && <span className='text-red-600'>{errors.password}</span>}
              </div>
            </div>

            <div className='inputDiv'>
              <label htmlFor="confirmpassword" className='text-black pb-2 font-medium text-[20px] block'>Confirm Password</label>
              <div className='input text-[20px]'>
                <input
                  type="password"
                  id='confirmpassword'
                  name='confirmpassword'
                  onChange={handleInput}
                  placeholder='******'
                  className='w-full rounded-md border-[2px] border-black pl-3 h-12 text-[20px]'
                />
                {errors.confirmpassword && <span className='text-red-600'>{errors.confirmpassword}</span>}
              </div>
            </div>

            <button type='submit' className='btn rounded-md h-16 text-[25px] font-bold w-full mt-8 bg-c3 text-white hover:bg-black hover:text-white'>
              <span>Create Account</span>
            </button>
          </form>
        </div>
        <Link to='/'>
          <FaHome className='w-12 h-8 mt-2 mr-2' />
        </Link>
      </div>
    </div>
  );
}

export default CreateAccount;
