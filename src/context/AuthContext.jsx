import React, { createContext, useState, useEffect, useContext } from 'react';
import { verifyToken } from '../services/authApi';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const verifySession = async () => {
            try {
                const userData = await verifyToken();
                setUser(userData);
            } catch (error) {
                setUser(null);
                console.log(error)
            } finally {
                setIsLoading(false);
            }
        };

        verifySession();
    }, []);

    const login = async (userData) => {
        setUser(userData);
        return await verifyToken();
    };

    const logout = async () => {
        try {
            await fetch('http://localhost:5000/logout', {
            method: 'POST',
            credentials: 'include'
            });
          setUser(null);
        } catch (error) {
            console.error('Logout error:', error);
        }
        };

    const value = {
        user,
        isLoading,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!isLoading && children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}