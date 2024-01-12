import React, { useEffect } from 'react'
import { useContext } from 'react';
import { SignInContext } from '../App';
import { useNavigate } from 'react-router-dom';

function Jobs() {
  const { isSignIn, userType } = useContext(SignInContext)
  const navigate = useNavigate()

  useEffect(() =>{

    if(!isSignIn)
      navigate("/")

  }, [])

  return (
    <div>
      {userType}    
    </div>
  )
}

export default Jobs