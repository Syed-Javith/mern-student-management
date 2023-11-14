import React, { useState } from 'react'
import { addMark } from '../apis/actions.api';
import Cookies from 'universal-cookie';
import { FaPlus } from 'react-icons/fa';

const AdminAddForm = ({ isAdmin  , userid , email}) => {

    const [marks , setMarks ] = useState({})

    const addMarkToStudent = async (e) => {
        e.preventDefault();
        const cookies = new Cookies()
        try {
            const response = await addMark(userid , marks , cookies.get('token') , email )
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

  return (
//    <div className='mark-list-item'>
     <form className='mark-list-item' onSubmit={(e) => addMarkToStudent(e)}> 
        <input className='edit-input' type="text" name="subject" id="subject" onChange={(e) => setMarks( (prev) => ( { ...prev , subject :  e.target.value } ))} />
        <input className='edit-input' type="number" name="mark" id="mark"  onChange={(e) => setMarks((prev) => ({ ...prev , mark : parseInt(e.target.value) }))}/>
        <input className='edit-input' type="text" name="code" id="code" onChange={(e) => setMarks(( prev ) => ( { ...prev , code : e.target.value } ))} />
        <button className='add-button' type="submit">
        <FaPlus />
      </button>
    </form>
//    </div>
  )
}

export default AdminAddForm
