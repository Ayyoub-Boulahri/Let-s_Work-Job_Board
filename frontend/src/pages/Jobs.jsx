import React, { useEffect } from 'react';
import styles from '../style';
import { Divider } from '@nextui-org/react';
import JobsLeading from '../components/jobsComponents/JobsLeading';
import JobsList from '../components/jobsComponents/JobsList';

function Jobs() {
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
