import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProtectedData = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get the token from localStorage
    const token = localStorage.getItem('token');

    if (token) {
      axios.get('http://localhost:8081/api/protected', {
        headers: {
          'Authorization': `Bearer ${token}`  // Ensure the token is prefixed with 'Bearer '
        }
      })
      .then(res => {
        setData(res.data);
      })
      .catch(err => {
        console.error('Error fetching protected data:', err);
        setError('Error fetching protected data');
      });
    } else {
      setError('No token found, please login first');
    }
  }, []);  // Empty dependency array means this effect runs once after initial render

  if (error) {
    return <div>{error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Protected Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default ProtectedData;
