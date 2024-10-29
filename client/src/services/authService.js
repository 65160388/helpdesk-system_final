import axios from 'axios';

const API_URL = 'http://localhost:5001/api/auth';

const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    console.log('Register response:', response.data);
    return response;
  } catch (error) {
    console.error('Error during registration:', error);
    throw error;
  }
};

const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    console.log('Login response:', response.data);
    return response;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

const authService = {
  register,
  login,
};

export default authService;
