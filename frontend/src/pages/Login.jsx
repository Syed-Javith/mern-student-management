import React, { useState } from 'react'
import Cookies from 'universal-cookie';
import { loginUser } from '../apis/auth.api';
import { useNavigate } from 'react-router-dom';
import Typewriter from "typewriter-effect";
import '../css/Login.css'
import { FaUserAlt } from 'react-icons/fa';
const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false)
  const cookies = new Cookies();
  const navigate = useNavigate();

  const login = async (e) => {


    e.preventDefault();

    console.log("login");

    try {
      const response = await loginUser(email, password);
      console.log(response);
      const user = response.data.user
      cookies.set('user', user, { path: '/' })
      cookies.set('token', response.data.token, { path: '/' })
      console.log(cookies.get('token'));
      setError(false)
      if (!user.isAdmin) {
        navigate('/student');
      } else {
        navigate('/admin');
      }
    } catch (err) {
      console.log(err);
      setError(true)
    }

  }

  return (

    <div className='login'>
      <h1><Typewriter

        onInit={(typewriter) => {
          typewriter
            .typeString("Hello User 👋")
            .pauseFor(1000)
            .deleteAll()
            .typeString("Welcomes To Login")
            .pauseFor(1000)
            .deleteAll()
            .typeString("Login to continue")
            .start();
        }}
      /></h1>

      <form onSubmit={(e) => login(e)}>
        <div >
          <img src={require('../assets/images/head.png')} alt="" height={200} width={350} />
        </div>
        <div className='form-group'>
          <label htmlFor="email">email </label> <input type="email" name='email' className='line' onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className='form-group'>
          <label htmlFor="password">password </label> <input type="password" className='line' onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <input type="submit" className='white-bg-colored-btn' value="Login" />
      </form>
      {error && <p>*Invalid username or password</p>}
    </div>
  )
}

export default Login
