import axios from 'axios';

const API_BASE_URL = 'https://fakestoreapi.com/products'; // Replace with your actual API base URL

// Example: Fetch products
export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}`);
    return response.data; // Assuming the API response returns product data in the `data` field
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
