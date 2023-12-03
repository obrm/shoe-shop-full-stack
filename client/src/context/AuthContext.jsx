import React, { createContext, useState, useEffect } from 'react';
import { setAuthToken, authAPI } from '../api/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadUser = async () => {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }

        try {
            const res = await authAPI.getCurrentUser();
            setUser(res.data.data);
            setIsAuthenticated(true);
        } catch (err) {
            console.error(err.response.data.error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUser();
    }, []);

    const login = async (email, password) => {
        try {
            const res = await authAPI.login(email, password);
            localStorage.setItem('token', res.data.token);
            setAuthToken(res.data.token);
            setUser(res.data.data);
            setIsAuthenticated(true);
            loadUser();
        } catch (err) {
            setError(err.response.data.error);
        }
    };

    const register = async (formData) => {
        try {
            const res = await authAPI.register(formData);
            localStorage.setItem('token', res.data.token);
            setAuthToken(res.data.token);
            setUser(res.data.data);
            setIsAuthenticated(true);
            loadUser();
        } catch (err) {
            const message = err.response.data.error === 'Duplicate field value entered' ? 'Email already exists' : err.response.data.error;
            setError(message);
        }
    };

    const logout = async () => {
        try {
            await authAPI.logout();
            localStorage.removeItem('token');
            setUser(null);
            setIsAuthenticated(false);
        } catch (err) {
            setError('An unknown error occurred');
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                loading,
                login,
                register,
                logout,
                error
            }}>
            {children}
        </AuthContext.Provider>
    );
};
