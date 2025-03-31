export const loginUser = async (credentials) => {
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
        credentials: 'include'
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Login failed');
    }

    return response.json();
};

export const verifyToken = async () => {
    const response = await fetch('/api/auth/me', {
        credentials: 'include'
    });

    if (!response.ok) {
        throw new Error('Not authenticated');
    }

    return response.json();
};





/* Från Markus Lektion-8 fe
import axiosInstance from "./axiosInstance";

export const login = async (userData) => {
    try {
        const response = await axiosInstance.post('/auth/login', userData, {
            withCredentials: true,
        })
        return response.data
    } catch (error) {
        console.error('Log in failed:', error)
        throw error
    }
}

export const logout = async () => {
    try {
        const response = await axiosInstance.post('/auth/logout')
        console.log('Log out successful', response);
    } catch (error) {
        console.error('Log out failed:', error)
    }
}*/