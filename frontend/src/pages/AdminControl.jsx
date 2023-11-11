import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MarkList from '../components/MarkList';
import '../css/Admin.css';
import { getStudentDetailsById } from '../apis/actions.api';

const AdminControl = () => {
  const { state } = useLocation();
  const [student, setStudent] = useState(state.student);
  const [marks, setMarks] = useState(student.marks);

  const fetchData = async () => {
    try {
      const response = await getStudentDetailsById(student._id);
      console.log(response);
      setStudent(response.data);

      const updatedMarks = response.data.marks;
      setMarks(updatedMarks);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [student._id]); 

  useEffect(() => {
    console.log(student);
    console.log(marks);
  }, [student, marks]); 

  return (
    <div>
     <h1> Welcome To Admin Panel</h1>
      <div className='mark-list'>
        <div className='mark-list-item'>
          <p>Subject</p>
          <p>Marks</p>
          <p>Code</p>
          <p>Edit</p>
        </div>
        {marks.map((item , i) => {
          return <MarkList isAdmin={true} item={item} key={i} userid={student._id} />;
        })}
      </div>
    </div>
  );
};

export default AdminControl;
