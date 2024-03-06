import React, { useEffect, useState } from 'react'
import ProfileTab from '../components/ProfileTab'
import Cookies from 'universal-cookie'
import '../css/Admin.css'
import AdminForm from '../components/AdminForm'
import { useNavigate } from 'react-router-dom'
import AddUserModal from '../components/AddUserModal'
import axios from 'axios'
import { BASE_URL } from '../assets/url'
const Admin = () => {

  const cookies = new Cookies()
  const [admin , setAdmin] = useState(null)
  const [adduserModal , setAddUserModal] = useState(false)
  const navigate = useNavigate();
  const getUser = async () => {
    try {
      const res = await axios.get( BASE_URL + '/verify/'+cookies.get('token'))
      console.log(res);
      setAdmin(res.data?.result)
      // setMarks(student?.marks)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    getUser();
    // if(admin === null || admin === undefined){
    //   navigate('/')
    // }

  },[])

  return (
    <div className='admin-panel'>
      <ProfileTab user={admin} />
      <div className='admin-form'>
      <h1>Welcome To Admin Panel</h1>
      <p>Enter Student Details here and change marks. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non cupiditate doloremque, blanditiis quia consequatur, odio atque itaque sequi illo totam quos. Iure consequatur fuga laborum quo minima dolores laboriosam nobis.</p>
      <AdminForm token={cookies.get('token')}/>
      <button onClick={()=> setAddUserModal(true)} className='add-user'>
        <img  src={require('../assets/images/add-user.png')} height={30} width={30} /> <span>Add User</span>
      </button>
      </div>
      { adduserModal && <AddUserModal setAddUserModal={setAddUserModal} token={cookies.get('token')}/> }
    </div>
  )
}

export default Admin
