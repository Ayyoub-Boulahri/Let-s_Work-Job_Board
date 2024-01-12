import React from 'react'
import PersonnelInfos from '../components/profileComponents/PersonnelInfos'
import LoginInfos from '../components/profileComponents/LoginInfos'
import styles from '../style'
import "../css/profile.css"
import { useState } from 'react'
import { Avatar, Divider} from "@nextui-org/react";
import profile from '../assets/profile.png'
import { GiSkills } from "react-icons/gi";
import { PiAddressBookThin } from "react-icons/pi";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { GrAchievement } from "react-icons/gr";
import { FaBook } from "react-icons/fa";
import ExperiencesSkills from '../components/profileComponents/ExperiencesSkills'


function Profile() {
  const [indexTab, setindexTab] = useState(1)

  const tabs = [
    {
      id: 1,
      title: "Personnel Informations",
      logo:<PiAddressBookThin />,
      component: <PersonnelInfos />
    },
    {
      id: 2,
      title: "Login Informations",
      logo: <MdOutlinePrivacyTip />,
      component: <LoginInfos />
    },
    {
      id: 3,
      title: "Skills & Experiences",
      logo :<GrAchievement />,
      component: <ExperiencesSkills />
    },
    {
      id: 4,
      title: "Degrees",
      logo :<FaBook /> ,
      component: <LoginInfos />
    }
  ]

  return (
    <div className={`pt-20 bg-section-dark-bg ${styles.flexStart} ${styles.paddingX}`}>
      <div className={`${styles.boxWidth} ${styles.paddingY}`}>
        <div className={` flex sm:flex-row  flex-col justify-between`}>

          {/* Tabs Section */}

          <div className='flex flex-col sm:w-[28%] items-center py-6 rounded-lg '>
            <Avatar isBordered color="primary" src={profile} className="w-[160px] h-[160]" />
            <h1 className={`${styles.heading3} text-center`}>Ayyoub Boulahri</h1>
            <div className='flex sm:flex-col flex-row list-none mt-6 '>
              {tabs.map((tab, index) => (
                <>
                  <button className={`flex font-poppins text-[18px] text-gray-300 font-medium hover:rounded-md hover:bg-[#21262C] p-1 px-3 ${tab.id === indexTab && 'active-tab'}`} onClick={() => setindexTab(tab.id)}>
                    <div key={tab.id} className='flex flex-row'>
                      <div className='sm:block hidden'>{tab.logo}</div>
                      <div  className="text-sm pl-3">{tab.title}</div>
                    </div>
                  </button>
                  {index !== tabs.length - 1 && <Divider className="my-4 bg-[#3D3D3D] sm:block hidden" />}
                </>
              ))}
            </div>
          </div>
          <Divider orientation='vertical' className='h-1000 w-[2px] bg-[#3D3D3D] ' />
          {/* Component Section */}
          <div className="flex flex-col sm:w-[58%] sm:mr-20 items-center p-6 rounded-lg">
            {tabs.map(tab => (
              indexTab === tab.id && tab.component
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}

export default Profile