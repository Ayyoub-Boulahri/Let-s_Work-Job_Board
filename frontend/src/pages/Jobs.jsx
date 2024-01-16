import React, { useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../style';
import checkAuthentication from '../services/checkAuthentication';
import { useSelector, useDispatch } from 'react-redux';
import { setAuthenticated } from '../stores/authStore';
import { Divider } from '@nextui-org/react';
import JobsLeading from '../components/jobsComponents/JobsLeading';
import JobsList from '../components/jobsComponents/JobsList';

const jobsPerPage = 10;

function Jobs() {
  const navigate = useNavigate();
  const authInfos = useSelector((state) => state.isAuthenticated.value);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAuthInfo = async () => {
      const infoAuthentificaiton = await checkAuthentication();
      dispatch(setAuthenticated(infoAuthentificaiton));
      if (!infoAuthentificaiton)
        navigate("/");
    };

    fetchAuthInfo();
  }, []);

  
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
