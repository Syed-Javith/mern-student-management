import React from 'react'

const AdminGuidelines = ({user}) => {
  return (
    <div>
      <p>Welcome <strong>{`${user?.gender=='M' ? 'Mr.' : 'Miss'} ${user?.name}`}</strong> , This is the student management system where you have full access to change and update the marks of the student.use it with correct guidelines of the provider.</p>
    </div>
  )
}

export default AdminGuidelines
