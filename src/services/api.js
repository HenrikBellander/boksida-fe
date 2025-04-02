import axios from "axios";

// Axios instance with base configuration
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 10000,
  withCredentials: true
});

// Cookie helpers
function getCookie(name) {
  return document.cookie.match(`(^|;)\\s*${name}\\s*=\\s*([^;]+)`)?.pop() || '';
}

function deleteCookie(name) {
  document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}

// Auth functions
export const loginUser = async (credentials) => {
  try {
    const response = await axiosInstance.post('/auth/login', credentials);
    console.log("Full backend response:", response); // Lägg till denna rad
    
    const token = response.data.data?.token;
    if (!token) {
      throw new Error("Token not found in response");
    }

    console.log("Extracted token:", token); // Kontrollera token
    localStorage.setItem('token', token);
    
    return response.data.user || response.data.data?.user;
  } catch (error) {
    console.error("Login error details:", error.response?.data || error.message);
    throw error;
  }
};

export const verifyToken = async () => {
  const token = localStorage.getItem('token');
  console.log("Token being verified:", token); // Kontrollera token
  
  if (!token) return null;

  try {
    const response = await axiosInstance.get('/auth/me', {
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data.user || response.data;
  } catch (error) {
    console.error("Full verification error:", {
      status: error.response?.status,
      data: error.response?.data,
      headers: error.response?.headers
    });
    localStorage.removeItem('token');
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await axiosInstance.post('/auth/logout');
    localStorage.removeItem('token');
    deleteCookie('token');
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};

export default axiosInstance;
