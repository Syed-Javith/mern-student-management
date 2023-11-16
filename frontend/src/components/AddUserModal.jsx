import React, { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { registerNewUser } from '../apis/actions.api'

const AddUserModal = ({ setAddUserModal , token}) => {

  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', gender: '', isAdmin: false, department: '', rollNumber: 0, year: 0 })

  const [error , setError] = useState('');

  const [loading , setLoading] = useState(false)

  const register = async (e) => {
    e.preventDefault();

    try {
      setError('');
      setLoading(true)
      const response = await registerNewUser(newUser,token)
      console.log(response);
    } catch (error) {
      console.log(error);
      if(error.response.status === 400){
        console.log("user already found");
        setError("user already found")
      }else{
        setError("oops somthing went wrong 😞")
      }
    }finally{
      setLoading(false)
    }

  }

  return (
    <div className='add-user-modal'>
      <FaTimes className='close-btn' onClick={() => setAddUserModal(false)} color='white' />
      <form onSubmit={(e) => register(e)}>
      <div className='input-box'>
        <div>
          <div className="form-group">
          <label htmlFor="name">Username</label>
          <input type="text" name='name' onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" name='email' onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} required/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" name='password' onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} required/>
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <input type="radio" name='gender' value={'M'} onChange={(e) => setNewUser({ ...newUser, gender: e.target.value })} /> <span>Male </span><br />
          <input type="radio" name='gender' value={'F'} onChange={(e) => setNewUser({ ...newUser, gender: e.target.value })} /> <span>Female </span>
        </div>
        <div className="form-group">
          <label htmlFor="isAdmin">Credential</label>
          <input type="radio" name='isAdmin' onChange={(e) => setNewUser({ ...newUser, isAdmin: true })} /> <span>Admin </span><br />
          <input type="radio" name="isAdmin" onChange={(e) => setNewUser({ ...newUser, isAdmin: false })} /> <span>Student </span>
        </div>
        <input type="submit" value={ loading ? "Loading Please wait" : "Register"  }/>
        { error?.length > 0 && <p>{error}</p> }
        </div>
        {newUser.isAdmin === false && <div>
          <div className="form-group">
            <label htmlFor="department">Department</label>
            <input type="text" name="department" id="department" onChange={(e) => setNewUser({ ...newUser, department: e.target.value })} required/>
          </div>
          <div className="form-group">
            <label htmlFor="rollNumber">Roll Number</label>
            <input type="text" name="rollNumber" id="rollNumber" onChange={(e) => setNewUser({ ...newUser, rollNumber: parseInt(e.target.value) })} required/>
          </div>
          <div className="form-group">
            <label>
              Year
            </label>
            <select name="year" id="year" onChange={(e) => setNewUser({ ...newUser, year: parseInt(e.target.value ) })}>
              <option value=""><span style={{ color: 'rgba(125,125,125,1)' }}>Select Year</span> </option>
              <option value="1">I</option>
              <option value="2">II</option>
              <option value="3">III</option>
              <option value="4">IV</option>
            </select>
          </div>
        </div>}
        
      </div>
      
      </form>
    </div>
  )
}

export default AddUserModal
