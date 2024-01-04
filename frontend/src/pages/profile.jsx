import React from 'react'
import PersonnelInfos from '../components/PersonnelInfos'
import LoginInfos from '../components/LoginInfos'
import styles from '../style'
import "../css/profile.css"
import { useState } from 'react'
import { Avatar, Divider} from "@nextui-org/react";
import profile from '../assets/profile.webp'



function Profile() {
  const [indexTab, setindexTab] = useState(1)

  const tabs = [
    {
      id: 1,
      title: "Personnel Informations",
      component: <PersonnelInfos />
    },
    {
      id: 2,
      title: "Login Informations",
      component: <LoginInfos />
    }
  ]

  return (
    <div className={`pt-20 bg-section-dark-bg h-[1000px] ${styles.flexStart} ${styles.paddingX}`}>
      <div className={`${styles.boxWidth} ${styles.paddingY}`}>
        <div className={` flex justify-between`}>

          {/* Tabs Section */}

          <div className='flex flex-col w-[28%] mr-20 bg-section-bright-bg items-center p-6 rounded-lg'>
            <Avatar isBordered color="primary" src={profile} className="w-[160px] h-[160]" />
            <h1 className={`${styles.heading3} text-center`}>Ayyoub Boulahri</h1>
            <ul className='flex flex-col list-none mt-6'>
              {tabs.map((tab, index) => (
                <>
                  <button className={`flex font-poppins text-[18px] text-gray-300 font-medium rounded-md hover:bg-[#21262C] p-1 px-3 ${tab.id === indexTab && 'active-tab'}`} onClick={() => setindexTab(tab.id)}>
                    <li key={tab.id} className="">{tab.title}</li>
                  </button>
                  {index !== tabs.length - 1 && <Divider className="my-4" />}
                </>
              ))}
            </ul>
          </div>

          {/* Component Section */}
          <div className="flex flex-col flex-1">
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