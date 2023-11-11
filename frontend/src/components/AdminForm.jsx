import React, { useState } from 'react'
import { getStudent } from '../apis/actions.api';
import { useNavigate } from 'react-router-dom';

const AdminForm = () => {


  const [rollNumber , setRollNumber] = useState('')
  const [department , setDepartment] = useState('')
  const [year , setYear] = useState(0);
  const [warningVisible , setWarningVisible] = useState(false);
  const navigate = useNavigate();

  const getStudentDetail = async (e) => {
    e.preventDefault();
    setWarningVisible(false)

    try {
        const response = await getStudent( rollNumber , year , department ) ;
        console.log(response);
        if( response?.data?._id && response.status === 200){
            navigate('/admin/panel',{ state : { student : response.data } })
        }else{
            setWarningVisible(true)
        }
    } catch (err) {
        console.log(err);
    }

  } 

  return (
    <form onSubmit={(e) => getStudentDetail(e)}>
        <div className="form-group">
        <label htmlFor="roolno">
          Roll Number 
        </label>
        <input type="text" name='rollno' onChange={(e)=> setRollNumber(e.target.value)}  />
        </div> 
        <div className="form-group">
          
        <label htmlFor="department">
          Department 
        </label>
        <input type="text" name='department' onChange={(e)=>setDepartment(e.target.value)}  />
        </div>
        <div className="form-group">
        <label htmlFor="year">
          Year 
        </label>
        <select name="year" id="year" onChange={(e)=> setYear(e.target.value) }>
        <option value="">Select Year </option> 
        <option value="1">I</option> 
        <option value="2">II</option>  
        <option value="3">III</option>  
        <option value="4">IV</option>   
        </select>
        </div>
        <input type="submit" value="Get Student" />
        { warningVisible && <p>No Such user found</p> }
      </form>
  )
}

export default AdminForm
