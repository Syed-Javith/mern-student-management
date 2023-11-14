import React, { useState } from 'react'
import ProfileTab from '../components/ProfileTab'
import Cookies from 'universal-cookie'
import '../css/Admin.css'
import AdminForm from '../components/AdminForm'

const Admin = () => {

  const cookies = new Cookies()
  const [admin , setAdmin] = useState(cookies.get('user'))
  

  return (
    <div className='admin-panel'>
      <ProfileTab user={admin} />
      <div className='admin-form'>
      <h1>Welcome To Admin Panel</h1>
      <p>Enter Student Details here and change marks. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non cupiditate doloremque, blanditiis quia consequatur, odio atque itaque sequi illo totam quos. Iure consequatur fuga laborum quo minima dolores laboriosam nobis.</p>
      <AdminForm />
      </div>
    </div>
  )
}

export default Admin
