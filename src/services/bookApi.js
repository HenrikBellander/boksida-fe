import axiosInstance from "./axiosInstance";

export const fetchCategories = async () => {
  try {
    const response = await axiosInstance.get('/api/');
    return response.data;
  } catch (error) {
    throw new Error('Could not fetch categories');
  }
};

export const fetchBooksByCategory = async (category) => {
  try {
    const response = await axiosInstance.get(`/api/category/${category}`);
    return response.data;
  } catch (error) {
    throw new Error('Something went wrong while fetching books');
  }
};

export const searchBooks = async (query) => {
  try {
    const response = await axiosInstance.get(`/api/search?q=${query}`);
    return response.data;
  }
  catch (error) {
    throw new Error('Something went wrong while fetching search results');
  }
};

export const fetchBookDetail = async (book_id) => {
  try {
    const response = await axiosInstance.get(`/api/book/${book_id}`);
    return response.data;
  } catch (error) {
    throw new Error('Could not fetch book details');
  }
};


