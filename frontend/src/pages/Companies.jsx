import React, { useEffect } from 'react'
import styles from '../style'
import CompanyLeading from '../components/companieComponents/CompanyLeading'
import SearchSection from '../components/companieComponents/SearchSection'
import { Divider } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';
import checkAuthentication from '../services/checkAuthentication';
import { useSelector, useDispatch } from 'react-redux';
import { setAuthenticated } from '../stores/authStore';

function Companies() {

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
        <CompanyLeading />
        <Divider className="my-4 bg-[#3D3D3D] sm:block hidden" />
        <SearchSection />
      </div>
    </div>
  )
}

export default Companies