import React from 'react';
import { useParams } from 'react-router-dom';
import styles from '../style';
import mac from '../assets/mac.png';
import macCover from '../assets/macCover.webp';
import { Avatar, Button, Divider } from "@nextui-org/react";
import { useState } from 'react';
import { MdNotificationAdd } from "react-icons/md";
import '../css/Company.css'
import AboutCompany from '../components/companyProfileComponents/AboutCompany';
import CompanyJobOffers from '../components/companyProfileComponents/CompanyJobOffers';
import Suggestions from '../components/companyProfileComponents/Suggestions';
import { MdNotificationsActive } from "react-icons/md";


function Company() {

  const [isAbout, setIsAbout] = useState(true);
  const [isFollowed, setIsFollowed] = useState(true);
  const { company_id } = useParams();
  const company = {
    id: 14,
    name: "Financial Wizards LLC",
    industry: "Finance",
    founded_year: 2000,
    hq_location: "New York, NY",
    website: "http://financialwizards.com",
    logo: mac,
    followers: 500,
    description: "Tech Innovators Inc. is an industry-leading technology powerhouse with a rich history of groundbreaking achievements. Established in 2005 in the heart of Silicon Valley, we have been at the forefront of innovation, pushing the boundaries of what's possible in the realms of software development, hardware engineering, and cutting-edge artificial intelligence. Our diverse team of over 100,000 skilled professionals is dedicated to shaping the future and delivering transformative solutions to businesses across a myriad of industries. With a commitment to excellence, collaboration, and forward-thinking, Tech Innovators Inc. remains a driving force in the ever-evolving landscape of technology."
  };

  return (
    <div className={`${styles.flexStart} ${styles.paddingX} bg-section-dark-bg pt-20 xl:pb-4`}>
      <div className={`${styles.boxWidth}`}>
        <div className='my-[12px] bg-[#121212] p-4 rounded-md'>  {/* CONTAINER */}
          <div className='bg-image rounded-md' style={{ backgroundImage: `url(${macCover})`, backgroundSize: "cover", backgroundPosition: "center" }}>
            {/* Cover Photo */}
            <div className='h-[200px]'></div>

            {/* Profile Section */}
            <div className='flex flex-col justify-end h-[100px] bg-[#191919] rounded-b-md'>
              {/* Profile Picture and Info */}
              <div className="flex items-center justify-between gap-4 px-6 pb-4">
                <div className="flex items-center gap-6">
                  <Avatar isBordered color="primary" src={company.logo} className="w-24 h-24" />
                  <div className="flex flex-col">
                    <h1 className="text-3xl font-bold text-white">{company.name}</h1>
                    <h1 className='font-bold text-primary-600 text-[18px]'>2.7K <span className='font-semibold text-default-400'>followers</span></h1>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Button startContent={isFollowed ? <MdNotificationsActive /> : <MdNotificationAdd />} className={`${isFollowed ? "bg-rose-600 " : "bg-primary-400" } font-bold`} onClick={() => setIsFollowed((prev) => !prev)}>
                    {isFollowed ? "Following" : "Follow"}
                  </Button>
                  {/* <span className="text-white">{company.followers} followers</span> */}
                </div>

              </div>

              {/* Follow Button and Followers Count */}

            </div>
          </div>

          {/* Description Section */}
          <div className=" mt-4 flex gap-4">

            <div className='w-[60%] bg-[#191919] rounded-lg px-4 pb-4 h-fit'>
              <div className='flex justify-between p-2 rounded-md gap-2'>
                <button className={`w-[50%] flex justify-center  ${isAbout && 'selected'} p-4 font-bold text-default-600`} onClick={() => {
                  setIsAbout(true)
                }}>
                  About us
                </button>
                <button className={`w-[50%] flex justify-center  ${!isAbout && 'selected'} p-4 font-bold text-default-600`} onClick={() => {
                  setIsAbout(false)
                }}>
                  Job Offers
                </button>
              </div>
              {isAbout ?
                <AboutCompany company={company} />
                :
                <CompanyJobOffers />
              }
            </div>

            <Suggestions />

          </div>
        </div>
      </div>
    </div>
  );
}

export default Company;
