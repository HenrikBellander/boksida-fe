const BASE_URL = 'http://localhost:5000';

export const loginUser = async (credentials) => {
    console.log("Sending credentials:", credentials);

    const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
        credentials: 'include'
    });

    const responseData = await response.json();

    if (!response.ok) {
        console.error("Login failed:", responseData);
        throw new Error(responseData.message || 'Login failed');
        }
    
        return responseData;
};


export const verifyToken = async () => {
    const response = await fetch('http://localhost:5000/verify', {
        method: 'GET',
      credentials: 'include'
    });
    if (response.status === 401) {
        throw new Error('Unauthorized');
    }
    if (!response.ok) {
        throw new Error('Session verification failed');
    }
    
    const data = await response.json();
    
    if (data.status !== 'success') {
        throw new Error(data.message || 'Verification failed');
    }
    
    return data.data.user;
    };