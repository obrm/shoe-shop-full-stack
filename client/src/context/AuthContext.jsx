import React, { createContext, useState, useEffect } from 'react';
import { authAPI } from '../api';
import { showToast } from '../utils';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);

    const loadUser = async () => {
        try {
            const res = await authAPI.getCurrentUser();
            setUser(res.data);
        } catch (err) {
            handleError(err);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUser();
        // eslint-disable-next-line
    }, []);

    const handleError = (err) => {
        let errorMessage = err.response?.data?.error || 'An unknown error occurred';
        if (errorMessage.includes('Duplicate')) {
            errorMessage = 'This email is already in use';
        }
        showToast(errorMessage, 'error');
    };

    const login = async (email, password) => {
        try {
            await authAPI.login(email, password);
            loadUser();
        } catch (err) {
            handleError(err);
        }
    };

    const register = async (formData) => {
        try {
            await authAPI.register(formData);
            loadUser();
        } catch (err) {
            handleError(err);
        }
    };

    const logout = async () => {
        try {
            await authAPI.logout();
            setUser(null);
        } catch (err) {
            handleError(err);
        }
    };

    const value = { user, loading, login, register, logout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
