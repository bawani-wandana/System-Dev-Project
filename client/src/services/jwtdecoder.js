import {jwtDecode} from 'jwt-decode';

export function getDecodedToken() {
    const token = localStorage.getItem('token');
    return jwtDecode(token);
}

