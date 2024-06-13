import React, { useState, useEffect } from 'react';
import { Radio, RadioGroup, FormControlLabel, TextField, MenuItem, Select, InputLabel, FormControl, Typography, Button } from '@mui/material';
import OrderSummary from '../../components/OrderSummary'; // Import the OrderSummary component
import { Link } from 'react-router-dom';


const CheckOut = ({ totalWithoutShipping }) => {
  const [selectedOption, setSelectedOption] = useState('pickup');

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

  useEffect(() => {
    if (selectedOption === 'Delivery') {
      setShipping(10); // Set the shipping cost to 10 if delivery is selected
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

    if (!formValues.name) errors.name = 'Name is required';
    if (!formValues.email) errors.email = 'Email is required';
    if (!formValues.phone) errors.phone = 'Telephone Number is required';

    if (selectedOption === 'Delivery') {
      if (!formValues.district) errors.district = 'District is required';
      if (!formValues.city) errors.city = 'City is required';
      if (!formValues.address) errors.address = 'Address is required';
      if (!formValues.zipcode) errors.zipcode = 'Zipcode is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      // Form is valid, proceed with submission
      console.log('Form submitted successfully:', formValues);
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
        <div className='flex items-center pt-3 pl-10'>
          <FormControl component="fieldset">
            <RadioGroup
              row
              aria-label="deliveryOptions"
              name="deliveryOptions"
              value={selectedOption}
              onChange={handleOptionChange}
            >
              <FormControlLabel value="Pickup" control={<Radio />} label="Pickup" />
              <FormControlLabel value="Delivery" control={<Radio />} label="Delivery" />
            </RadioGroup>
          </FormControl>
        </div>
        <form onSubmit={handleSubmit} className='pt-4 pr-20 pl-10'>
          <div className='mb-5'>
            <Typography variant="h6">Name</Typography>
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              name="name"
              value={formValues.name}
              onChange={handleInputChange}
              error={!!formErrors.name}
              helperText={formErrors.name}
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
              value={formValues.phone}
              onChange={handleInputChange}
              error={!!formErrors.phone}
              helperText={formErrors.phone}
            />
          </div>
          {selectedOption === 'Delivery' && (
            <>
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
            </>
          )}

        </form>
      </div>
      <div className='  w-[800px] pl-10 '>
        <OrderSummary subtotal={totalWithoutShipping} includeShipping={selectedOption === 'Delivery'} />
        <div className='mt-8'>
          <FormControl  fullWidth variant="outlined" margin="normal">
            <InputLabel className='text-[20px]' sx={{ fontSize: '1.5rem' }}>Payment Method</InputLabel>
            <Select
              value={paymentMethod}
              onChange={handlePaymentMethodChange}
              label="Payment Method"
              name="paymentMethod"
              sx={{ fontSize: '1.25rem' }}
            >
              <MenuItem class='text-[20px] pb-4' value="Cash">Cash</MenuItem>
              <MenuItem class='text-[20px]' value="Card">Credit/ Debit Card</MenuItem>
            </Select>
          </FormControl>
          <Link to='/paymentpage'>
          <Button
            type="submit"
            variant="contained"
            class="bg-c3 text-white py-2 px-4 rounded-lg mt-4 w-full"
            sx={{ fontSize: '1.25rem', backgroundColor: 'burnt orange', '&:hover': { backgroundColor: 'darkorange' } }}
            onClick={handleSubmit}
          >
            {paymentMethod === 'Cash' ? 'Confirm' : 'Proceed to Payment'}
          </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
