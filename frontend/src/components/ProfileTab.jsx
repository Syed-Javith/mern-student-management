import React from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'

const ProfileTab = ({user}) => {

    const cookies = new Cookies()
    const navigate = useNavigate();

    const logout = () => {

        cookies.remove('user',{path : '/'});
        cookies.remove('token',{path : '/'})
        navigate('/')

    }

  return (
    <div className='profile-tab'>
        <img className='profile-pic' src={ require(`../assets/images/${user?.gender == 'M' ? 'man' : 'woman'}.jpg`) } alt="" height={100} width={100} />
        <button onClick={logout}>Logout</button>
        <div>
          <p>Name : {user?.name}</p>
         { user?.year > 0 &&  <p>Year : {user?.year}</p> }
          <p>email : {user?.email}</p>
        </div>
      </div>
  )
}

export default ProfileTab
