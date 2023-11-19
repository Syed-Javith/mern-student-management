import React, { useState } from 'react'
import { getStudent } from '../apis/actions.api';
import { useNavigate } from 'react-router-dom';

const AdminForm = ({token}) => {


  const [rollNumber , setRollNumber] = useState(0)
  const [department , setDepartment] = useState('')
  const [year , setYear] = useState(0);
  const [warningVisible , setWarningVisible] = useState(false);
  const [ready , setReady] = useState(true)
  const navigate = useNavigate();

  const getStudentDetail = async (e) => {
    e.preventDefault();
    setReady(false)
    setWarningVisible(false)

    try {
        const response = await getStudent( rollNumber , year , department , token) ;
        console.log(response);
        if( response?.data?._id && response.status === 200){
            navigate('/admin/panel',{ state : { student : response.data } })
        }else{
            setWarningVisible(true)
        }
    } catch (err) {
        console.log(err);
    }
    setReady(true)

  } 

  return (
    <div className='admin-form-inner'>
      <form onSubmit={(e) => getStudentDetail(e)}>
        <div className="form-group">
        <label htmlFor="rollno">
          Roll Number 
        </label>
        <input type="number" name='rollno' onChange={(e)=> setRollNumber(parseInt(e.target.value))} placeholder='enter roll number' required/>
        </div> 
        <div className="form-group">
          
        <label htmlFor="department">
          Department 
        </label>
        <input type="text" name='department' onChange={(e)=>setDepartment(e.target.value)} placeholder='enter department' autoCapitalize={true} autoComplete={false} required/>
        </div>
        <div className="form-group">
        <label htmlFor="year">
          Year 
        </label>
        <select name="year" id="year" onChange={(e)=> setYear(e.target.value) }>
        <option value="" style={{ color : 'rgba(125,125,125,1)'}}>Select Year </option> 
        <option value="1">I</option> 
        <option value="2">II</option>  
        <option value="3">III</option>  
        <option value="4">IV</option>   
        </select>
        </div>
        <input type="submit" value={ ready ? "Get Student" : "fetchinggg..." } />
        { warningVisible && <p>No Such user found</p> }
      </form>
    </div>
  )
}

export default AdminForm
