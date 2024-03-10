import React, { useEffect, useState } from 'react'
import styles from '../style'
import CompanyLeading from '../components/companieComponents/CompanyLeading'
import SearchSection from '../components/companieComponents/SearchSection'
import { Divider } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';
import handleLogout from '../services/handleLogout';
import { useDispatch} from 'react-redux';
import { setLoginOut } from '../stores/authStore';
import "../css/height.css"

function Companies() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [searchTxt, setSearchTxt] = useState("")

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
        <CompanyLeading searchTxt={searchTxt} setSearchTxt={setSearchTxt} />
        <Divider className="my-4 bg-[#3D3D3D] sm:block hidden" />
        <SearchSection searchTxt={searchTxt} setSearchTxt={setSearchTxt} />
      </div>
    </div>
  )
}

export default Companies