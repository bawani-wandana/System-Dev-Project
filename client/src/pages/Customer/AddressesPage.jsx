import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navBar/Navbar';
import CustomerProfileSideBar from '../../components/CustomerProfileSideBar';
import AddressForm from '../../components/AddressForm'; // Import the form component
import axiosInstance from '../../utils/axiosInstance';
import { getDecodedToken } from '../../services/jwtdecoder';

const AddressesPage = () => {
    const decodedToken = getDecodedToken();
    const [addresses, setAddresses] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editAddress, setEditAddress] = useState(null); // State to hold the address being edited


    const userId = decodedToken?.id;

    useEffect(() => {
        if (userId) {
            fetchAddresses();
        }
    }, [userId]);

    const fetchAddresses = async () => {
        try {
            const response = await axiosInstance.get(`/getaddress/${userId}`);
            setAddresses(response.data);
        } catch (error) {
            console.error('Error fetching addresses:', error);
        }
    };

    const handleEdit = (address) => {
        setEditAddress(address); // Set the address to edit
        setShowForm(true); // Show the form for editing
    };

    const handleAdd = () => {
        setEditAddress(null); // Clear editAddress state to indicate adding new address
        setShowForm(true); // Show the form for adding new address
    };

    return (
        <div>
            <Navbar />
            <div className='flex'>
                <CustomerProfileSideBar />
                <div className='ml-12 mt-12'>
                    <h1 className='text-3xl'>Shipping Addresses</h1>
                    <button
                        className='bg-b1 text-white px-5 py-4 mt-4 rounded-md'
                        onClick={handleAdd}
                    >
                        Add
                    </button>
                    <ul className='mt-4'>
                        {addresses.map((address, index) => (
                            <li key={index} className='text-lg mt-4'>
                                {address.street}, <br /> {address.district}, <br /> {address.city}, <br /> {address.postalCode}
                                <br />
                                <button
                                    className='bg-green-500 text-white px-4 py-2 mt-2 rounded-md'
                                    onClick={() => handleEdit(address)}
                                >
                                    Edit
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {showForm && (
                <AddressForm
                    setShowForm={setShowForm}
                    fetchAddresses={fetchAddresses}
                    editAddress={editAddress} // Pass the address to edit to AddressForm
                />
            )}
        </div>
    );
};

export default AddressesPage;
