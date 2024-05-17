import axios from 'axios';

const axiosInstance = axios.create({
  backend : 'http://localhost:3000/api', 
});

export default axiosInstance;
