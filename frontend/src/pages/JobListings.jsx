import React from 'react'
import styles from '../style'

function JobListings() {
  return (
    <div className={`${styles.flexStart} ${styles.paddingX} bg-section-dark-bg pt-20 xl:pb-4`}>
            <div className={`${styles.boxWidth}`}>
                Job Listings
            </div>
        </div>
  )
}

export default JobListings