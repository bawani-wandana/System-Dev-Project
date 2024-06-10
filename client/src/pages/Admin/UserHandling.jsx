import React, { useState, useEffect } from 'react'
import SideBar from '../../components/SideBar'
import DashBoardView from '../../components/DashBoardView'
import Navbar from '../../components/navBar/Navbar'
import axiosInstance from '../../utils/axiosInstance'
import Footer from '../../components/footer/Footer'
import UserTypeDialog from '../../components/UserTypeDialog'
import { toast } from 'react-toastify';

const UserHandling = () => {

  const [usersData, setUsersData] = useState([]);
  const [error, setError] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUserType, setNewUserType] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/getusersadmin');
        console.log('Fetched users data:', response.data); // Debugging statement
        if (Array.isArray(response.data)) {
          setUsersData(response.data);
        } else {
          setError(new Error('Data format is incorrect, expected an array.'));
        }
      } catch (error) {
        setError(error);
        console.error('Error fetching user data', error);
      }
    };

    fetchData();
  }, []);


  const handleUserTypeClick = (user) => {
    setSelectedUser(user);
    setNewUserType(user.userType);
    setDialogOpen(true);
  };

  const handleUserTypeChange = async () => {
    console.log('Updating user type:', selectedUser.userID, newUserType); 
    try {
      const response = await axiosInstance.put('/updateUserType', {
        userId: selectedUser.userID,
        userType: newUserType
      });
      console.log('Response from server:', response.data); 
      setUsersData(usersData.map(user => (
        user.userID === selectedUser.userID ? { ...user, userType: newUserType } : user
      )));
      setDialogOpen(false);
      toast.success('User type updated successfully');
    } catch (error) {
      console.error('Error updating user type', error);
      toast.error('Failed to update user type');
    }
  };

  return (
    <div className='font-[Lato]'>
      <div>
        <Navbar />
      </div>
      <div className='flex'>
        <div className='basis-[15%] h-[100vh]'>
          <SideBar />
        </div>
        <div className='basis-[85%]'>
          <DashBoardView />
          <h2 className='text-black font-bold ml-5 mt-5 text-[30px] uppercase'>Users</h2>
          <div className='bg-c4  px-4 pt-5 mt-9 ml-5 mr-5 rounded-md border justify-between border-gray-600 flex '>
            {error ? (
              <div>Error fetching user data: {error.message}</div>
            ) : (
              <table className='flex-col w-full text-[20px] '>
                <thead className=' bg-c3 text-white text-[20px] '>
                  <tr className=''>
                    <td className='px-4 py-2 text-center'>User ID</td>
                    <td className='px-4 py-2 text-center'>First Name</td>
                    <td className='px-4 py-2 text-center'>Username</td>
                    <td className='px-4 py-2 text-center'>User Type</td>
                    <td className='px-4 py-2 text-center'>Email</td>
                    <td className='px-4 py-2 text-center'>Phone Number</td>
                  </tr>
                </thead>
                <tbody >
                  {usersData.map((user) => (
                    <tr key={user.userID} className=''>
                      <td className='px-4 py-4 text-center'>{user.userID}</td>
                      <td className='px-4 py-4 text-center'>{user.firstName}</td>
                      <td className='px-4 py-4 text-center'>{user.username}</td>
                      <td className='px-4 py-4 text-center'>
                        <a
                          className='cursor-pointer text-blue-700 underline'
                          onClick={() => handleUserTypeClick(user)}
                        >
                          {user.userType}
                        </a>
                      </td>
                      <td className='px-4 py-4 text-center'>{user.email}</td>
                      <td className='px-4 py-4 text-center'>{user.phoneNumber}</td>

                    </tr>
                  ))}
                </tbody>
              </table>
            )} </div>


        </div>
      </div>

<Footer/>
{selectedUser && (
        <UserTypeDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          userType={newUserType}
          onChangeUserType={(value) => setNewUserType(value)}
          onSave={handleUserTypeChange}
        />
      )}
    </div>

  )
}

export default UserHandling