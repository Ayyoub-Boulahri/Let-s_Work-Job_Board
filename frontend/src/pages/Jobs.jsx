import React, { useEffect, useState } from 'react';
import styles from '../style';
import { Divider } from '@nextui-org/react';
import JobsLeading from '../components/jobsComponents/JobsLeading';
import JobsList from '../components/jobsComponents/JobsList';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import handleLogout from '../services/handleLogout';
import { useDispatch } from 'react-redux';
import { setLoginOut } from '../stores/authStore';
import "../css/height.css"
function Jobs() {
  const navigate = useNavigate();
  const authInfo = useSelector((state) => state.isAuthenticated.value);
  const dispatch = useDispatch()

  useEffect(() => {
    const typeUser = localStorage.getItem('typeUser');
    if (typeUser != "employee") {
      handleLogout();
      dispatch(setLoginOut());
      navigate("/");
    }
  }, [])

  return (
    <div className={`${styles.flexStart} ${styles.paddingX} bg-section-dark-bg pt-20 xl:pb-4`}>
      <div className={`${styles.boxWidth} HeightTall`}>
        <JobsLeading />
        <Divider className='mt-20' />
        <JobsList />
      </div>
    </div>
  );
}

export default Jobs;
