import axios from 'axios';

const API = axios.create({ baseURL: '/api/v1' });

API.interceptors.response.use(
    response => response,
    error => {
        // Handle common HTTP errors here
        if (error.response.status === 500) {
            console.error('Server error');
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
