import React from 'react';
import { useParams } from 'react-router-dom';
import styles from '../style';
import background from '../assets/banner-bg.png';
import profile from '../assets/profile.png';
import { Avatar, Button } from "@nextui-org/react";
import { useState } from 'react';
import { MdNotificationAdd } from "react-icons/md";
import '../css/Company.css'
import CompanyProfileCard from '../components/companieComponents/CompanyProfileCard';
import mac from '../assets/GlovoApp.png'


function Company() {

  const [isAbout,setIsAbout] = useState(true);
  const { company_id } = useParams();
  const company = {
    id: 14,
    name: "Financial Wizards LLC",
    industry: "Finance",
    founded_year: 2000,
    hq_location: "New York, NY",
    website: "http://financialwizards.com",
    logo: profile,
    followers: 500,
    description: "Tech Innovators Inc. is an industry-leading technology powerhouse with a rich history of groundbreaking achievements. Established in 2005 in the heart of Silicon Valley, we have been at the forefront of innovation, pushing the boundaries of what's possible in the realms of software development, hardware engineering, and cutting-edge artificial intelligence. Our diverse team of over 100,000 skilled professionals is dedicated to shaping the future and delivering transformative solutions to businesses across a myriad of industries. With a commitment to excellence, collaboration, and forward-thinking, Tech Innovators Inc. remains a driving force in the ever-evolving landscape of technology."
  };
  const suggestions =[
    {
      company_email: "info@example.com",
      ID_CITY: 1,
      INDUSTRY_ID: 2,
      PASSWORD: "securepassword",
      COMPANY_NAME: "Example Corp",
      DESCRIPTION: "A description of the company.",
      company_phone: "+1234567890",
      CERTIFICAT: "base64_encoded_certificate",
      ISAPPROVED: 1,
      ADDRESS: "123 Main St, City, Country",
      company_PHOTO: mac,
      company_cover: "base64_encoded_cover",
      FOUNDED_YEAR: 2000,
      followers: 2010,
      ID_SIZE: 3,
    },
    {
      company_email: "sales@company.com",
      ID_CITY: 2,
      INDUSTRY_ID: 1,
      PASSWORD: "strongpassword",
      COMPANY_NAME: "Sales Cops",
      DESCRIPTION: "We specialize in sales.",
      company_phone: "+9876543210",
      CERTIFICAT: "base64_encoded_certificate_sales",
      ISAPPROVED: 0,
      ADDRESS: "456 Market St, Town, Country",
      company_PHOTO: profile,
      company_cover: "base64_encoded_cover_sales",
      FOUNDED_YEAR: 2010,
      followers: 2010,
      ID_SIZE: 2,
    },
  ];

  return (
    <div className={`${styles.flexStart} ${styles.paddingX} bg-section-dark-bg pt-20 xl:pb-4`}>
      <div className={`${styles.boxWidth}`}>
      <div className='my-[12px] bg-[#121212] p-4 rounded-md'>  {/* CONTAINER */}
        <div className='bg-image rounded-md' style={{ backgroundImage: `url(${background})` }}>
          {/* Cover Photo */}
          <div className='h-[100px]'></div>

          {/* Profile Section */}
          <div className='flex flex-col justify-end h-[100px] bg-[#242526] rounded-b-md'>
            {/* Profile Picture and Info */}
            <div className="flex items-center space-x-4 px-6 pb-4">
              <Avatar isBordered color="primary" src={company.logo} className="w-24 h-24" />
              <div className="flex flex-col">
                <h1 className="text-3xl font-bold text-white">{company.name}</h1>
                <p className="text-gray-300">{company.industry}</p>
              </div>
              <div className="flex items-center justify-between px-6">
                <Button startContent={<MdNotificationAdd/>} className='bg-sky-800' color="primary" variant="contained">Follow</Button>
                {/*<span className="text-white">{company.followers} followers</span>*/}
              </div>
            </div>

            {/* Follow Button and Followers Count */}
            
          </div>
        </div>

        {/* Description Section */}
        <div className="  mt-4 flex gap-2">
          
        <div className='w-[60%] bg-[#242526] rounded-lg p-4'>
          <div className='flex justify-between bg-[#242528] p-2 rounded-md gap-2'>
            <div className={`w-[50%] flex justify-center  ${isAbout && 'selected'} p-4 font-bold text-default-600`} >
              <button onClick={() => {
              setIsAbout(true)
            }}>
                About us
              </button>
            </div>
            <div className={`w-[50%] flex justify-center  ${!isAbout && 'selected'} p-4 font-bold text-default-600`}>
              <button  onClick={() => {
              setIsAbout(false)
              }}>
                Job Offers
              </button>
            </div>
          </div>
          {isAbout ?
          <div className='mt-4'>
            <p className="text-default-800 ">{company.description}</p>
          </div>
          :<div>
            tst
          </div>  
        } 
        </div>
        
          <div className='w-[40%] bg-[#242526] rounded-lg p-4'>
            <h2 className='text-[18px] font-bold p-4 text-default-600'>
              Suggestions
            </h2>
            {suggestions.length===0 ?
            <div>
              NO DATA FOUND
            </div>  
            : <div className='flex flex-col gap-4'>
              {suggestions.map(ligne=>(
                <div>
                  <CompanyProfileCard name={ligne.COMPANY_NAME} city='city' logo={ligne.company_PHOTO} followers={ligne.followers}/>
                </div>
              ))}
            </div>
          }
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Company;
