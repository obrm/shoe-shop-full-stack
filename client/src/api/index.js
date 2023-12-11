import axios from 'axios';

import { showToast } from '../utils';

const baseURL = import.meta.env.VITE_BASE_URL;

// Create a new instance of the axios library with a base URL of '/api/v1'
const API = axios.create({ baseURL });

// Add a response interceptor that handles errors
API.interceptors.response.use(
    // Return the response data
    (response) => response,
    // Handle errors
    (error) => {
        // Check if there is a response
        if (!error.response) {
            // There was a network error
            showToast('Network error: Please check your internet connection.', 'error');
            console.error('Network error: Please check your internet connection.');
            // Return the error
            return Promise.reject(error);
        }

        // Get the status code from the response
        const statusCode = error.response.status;

        // Based on the status code, handle the error
        switch (statusCode) {
            case 400:
                showToast('Bad Request: The request was unacceptable.', 'error');
                console.error('Bad Request: The request was unacceptable.');
                break;
            case 401:
                showToast('Unauthorized: Access is denied due to invalid credentials.', 'error');
                console.error('Unauthorized: Access is denied due to invalid credentials.');
                break;
            case 403:
                showToast('Forbidden: You do not have the necessary permissions.', 'error');
                console.error('Forbidden: You do not have the necessary permissions.');
                break;
            case 404:
                showToast('Not Found: The requested resource does not exist.', 'error');
                console.error('Not Found: The requested resource does not exist.');
                break;
            case 500:
                showToast('Internal Server Error: Something went wrong on the server.', 'error');
                console.error('Internal Server Error: Something went wrong on the server.');
                break;
            default:
                showToast(`An error occurred: ${statusCode} - ${error.response.statusText}`, 'error');
                console.error(`An error occurred: ${statusCode} - ${error.response.statusText}`);
        }

        // Return the error
        return Promise.reject(error);
    }
);

// Set the authorization token in the headers
export const setAuthToken = (token) => {
    if (token) {
        API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete API.defaults.headers.common['Authorization'];
    }
};

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