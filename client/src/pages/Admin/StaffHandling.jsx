import React, {useState, useEffect} from 'react'
import SideBar from '../../components/SideBar';
import DashBoardView from '../../components/DashBoardView';
import Navbar from '../../components/navBar/Navbar';
import Footer from '../../components/footer/Footer';
import axiosInstance from '../../utils/axiosInstance';
import { toast } from 'react-toastify';


const DeleteConfirmation = ({ userID, onClose, onDelete }) => {
    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center font-[Lato]'>
            <div className='bg-c4 p-5 rounded-md'>
                <h2 className='text-[22px] font-bold mb-4'>Are you sure you want to delete this staff member?</h2>
                <p className='mb-4 text-[18px]'>User ID: {userID}</p>
                <div className='flex justify-end gap-4'>
                    <button
                        type='button'
                        onClick={onClose}
                        className='px-6 py-2 bg-gray-800 text-white rounded-md'
                    >
                        No
                    </button>
                    <button
                        type='button'
                        onClick={() => onDelete(userID)}
                        className='px-6 py-2 bg-red-700 text-white rounded-md'
                    >
                        Yes
                    </button>
                </div>
            </div>
        </div>
    );
};





const StaffHandling = () => {

    
  const [staffData, setStaffData] = useState([]);
  const [error, setError] = useState(null);
  const [deleteUserID, setDeleteUserID] = useState(null);

  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        const response = await axiosInstance.get('/staffUsers');
        setStaffData(response.data);
      } catch (error) {
        setError(error);
        console.error('Error fetching staff data:', error);
      }
    };

    fetchStaffData();
}, []);

const handleDelete = async (userID) => {
    try {
        await axiosInstance.delete(`/deleteUser/${userID}`);
        setStaffData(staffData.filter(user => user.userID !== userID));
        toast.success('Staff Member deleted successfully');
        setDeleteUserID(null);
    } catch (error) {
        console.error('Error deleting user:', error);
        toast.error('Failed to delete Staff Member');
    }
};

const confirmDelete = (userID) => {
    setDeleteUserID(userID);
};


    return (
        <div className=' font-[Lato]'>
            <div>
                <Navbar/>
            </div>
            <div className='flex'>
            <div className='basis-[15%] h-[100vh]'>
                <SideBar />
            </div>
            <div className='basis-[85%]'>
             <DashBoardView/>
             <h2 className='text-black font-bold ml-5 mt-5 text-[30px] uppercase'>Manage Staff Members</h2>
          <div className='bg-c4  px-4 pt-5 mt-9 ml-5 mr-5 rounded-md border justify-between border-gray-600 flex '>
              <table className='flex-col w-full text-[20px] '>
                <thead className=' bg-c3 text-white text-[20px] '>
                  <tr className=''>
                    <td className='px-4 py-2 text-center'>User ID</td>
                    <td className='px-4 py-2 text-center'>Staff Name</td>
                    <td className='px-4 py-2 text-center'>Username</td>
                    <td className='px-4 py-2 text-center'>Email</td>
                    <td className='px-4 py-2 text-center'>Phone Number</td>
                    <td className='px-4 py-2 text-center'>Actions</td>
                  </tr>
                </thead>
                <tbody >
                  {staffData.map((staff) => (
                    <tr key={staff.userID} className=''>
                      <td className='px-4 py-4 text-center'>{staff.userID}</td>
                      <td className='px-4 py-4 text-center'>{staff.firstName}</td>
                      <td className='px-4 py-4 text-center'>{staff.username}</td>
                      <td className='px-4 py-4 text-center'>{staff.email}</td>
                      <td className='px-4 py-4 text-center'>{staff.phoneNumber}</td>
                      <td className='px-4 py-4 text-center'>
                                            <button
                                                onClick={() => confirmDelete(staff.userID)}
                                                className='text-red-500'
                                            >
                                                Delete
                                            </button>
                                        </td>
                    </tr>
                  ))}
                </tbody>
              </table>
         </div>

               




            </div>
            </div>
            <Footer/>
            {deleteUserID && (
                <DeleteConfirmation
                    userID={deleteUserID}
                    onClose={() => setDeleteUserID(null)}
                    onDelete={handleDelete}
                />
            )}
        </div>
    )
}

export default StaffHandling