import axios from 'axios';

const API = axios.create({ baseURL: '/api/v1' });

API.interceptors.response.use(
    response => response,
    error => {
        if (!error.response) {
            // Network error or request was not completed
            console.error('Network error: Please check your internet connection.');
        } else {
            switch (error.response.status) {
                case 400:
                    console.error('Bad Request: The request was unacceptable.');
                    break;
                case 401:
                    console.error('Unauthorized: Access is denied due to invalid credentials.');
                    break;
                case 403:
                    console.error('Forbidden: You do not have the necessary permissions.');
                    break;
                case 404:
                    console.error('Not Found: The requested resource does not exist.');
                    break;
                case 500:
                    console.error('Internal Server Error: Something went wrong on the server.');
                    break;
                default:
                    console.error(`An error occurred: ${error.response.status} - ${error.response.statusText}`);
            }
        }
        return Promise.reject(error);
    }
);

export const setAuthToken = (token) => {
    if (token) {
        API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete API.defaults.headers.common['Authorization'];
    }
};

export const authAPI = {
    register: (userData) => API.post('/auth/register', userData),
    login: (email, password) => API.post('/auth/login', { email, password }),
    logout: () => API.get('/auth/logout'),
    getCurrentUser: () => API.get('/auth/current-user'),
};

export const shoeAPI = {
    getAllShoes: () => API.get('/shoes'),
    getShoe: (shoeId) => API.get(`/shoes/${shoeId}`),
    updateShoe: (shoeId, shoe) => API.put(`/shoes/${shoeId}`, shoe),
    addShoe: (shoe) => API.post('/shoes', shoe),
    deleteShoe: (shoeId) => API.delete(`/shoes/${shoeId}`),
};
