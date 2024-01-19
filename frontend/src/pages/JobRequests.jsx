import React from 'react'
import JobRequestsTable from '../components/UIComponents/JobRequestsTable'
import styles from '../style'

function JobRequests() {
  return (
    <div className={`${styles.flexStart} ${styles.paddingX} bg-section-dark-bg md:pt-40 pt-28 xl:pb-4`}>
      <div className={`${styles.boxWidth}`}>
        <JobRequestsTable />
        </div>
    </div>
  )
}

export default JobRequests