import axios from 'axios';

import { showToast } from '../utils';

const baseURL = import.meta.env.VITE_BASE_URL;

// Create a new instance of the axios library with a base URL of '/api/v1'
const API = axios.create({ baseURL });

// Add a response interceptor that handles errors
API.interceptors.response.use(
    response => response,
    error => {
        if (!error.response) {
            showToast('Network error: Please check your internet connection.', 'error');
            console.error('Network error: Please check your internet connection.');
            return Promise.reject(new Error('Network error: Please check your internet connection.'));
        }

        const { status, data, statusText } = error.response;

        let message = data?.error || statusText || 'An error occurred';

        console.error(`${status} - ${message}`);

        return Promise.reject(error);
    }
);

// Auth API endpoints
export const authAPI = {
    // Register a new user
    register: (userData) => API.post('/auth/register', userData),
    // Login a user
    login: (email, password) => API.post('/auth/login', { email, password }),
    // Logout a user
    logout: () => API.get('/auth/logout'),
    // Get the current user
    getCurrentUser: () => API.get('/auth/current-user'),
};

// Shoe API endpoints
export const shoeAPI = {
    // Get all shoes
    getAllShoes: () => API.get('/shoes'),
    // Get a specific shoe
    getShoe: (shoeId) => API.get(`/shoes/${shoeId}`),
    // Update a shoe
    updateShoe: (shoe, shoeId) => API.put(`/shoes/${shoeId}`, shoe),
    // Add a shoe
    addShoe: (shoe) => API.post('/shoes', shoe),
    // Delete a shoe
    deleteShoe: (shoeId) => API.delete(`/shoes/${shoeId}`),
};