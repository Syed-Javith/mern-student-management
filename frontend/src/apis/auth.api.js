import axios from 'axios'
const url = 'http://localhost:5000'

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
  