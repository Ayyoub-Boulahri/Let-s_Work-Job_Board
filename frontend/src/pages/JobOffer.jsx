import React from 'react'
import { useParams } from 'react-router-dom';
import styles from '../style';

function JobOffer() {
  const { job_id } = useParams()

  return (
    <div className={`${styles.flexStart} ${styles.paddingX} bg-section-dark-bg pt-20 xl:pb-4`}>
      <div className={`${styles.boxWidth}`}>
        {job_id}
      </div>
    </div>
  )
}

export default JobOffer