import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { useNavigate, useParams } from 'react-router-dom';
import CustomerProfileSideBar from '../components/CustomerProfileSideBar'
import CustomerProfileHeader from '../components/CustomerProfileHeader';
import Navbar from '../components/navBar/Navbar';
import Footer from '../components/footer/Footer';
import { getDecodedToken } from '../services/jwtdecoder';
import {toast} from 'react-toastify';


const ProfilePage = () => {    
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        existingPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });
    const [error, setError] = useState('');
    const decodedToken = getDecodedToken();
    const [userId, setUserId] = useState(decodedToken?.id);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (decodedToken?.id) {
          setUserId(decodedToken.id); // Ensure userId is set only once
        }
      }, [decodedToken?.id]);
      
      useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    console.log(userId);
                    const response = await axiosInstance.get(`/getusers/${userId}`);
                    const user = response.data;
                    setUserData({
                        firstName: user.firstName,
                        lastName: user.lastName,
                        phoneNumber: user.phoneNumber,
                        email: user.email,
                        existingPassword: '',
                        newPassword: '',
                        confirmNewPassword: ''
                    });
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
        };

        if (userId) {
            fetchUserData();
        }
    }, [userId]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear the error state

        // Validate newPassword and confirmNewPassword
        if (userData.newPassword && userData.newPassword !== userData.confirmNewPassword) {
            setError('Passwords do not match');
            return;
        }

        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = getDecodedToken(token);
            if (decodedToken) {
                try {
                    const updateData = {
                        userID: userId,
                        firstName: userData.firstName,
                        lastName: userData.lastName,
                        phoneNumber: userData.phoneNumber,
                        existingPassword: userData.existingPassword,
                        newPassword: userData.newPassword
                    };

                    await axiosInstance.put('/updateuserprofile', updateData);
                    toast.success('Profile updated successfully');
                    navigate('/'); // Redirect to profile page or any other page
                } catch (error) {
                    console.error('Error updating profile:', error);
                    setError('Error updating profile: ' + (error.response ? error.response.data.error : error.message));
                }
            }
        }
    };

    return (
        <div className='dark:bg-gray-900'>
            <Navbar />
            <div className=''>
                <CustomerProfileHeader />
            </div>
            <div className='flex'>
                <div className='basis-[20%] '>
                    <CustomerProfileSideBar />
                </div>
                <div className='basis-[80%] flex-col mt-12 ml-12'>
                    <h2 className='text-[35px] text-c3 '>Profile</h2>
                    <form onSubmit={handleSubmit} className='text-[22px] pt-4'>
                        <div className='flex gap-36'>
                            <div className='flex '>
                                <label htmlFor="firstName">First Name</label>
                                <input className='border-2 ml-16 border-gray-500 w-96 rounded-md'
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={userData.firstName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="lastName">Last Name</label>
                                <input className='border-2 ml-4 border-gray-500 w-96 rounded-md'
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={userData.lastName}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className='pt-12'>
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <input className='border-2 ml-6 border-gray-500 w-96 rounded-md'
                                type="text"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={userData.phoneNumber}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='pt-12'>
                            <label htmlFor="email">Email</label>
                            <input className='border-2 ml-28 border-gray-500 w-96 rounded-md'
                                type="email"
                                id="email"
                                name="email"
                                value={userData.email}
                                readOnly
                            />
                        </div>
                        <h2 className='mt-12 text-c3'>Change your Password</h2>
                        <div className='pt-12'>
                            <label htmlFor="existingPassword">Existing Password</label>
                            <input className='border-2 ml-16 border-gray-500 w-96 rounded-md'
                                type="password"
                                id="existingPassword"
                                name="existingPassword"
                                value={userData.existingPassword}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='pt-12'>
                            <label htmlFor="newPassword">New Password</label>
                            <input className='border-2 ml-36 border-gray-500 w-96 rounded-md'
                                type="password"
                                id="newPassword"
                                name="newPassword"
                                value={userData.newPassword}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='pt-12'>
                            <label htmlFor="confirmNewPassword">Confirm New Password</label>
                            <input className='border-2 ml-16 border-gray-500 w-96 rounded-md'
                                type="password"
                                id="confirmNewPassword"
                                name="confirmNewPassword"
                                value={userData.confirmNewPassword}
                                onChange={handleChange}
                            />
                        </div>
                        {error && <p className="error">{error}</p>}
                        <button type="submit" className='px-8 py-2 bg-c3 rounded-md mt-16 text-white text-[20px]'>Save Changes</button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ProfilePage;
