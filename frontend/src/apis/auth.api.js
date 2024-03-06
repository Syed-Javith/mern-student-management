import axios from 'axios'
import { BASE_URL } from '../assets/url';
const url = BASE_URL

export const loginUser = async (email, password) => {
    try {
      const response = await axios.post(`${url}/auth/login`, { email, password });
      console.log(response);
      // response.data.user.password = '';
      return response;
    } catch (err) {
      console.log(err);
      throw err; 
    }
  }

export const signInWithGoogle = async () => {
  try {
    const response = axios.get(`${url}/profile`,{ withCredentials : true })
    console.log(response);
    return response
  } catch (error) {
    console.log(error);
  }
} 