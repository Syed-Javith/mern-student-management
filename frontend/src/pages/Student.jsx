import React, { useEffect, useState } from 'react'
import Cookies from 'universal-cookie';
import MarkList from '../components/MarkList';
import ProfileTab from '../components/ProfileTab';
import { useNavigate } from 'react-router-dom';

const Student = () => {

  const cookies = new Cookies();
  const [student , setStudent] = useState(cookies.get('user'));
  const [marks , setMarks] = useState(student?.marks);
  const navigate = useNavigate();
  

  useEffect(()=>{

    if(student === null || student === undefined || marks === undefined || marks === null){
      navigate('/')
    }

  })

  return (
    <div className='student-page'>
      <ProfileTab user={student} />
      <div className='mark-list'>
      <div className='mark-list-item'>
        <p>Subject</p>
        <p>Marks</p>
        <p>Code</p>
        </div>
        {marks?.map( (item,i) => {
          return <MarkList key={i} item={item} isAdmin={student.isAdmin}/>
        } )}
      </div>
    </div>
  )
}

export default Student
