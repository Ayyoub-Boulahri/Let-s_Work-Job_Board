import React, { useEffect } from 'react'
import { useContext } from 'react';
import { SignInContext } from '../App';
import { useNavigate } from 'react-router-dom';
import styles from '../style';
function Jobs() {
  const { isSignIn, userType } = useContext(SignInContext)
  const navigate = useNavigate()

  // useEffect(() => {

  //   if (!isSignIn)
  //     navigate("/")

  // }, [])

  return (
    <div className={`${styles.flexStart} pt-20 xl:pb-4`}>
      <div className={`${styles.boxWidth}`}>

        <div className='bg-white'>
          jobs
        </div>
      </div>
    </div>
  )
}

export default Jobs