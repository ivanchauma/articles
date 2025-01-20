import axios, { AxiosError } from 'axios';
import API_URL from '../Util/Servers';

//const API_URL = 'http://localhost:8000/api/auth';

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    return response.data.token;
  } catch (error : unknown) {
    //throw new Error(error.response?.data?.message || 'Username or Password invalid');
    if (error instanceof AxiosError) {
        throw new Error(error.response?.data?.message || 'Username or Password invalid');
    }
  }
};

export const register = async (name: string, email: string, password: string, password_confirmation: string) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { name, email, password, password_confirmation });
    return response.data.token;
  } catch (error : unknown) {
    //throw new Error(error.response?.data?.message || 'Registration Failed');
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || 'Username or Password invalid');
  }
  }
};
