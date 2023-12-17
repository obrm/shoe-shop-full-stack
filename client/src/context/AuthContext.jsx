import React, { createContext, useState, useEffect } from 'react';
import { authAPI } from '../api';
import { showToast } from '../utils';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const loadUser = async () => {
            try {
                const res = await authAPI.getCurrentUser();
                setUser(res.data);
            } catch (err) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        loadUser();            
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
            const res = await authAPI.login(email, password);
            setUser(res.data);
        } catch (err) {
            handleError(err);
        }
    };

    const register = async (formData) => {
        try {
            const res = await authAPI.register(formData);
            setUser(res.data);
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
