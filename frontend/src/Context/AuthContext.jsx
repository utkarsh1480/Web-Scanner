import React, { createContext, useState, useEffect, useContext } from 'react';
import { getCurrentUser, loginUser, registerUser, logoutUser } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Verify authentication status on mount
    useEffect(() => {
        const verifyUser = async () => {
            try {
                const currentUser = await getCurrentUser();
                setUser(currentUser);
            } catch (err) {
                // If it fails (e.g. 401), user is not logged in. Keep state as null.
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        verifyUser();
    }, []);

    const login = async (email, password) => {
        setError(null);
        try {
            const data = await loginUser(email, password);
            setUser(data.user);
            return data.user;
        } catch (err) {
            const msg = err.response?.data?.message || 'Login failed. Please try again.';
            setError(msg);
            throw new Error(msg);
        }
    };

    const register = async (username, email, password) => {
        setError(null);
        try {
            const data = await registerUser(username, email, password);
            setUser(data.user);
            return data.user;
        } catch (err) {
            const msg = err.response?.data?.message || 'Registration failed. Please try again.';
            setError(msg);
            throw new Error(msg);
        }
    };

    const logout = async () => {
        setError(null);
        try {
            await logoutUser();
            setUser(null);
        } catch (err) {
            const msg = err.response?.data?.message || 'Logout failed.';
            setError(msg);
            throw new Error(msg);
        }
    };

    const updateUser = (userData) => {
        setUser(userData);
    };

    return (
        <AuthContext.Provider value={{ user, loading, error, setError, login, register, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext;
