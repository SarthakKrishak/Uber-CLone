import React from 'react'
import { useNavigate } from 'react-router-dom';

const UserProctectWrapper = ({
    children
}) => {

    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    if (!token) {
        navigate("/login")
    }

  return (
      <>
          {children}
      </>
  )
}

export default UserProctectWrapper