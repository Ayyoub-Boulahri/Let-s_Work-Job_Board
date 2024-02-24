import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import styles from '../style';
import mac from '../assets/mac.png';
import macCover from '../assets/macCover.webp';
import { Avatar, Button, Spinner } from "@nextui-org/react";
import { useState } from 'react';
import { MdNotificationAdd } from "react-icons/md";
import '../css/Company.css'
import AboutCompany from '../components/companyProfileComponents/AboutCompany';
import CompanyJobOffers from '../components/companyProfileComponents/CompanyJobOffers';
import Suggestions from '../components/companyProfileComponents/Suggestions';
import { MdNotificationsActive } from "react-icons/md";
import "../css/height.css"
import { getCompanyById, getNumberOfFollowers } from '../services/companyServices';
import { convertBufferToDataURL, formatNumFollowers } from '../services/convertFunctions';
import { followCompany, isFollower, unfollowCompany } from '../services/followServices';
import { useSelector } from 'react-redux';
import CompanyProfileInfos from '../components/companyProfileComponents/CompanyProfileInfos';

function Company() {
  const [isAbout, setIsAbout] = useState(true);
  const [isFollowed, setIsFollowed] = useState(false);
  const { company_id } = useParams();
  const [companyInfos, setCompanyInfos] = useState(null)
  const authInfo = useSelector((state) => state.isAuthenticated.value);

  useEffect(() => {
    const getCompanyInfos = async () => {
      getCompanyById(company_id).then((company) => {
        setCompanyInfos(company.data.companyInfos);
      }).catch((error) => { console.log(error) });
    }

    getCompanyInfos()

    const checkFollow = async () => {
      try {
        const isFollowCompany = await isFollower(company_id, authInfo.userId)
        if (isFollowCompany)
          setIsFollowed(true)
        else
          setIsFollowed(false)
      } catch (error) {
        console.error(error);
      }
    }

    checkFollow()
  }, [authInfo])

  const handleFollow = () => {
    if (!isFollowed) {
      followCompany(company_id, authInfo?.userId)
        .then(() => {
          setCompanyInfos(prev => {
            return {
              ...prev,
              followersCount: prev.followersCount + 1
            };
          });
          setIsFollowed((prev) => !prev)
        })
        .catch((error) => { console.log(error) });
    }
    else {
      unfollowCompany(company_id, authInfo?.userId)
        .then(() => {
          setCompanyInfos(prev => {
            return {
              ...prev,
              followersCount: prev.followersCount - 1
            };
          });
          setIsFollowed((prev) => !prev)
        })
        .catch((error) => { console.log(error) });
    }
  }

  return (
    <div className={`${styles.flexStart} ${styles.paddingX} bg-section-dark-bg pt-20 xl:pb-4`}>
      <div className={`${styles.boxWidth} HeightTall`}>
        {
          !companyInfos
            ? <div className='h-[1000px] flex justify-center items-start'><Spinner size='lg' /> </div>
            : <div className='my-[12px] bg-[#121212] p-4 rounded-md'>  {/* CONTAINER */}
              <div className='bg-image rounded-md' style={{ backgroundImage: `url(${convertBufferToDataURL(companyInfos.company_cover)})`, backgroundSize: "cover", backgroundPosition: "center" }}>
                {/* Cover Photo */}
                <div className='h-[200px]'></div>

                {/* Profile Section */}
                <div className='flex flex-col justify-end h-[100px] bg-[#191919] rounded-b-md'>
                  {/* Profile Picture and Info */}
                  <div className="flex items-center justify-between gap-4 px-6 pb-4">
                    <div className="flex items-center gap-6">
                      <Avatar isBordered color="primary" src={convertBufferToDataURL(companyInfos.company_photo)} className="w-24 h-24" />
                      <div className="flex flex-col">
                        <h1 className="text-3xl font-bold text-white">{companyInfos.company_name}</h1>
                        <h1 className='font-bold text-primary-600 text-[18px]'>{formatNumFollowers(companyInfos.followersCount)}&nbsp;&nbsp;<span className='font-semibold text-default-400'>followers</span></h1>
                      </div>
                    </div>

                    {
                      authInfo.typeUser == "employee" &&
                      <div className="flex items-center justify-between">
                        <Button startContent={isFollowed ? <MdNotificationsActive /> : <MdNotificationAdd />} className={`${isFollowed ? "bg-rose-600 " : "bg-primary-400"} font-bold`} onClick={handleFollow}>
                          {isFollowed ? "Following" : "Follow"}
                        </Button>
                      </div>
                    }

                  </div>

                  {/* Follow Button and Followers Count */}

                </div>
              </div>

              {/* Description Section */}
              <div className=" mt-4 flex gap-4">

                <div className={`${authInfo.typeUser == "employee" ? "w-[60%]" : "w-[100%]"} bg-[#191919] rounded-lg px-4 pb-4 h-fit`}>
                  <div className='flex justify-between p-2 rounded-md gap-2'>
                    <button className={`w-[50%] flex justify-center  ${isAbout && 'selected'} p-4 font-bold text-default-600`} onClick={() => {
                      setIsAbout(true)
                    }}>
                      {authInfo.typeUser == "company" ? "Company Information" : "About us"}
                    </button>
                    <button className={`w-[50%] flex justify-center  ${!isAbout && 'selected'} p-4 font-bold text-default-600`} onClick={() => {
                      setIsAbout(false)
                    }}>
                      Job Offers
                    </button>
                  </div>
                  {isAbout
                    ? authInfo.typeUser == "company" 
                        ? <CompanyProfileInfos company={{ company_id: companyInfos._id, description: companyInfos.description, password: companyInfos.password, company_name:companyInfos.company_name, email: companyInfos.company_email, city: companyInfos.city, country: companyInfos.country, industry: companyInfos.industry, phone: companyInfos.company_phone, address: companyInfos.address, founded_year: companyInfos.founded_year, size: companyInfos.size }} />
                        : <AboutCompany company={{ description: companyInfos.description, email: companyInfos.company_email, city: companyInfos.city, country: companyInfos.country, industry: companyInfos.industry, phone: companyInfos.company_phone, address: companyInfos.address, founded_year: companyInfos.founded_year, size: companyInfos.size }} />
                    : <CompanyJobOffers company_id={company_id} city={companyInfos.city} country={companyInfos.country} company_photo={companyInfos.company_photo} company_name={companyInfos.company_name} typeUser={authInfo.typeUser}/>
                  }
                </div>
                {
                  authInfo.typeUser == "employee" &&
                  <Suggestions industry={companyInfos.industry} company_id={companyInfos._id} />
                }
              </div>
            </div>}
      </div>
    </div>
  );
}

export default Company;
