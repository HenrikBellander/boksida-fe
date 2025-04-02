const BASE_URL = 'http://localhost:5000';
/*import axiosInstance from "./axiosInstance";*/

export const loginUser = async (credentials) => {
    console.log("Sending credentials:", credentials); // Debug log

    const response = await fetch(`${BASE_URL}/login`, {
        /*const response = await axiosInstance.post('/auth/login'), {*/
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
        credentials: 'include'
    });

    const responseData = await response.json(); // Always parse JSON first

    if (!response.ok) {
        console.error("Login failed:", responseData); // Detailed error
        throw new Error(responseData.message || 'Login failed');
        }
    
        return responseData;
    /*if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Login failed');
    }

    return await response.json();*/
};


export const verifyToken = async () => {
    const response = await fetch('http://localhost:5000/verify', {
        method: 'GET',
      credentials: 'include' // Essential for cookies
    });
    if (response.status === 401) { // Explicit check
        throw new Error('Unauthorized');
    }
    if (!response.ok) {
        throw new Error('Session verification failed');
    }
    
    const data = await response.json();
    
    // Match the response structure from Flask
    if (data.status !== 'success') {
        throw new Error(data.message || 'Verification failed');
    }
    
    return data.data.user; // Returns {id, username}
    };
// export const verifyToken = async () => {
//     const response = await fetch(`${BASE_URL}/auth/verify`, {
//         credentials: 'include'  // Important for cookies
//     });

//     if (!response.ok) throw new Error('Session invalid');
//     return await response.json();
// };
/*export const verifyToken = async () => {
    const response = await fetch('/auth/me', {
        credentials: 'include'
    });

    if (!response.ok) {
        throw new Error('Not authenticated');
    }

    return response.json();
};*/


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