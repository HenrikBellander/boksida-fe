import axiosInstance from "./axiosInstance";

export const getUsers = async () => {
    try {
        const response = await axiosInstance.get('/users')
        return response.data.users
    } catch (error) {
        console.error('Error fetching users', error)
        throw error
    }
}

export const createUser = async (userData) => {
    try {
        const response = await axiosInstance.post("/users/", userData)
        return response.data
    } catch (error) {
        console.error("Error creating user:", error)
        throw error
    }
}