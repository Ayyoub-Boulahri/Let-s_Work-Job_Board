import React, { useEffect } from 'react'
import styles from '../style'
import JobListingsHeader from '../components/JobListingsComponents/JobListingsHeader'
import { useNavigate } from 'react-router-dom';
import handleLogout from '../services/handleLogout';
import { useDispatch } from 'react-redux';
import { setLoginOut } from '../stores/authStore';

function JobListings() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    const typeUser = localStorage.getItem('typeUser');
    if (typeUser != "company") {
      handleLogout();
      dispatch(setLoginOut());
      navigate("/");
    }
  }, [])

  return (
    <div className={`${styles.flexStart} ${styles.paddingX} bg-section-dark-bg pt-20 xl:pb-4`}>
      <div className={`${styles.boxWidth}`}>
        <JobListingsHeader />
      </div>
    </div>
  )
}

export default JobListings