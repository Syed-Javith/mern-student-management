import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MarkList from '../components/MarkList';
import '../css/Admin.css';
import { getStudentDetailsById } from '../apis/actions.api';
import AdminAddForm from '../components/AdminAddForm';

const AdminControl = () => {
  const { state } = useLocation();
  const [student, setStudent] = useState(state?.student);
  const [marks, setMarks] = useState(student?.marks);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await getStudentDetailsById(student?._id);
      setStudent(response?.data);
      const updatedMarks = response.data.marks;
      setMarks(updatedMarks);
    } catch (err) {
      console.log(err);
      navigate('/');
    }
  };

  useEffect(() => {
        
    if(student === null || student === undefined){
      navigate('/')
    }
    fetchData();
  }); 

  return (
    <div>
     <h1 style={{ textAlign : 'center' , color : '#57BBB5' }}> Welcome To Admin Panel</h1>
     
      <div className='mark-list'>
        <div className='mark-list-item'>
          <p>Subject</p>
          <p>Marks</p>
          <p>Code</p>
          <p>Edit</p>
        </div>
        {marks?.map((item , i) => {
          return <MarkList isAdmin={true} item={item} key={i} userid={student?._id}  email={student.email} />;
        })}
      <AdminAddForm isAdmin={true} userid={student?._id} email={student?.email} />

      </div>
    </div>
  );
};

export default AdminControl;
