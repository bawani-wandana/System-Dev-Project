import React, { useState, useEffect } from 'react';
import { TextField, MenuItem, Select, InputLabel, FormControl, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Add useNavigate
import { getDecodedToken } from '../../services/jwtdecoder';
import axiosInstance from '../../utils/axiosInstance';

const CheckOut = ({ totalWithoutShipping }) => {
  const navigate = useNavigate(); // Initialize useNavigate
  const decodedToken = getDecodedToken();
  const [selectedOption, setSelectedOption] = useState('Delivery');

  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    phone: '',
    district: '',
    city: '',
    address: '',
    zipcode: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [shipping, setShipping] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [cartTotal, setCartTotal] = useState(0);
  const [cartID, setCartID] = useState(null); // State to hold cartID

  const userId = decodedToken?.id;

  useEffect(() => {
    // Fetch address and cart total from backend
    fetchAddressAndCartTotal();
  }, []);

  const fetchAddressAndCartTotal = async () => {
    try {
      const addressResponse = await axiosInstance.get(`/getAddress/${userId}`);
      console.log('Address response:', addressResponse.data); // Log the address response
      if (addressResponse.data.length > 0) {
        const addressData = addressResponse.data[0];
        setFormValues({
          name: addressData.firstName,
          email: addressData.email,
          phone: addressData.phoneNumber,
          district: addressData.district,
          city: addressData.city,
          address: addressData.street,
          zipcode: addressData.postalCode,
          addressID: addressData.addressID
        });
      }

      
      const cartResponse = await axiosInstance.get(`/cartCheckout/${userId}`);
      const total = cartResponse.data[0].cartTotal
      setCartTotal(total);
      setCartID(cartResponse.data[0].cartID); // Set the cartID state
    } catch (error) {
      console.error('Error fetching address and cart total:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  useEffect(() => {
    if (selectedOption === 'Delivery') {
      setShipping(250); // Set the shipping cost if delivery is selected
    } else {
      setShipping(0); // No shipping cost for pickup
    }
  }, [selectedOption]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleDistrictChange = (event) => {
    setFormValues({ ...formValues, district: event.target.value });
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const validateForm = () => {
    let errors = {};

    // if (!formValues.name) errors.name = 'Name is required';
    // if (!formValues.email) errors.email = 'Email is required';
    // if (!formValues.phone) errors.phone = 'Telephone Number is required';

    if (selectedOption === 'Delivery') {
      if (!formValues.district) errors.district = 'District is required';
      if (!formValues.city) errors.city = 'City is required';
      if (!formValues.address) errors.address = 'Address is required';
      if (!formValues.zipcode) errors.zipcode = 'Zipcode is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const totalAmount = cartTotal + shipping;
      const orderData = {
        orderDate: new Date().toISOString(),
        orderType: selectedOption,
        totalAmount,
        orderStatus: 'Pending',
        userID: userId,
        addressID: formValues.addressData.addressID,
        paymentID: null
      };

      try {
        const paymentResponse = await axiosInstance.post('/createPayment', {
          cartID, // Assuming the cartID is being handled elsewhere
          paymentAmount: totalAmount,
          paymentType: paymentMethod,
          paymentDate: new Date().toISOString(),
          paymentStatus: 'Pending'
        });

        orderData.paymentID = paymentResponse.data.paymentID;

        const orderResponse = await axiosInstance.post('/createOrder', orderData);
        
        // Handle order details and clearing the cart after successful order creation
        navigate('/confirmation', { state: { orderID: orderResponse.data.orderID } });
      } catch (error) {
        console.error('Error placing order:', error);
      }
    }
  };

  const districts = [
    'Ampara', 'Anuradhapura', 'Badulla', 'Batticaloa', 'Colombo', 'Galle', 'Gampaha',
    'Hambantota', 'Jaffna', 'Kalutara', 'Kandy', 'Kegalle', 'Kilinochchi', 'Kurunegala',
    'Mannar', 'Matale', 'Matara', 'Moneragala', 'Mullaitivu', 'Nuwara Eliya', 'Polonnaruwa',
    'Puttalam', 'Ratnapura', 'Trincomalee', 'Vavuniya'
  ];

  return (
    <div className='container text-[20px] pl-24 pt-12 dark:bg-gray-900 flex bg-white font-[Lato] font-semibold'>
      <div className='w-[1500px] rounded-md  bg-c4'>
        <div className='pt-4'>
          <h2 className='text-c3 pl-10 text-[24px]'>Billing Details</h2>
        </div>
        <form onSubmit={handleSubmit} className='pt-4 pr-20 pl-10'>
          <div className='mb-5'>
            <Typography variant="h6">Name</Typography>
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              name="name"
              value={formValues.firstName}
              onChange={handleInputChange}
              error={!!formErrors.firstName}
              helperText={formErrors.firstName}
            />
          </div>
          <div className='mb-4'>
            <Typography variant="h6">Email</Typography>
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              name="email"
              value={formValues.email}
              onChange={handleInputChange}
              error={!!formErrors.email}
              helperText={formErrors.email}
            />
          </div>
          <div className='mb-4'>
            <Typography variant="h6">Telephone Number</Typography>
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              name="phone"
              value={formValues.phoneNumber}
              onChange={handleInputChange}
              error={!!formErrors.phoneNumber}
              helperText={formErrors.phoneNumber}
            />
          </div>
          <div className='mb-4'>
            <Typography variant="h6">District</Typography>
            <FormControl
              fullWidth
              variant="outlined"
              margin="normal"
              error={!!formErrors.district}
            >
              <InputLabel>District</InputLabel>
              <Select
                value={formValues.district}
                onChange={handleDistrictChange}
                label="District"
                name="district"
              >
                {districts.map((district) => (
                  <MenuItem key={district} value={district}>
                    {district}
                  </MenuItem>
                ))}
              </Select>
              {formErrors.district && (
                <Typography color="error">{formErrors.district}</Typography>
              )}
            </FormControl>
          </div>
          <div className='mb-4'>
            <Typography variant="h6">City</Typography>
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              name="city"
              value={formValues.city}
              onChange={handleInputChange}
              error={!!formErrors.city}
              helperText={formErrors.city}
            />
          </div>
          <div className='mb-4'>
            <Typography variant="h6">Address</Typography>
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              name="address"
              value={formValues.address}
              onChange={handleInputChange}
              error={!!formErrors.address}
              helperText={formErrors.address}
            />
          </div>
          <div className='mb-4'>
            <Typography variant="h6">Zipcode</Typography>
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              name="zipcode"
              value={formValues.zipcode}
              onChange={handleInputChange}
              error={!!formErrors.zipcode}
              helperText={formErrors.zipcode}
            />
          </div>
        </form>
      </div>
      <div className='w-[800px] pl-10'>
        <div className='mt-8'>
          <Typography variant="h6" className='text-c3 text-[24px]'>Order Summary</Typography>
        </div>
        <div className='pt-4'>
          <Typography>Subtotal: Rs {cartTotal}</Typography>
        </div>
        <div className='pt-4'>
          <FormControl>
            <Typography>Delivery Method</Typography>
            <Select value={selectedOption} onChange={handleOptionChange}>
              <MenuItem value="Delivery">Delivery</MenuItem>
              <MenuItem value="Pick Up">Pick Up</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className='pt-4'>
          <Typography>Shipping: Rs {shipping}</Typography>
        </div>
        <div className='pt-4'>
          <Typography>Total: Rs {cartTotal + shipping}</Typography>
        </div>
        <div className='pt-4'>
          <FormControl>
            <Typography>Payment Method</Typography>
            <Select value={paymentMethod} onChange={handlePaymentMethodChange}>
              <MenuItem value="Cash">Cash</MenuItem>
              <MenuItem value="Card">Card</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className='pt-8'>
          <Button variant="contained" color="primary" onClick={handleSubmit}>Place Order</Button>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
