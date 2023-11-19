import React from 'react'

const StudentGuidelines = ({user}) => {
  return (
    <div>
      <p>Welcome <strong>{`${user?.gender=='M' ? 'Mr.' : 'Miss'} ${user?.name}`}</strong> , This is the student management system where you have full access to view your marks.As a student you have potential to change the world so ,use it with correct guidelines of the provider.</p>
    </div>
  )
}

export default StudentGuidelines
