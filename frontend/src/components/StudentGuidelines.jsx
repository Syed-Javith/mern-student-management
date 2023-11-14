import React from 'react'

const StudentGuidelines = ({user}) => {
  return (
    <div>
      <p>Welcome {`${user?.gender=='M' ? 'Mr.' : 'Miss'} ${user?.name}`} , This is the student management system where you have full access to view your marks.use it with correct guidelines of the provider.</p>
    </div>
  )
}

export default StudentGuidelines
