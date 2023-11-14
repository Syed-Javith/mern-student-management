import React from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'
import StudentGuidelines from './StudentGuidelines'
import AdminGuidelines from './AdminGuidelines'

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
          {
            !user?.isAdmin ? <StudentGuidelines user={user} /> : <AdminGuidelines user={user} />
          }
          <p>Visit the site for further guidelines and support us with your journey 🤞</p>
          <h3>About Us</h3>
          <p> we envision a future where managing students and educational data is seamless, allowing institutions to focus more on nurturing academic excellence and fostering a positive learning environment.</p>
          <h3>Thanks for logging !!</h3>
        </div>
      </div>
  )
}

export default ProfileTab
