import React, { useEffect } from 'react'
import JobRequestsHeader from '../components/jobRequestsComponents/JobRequestsHeader'
import styles from '../style'
import { useNavigate } from 'react-router-dom';
import handleLogout from '../services/handleLogout';
import { useDispatch} from 'react-redux';
import { setLoginOut } from '../stores/authStore';
import "../css/height.css"

function JobRequests() {
  const navigate = useNavigate()
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
        <JobRequestsHeader />
        </div>
    </div>
  )
}

export default JobRequests