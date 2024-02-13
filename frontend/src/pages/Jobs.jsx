import React, { useEffect } from 'react';
import styles from '../style';
import { Divider } from '@nextui-org/react';
import JobsLeading from '../components/jobsComponents/JobsLeading';
import JobsList from '../components/jobsComponents/JobsList';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import handleLogout from '../services/handleLogout';
import { useDispatch } from 'react-redux';
import { setLoginOut } from '../stores/authStore';

function Jobs() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authInfo = useSelector((state) => state.isAuthenticated.value);

  useEffect(() => {
    const fetchAuthInfo = async () => {
      const infoAuthentificaiton = await checkAuthentication();
      if (!authInfo?.auth || authInfo?.typeUser != "employee"){
        window.scrollTo(0, 0);
        navigate("/");
      }
    };
    fetchAuthInfo()
  }, [])

  return (
    <div className={`${styles.flexStart} ${styles.paddingX} bg-section-dark-bg pt-20 xl:pb-4`}>
      <div className={`${styles.boxWidth}`}>
        <JobsLeading />
        <Divider className='mt-20' />
        <JobsList />
      </div>
    </div>
  );
}

export default Jobs;
