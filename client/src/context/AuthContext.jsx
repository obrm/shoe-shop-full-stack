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
            try {
                const res = await authAPI.getCurrentUser();
                setUser(res.data.data);
                setIsAuthenticated(true);
            } catch (err) {
                handleError(err);
                setUser(null);
                setIsAuthenticated(false);
                localStorage.removeItem('token');
            } finally {
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleAuthSuccess = (res) => {
        localStorage.setItem('token', res.data.token);
        loadUser();
        setAuthToken(res.data.token);
        setUser(res.data.data);
        setIsAuthenticated(true);
    };

    const handleError = (err) => {
        const message = err.response?.data?.error || 'An unknown error occurred';
        setError(message);
    };

    const login = async (email, password) => {
        try {
            const res = await authAPI.login(email, password);
            handleAuthSuccess(res);
        } catch (err) {
            handleError(err);
        }
    };

    const register = async (formData) => {
        try {
            const res = await authAPI.register(formData);
            handleAuthSuccess(res);
        } catch (err) {
            handleError(err);
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

    const value = {
        user,
        isAuthenticated,
        loading,
        login,
        register,
        logout,
        error
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
