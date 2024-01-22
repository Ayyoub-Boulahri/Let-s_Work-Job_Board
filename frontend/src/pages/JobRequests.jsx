import React from 'react'
import JobRequestsHeader from '../components/JobRequestsComponents/JobRequestsHeader'
import styles from '../style'

function JobRequests() {
  return (
    <div className={`${styles.flexStart} ${styles.paddingX} bg-section-dark-bg pt-20 xl:pb-4`}>
      <div className={`${styles.boxWidth}`}>
        <JobRequestsHeader />
        </div>
    </div>
  )
}

export default JobRequests