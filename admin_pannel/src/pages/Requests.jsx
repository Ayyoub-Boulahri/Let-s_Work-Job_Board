import React, { useEffect } from 'react'
import styles from '../style'
import { getSomeCompanies } from '../services/RequestsServices'
import RequestsTable from '../components/requestsComponents/RequestsTable'


function Requests() {
  
  return (
    <div className={`${styles.flexStart} ${styles.paddingX} bg-section-dark-bg pt-20 xl:pb-4`}>
      <div className={`${styles.boxWidth} HeightTall`}>
        <div className='p-4'>
          <RequestsTable />
        </div>
      </div>
    </div>
  )
}

export default Requests