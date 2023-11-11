import React, { useState } from 'react'
import Cookies from 'universal-cookie';
import { loginUser } from '../apis/auth.api';
import { useNavigate } from 'react-router-dom';
const Login = () => {
 
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const cookies = new Cookies();
  const navigate = useNavigate();

  const login = async (e) => {

    e.preventDefault();
  
    console.log("login");

    try {
      const response = await loginUser(email,password);
      console.log(response);
      const user = response.data.user
      cookies.set('user', user ,{path : '/'})
      cookies.set('token' , response.data.token,{path:'/'})
      console.log(cookies.get('token'));
      if(!user.isAdmin){
      navigate('/student');
      }else{
        navigate('/admin');
      }
    } catch (err) {
      console.log(err);
    }

  }

  return (
    <div>
      <h1>Welcome To Login</h1>

      <form onSubmit={(e) => login(e)}>
        email : <input type="email" onChange={(e) => setEmail(e.target.value)} />
        password : <input type="password" onChange={(e) => setPassword(e.target.value)} />
        <input type="submit" value="Login" />
      </form>

    </div>
  )
}

export default Login
