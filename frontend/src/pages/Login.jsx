import React, { useEffect, useState } from 'react'
import Cookies from 'universal-cookie';
import { loginUser, signInWithGoogle } from '../apis/auth.api';
import { useNavigate } from 'react-router-dom';
import Typewriter from "typewriter-effect";
import '../css/Login.css'
import { FaUserAlt } from 'react-icons/fa';
import axios from 'axios';
import { BASE_URL } from '../assets/url';
const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false)
  const [logging, setLogging] = useState(false)
  const cookies = new Cookies();
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const res = await axios.get( BASE_URL + '/verify/'+cookies.get('token'))
      console.log(res);
      if(!res.data?.result.isAdmin)
      navigate('/student');
      navigate('/admin');
    } catch (error) {
      console.log(error);
    }
  }

  const login = async (e) => {


    e.preventDefault();
    setLogging(true)

    console.log("login");

    try {
      const response = await loginUser(email, password);
      console.log(response);
      const user = response.data.user
      // cookies.set('user', user, { path: '/' })
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
    } finally {
      setLogging(false)
    }

  }

  const google = async () => {
    window.open("http://localhost:5000/auth/google", "_blank")
    try {
      const response = await signInWithGoogle()
      if(response) cookies.set('token', response.data?.token , { path: '/' })
      console.log(cookies.get('token'));
      getUser();
    } catch (error) {
      console.log(error);
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
        { logging ? <img src={require('../assets/images/load.gif')} height={20} width={20} /> : <input type="submit" className='white-bg-colored-btn' value="Login" /> }
      </form>
      {/* 
      <a onClick={google} ><button className='google'><img src={require('../assets/images/google.png')} alt="" height={20} width={20} /> Continue with Google</button></a>
      <button onClick={google}>Google</button> */}
      {error && <p>*Invalid username or password</p>}
    </div>
  )
}

export default Login
