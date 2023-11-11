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
      <AdminForm />
      </div>
    </div>
  )
}

export default Admin
