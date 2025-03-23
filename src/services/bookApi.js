import axiosInstance from "./axiosInstance";


export const fetchCategories = async () => {
  try {
    const response = await axiosInstance.get('/api/');
    return response.data;
  } catch (error) {
    throw new Error('Kunde inte hämta kategorier');
  }
};