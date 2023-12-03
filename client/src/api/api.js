import axios from 'axios';

const API = axios.create({ baseURL: '/api/v1' });

// Set token for all requests
export const setAuthToken = (token) => {
    if (token) {
        API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete API.defaults.headers.common['Authorization'];
    }
};

// Auth API endpoints
export const authAPI = {
    register: (userData) => API.post('/auth/register', userData),
    login: (email, password) => API.post('/auth/login', { email, password }),
    logout: () => API.get('/auth/logout'),
    getCurrentUser: () => API.get('/auth/current-user'),
};

// Shoe API endpoints
export const shoeAPI = {
    getAllShoes: () => API.get('/shoes'),
    getShoe: (shoeId) => API.get(`/shoes/${shoeId}`),
    updateShoe: (shoeId, shoe) => API.put(`/shoes/${shoeId}`, shoe),
    addShoe: (shoe) => API.post('/shoes', shoe),
    deleteShoe: (shoeId) => API.delete(`/shoes/${shoeId}`),
};