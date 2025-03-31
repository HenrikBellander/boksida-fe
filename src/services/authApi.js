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
}