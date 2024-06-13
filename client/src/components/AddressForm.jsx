import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { getDecodedToken } from '../services/jwtdecoder';


const AddressForm = ({ setShowForm, fetchAddresses, editAddress }) => {
    const decodedToken = getDecodedToken();
  const [formData, setFormData] = useState({
    street: '',
    district: '',
    city: '',
    postalCode: ''
  });

  const userId = decodedToken?.id;

  useEffect(() => {
    if (editAddress) {
      // Populate form data if editing existing address
      setFormData({
        street: editAddress.street,
        district: editAddress.district,
        city: editAddress.city,
        postalCode: editAddress.postalCode
      });
    }
  }, [editAddress]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

     const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = { ...formData, userID: userId };
            if (editAddress) {
                // If editAddress exists, update the existing address
                await axiosInstance.put(`/updateaddress/${userId}`, payload);
            } else {
                // Otherwise, add a new address
                await axiosInstance.post('/addaddress', payload);
            }
            fetchAddresses(); // Refresh the addresses list
            setShowForm(false); // Close the form
        } catch (error) {
            console.error('Error saving address:', error);
        }
    };
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white p-8 rounded'>
        <h2 className='text-3xl mb-4'>{editAddress ? 'Edit Address' : 'Add New Address'}</h2>
        <form onSubmit={handleSubmit} className='flex-col flex gap-5'>
          <label className='text-[25px] pr-2 '>
            Street:
            <input
              type='text'
              name='street'
              className='w-96 h-12 rounded-md pl-2 text-[20px] border-2 border-b1 ml-2'
              value={formData.street}
              onChange={handleChange}
            />
          </label>
          <label className='text-[25px] pr-2 '>
            District:
            <input
              type='text'
              name='district'
              className='w-96 h-12 rounded-md pl-2 text-[20px] border-2 border-b1 ml-2'
              value={formData.district}
              onChange={handleChange}
            />
          </label>
          <label className='text-[25px] pr-2 '>
            City:
            <input
              type='text'
              name='city'
              className='w-96 h-12 rounded-md pl-2 text-[20px] border-2 border-b1 ml-2'
              value={formData.city}
              onChange={handleChange}
            />
          </label>
          <label className='text-[25px] pr-2 '>
            Postal Code:
            <input
              type='text'
              name='postalCode'
              className='w-96 h-12 rounded-md pl-2 text-[20px] border-2 border-b1 ml-2'
              value={formData.postalCode}
              onChange={handleChange}
            />
          </label>
          <div className='flex justify-between mt-4'>
            <button type='submit' className='bg-b1 text-white px-4 py-2'>
              {editAddress ? 'Save Changes' : 'Save'}
            </button>
            <button
              type='button'
              className='bg-gray-500 text-white px-4 py-2'
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressForm;
