import {jwtDecode} from 'jwt-decode';

export function getDecodedToken() {
    const token = localStorage.getItem('token');
    if (!token) {
        return null;
    }
    try {
        return jwtDecode(token);
    } catch (error) {
        console.error('Invalid token:', error);
        return null;
    }
};
