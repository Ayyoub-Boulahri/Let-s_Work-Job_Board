import React from 'react'
import styles from '../style'
import { Avatar, Divider } from "@nextui-org/react";
import Profile from '../assets/profileExample.jpg'
import { MdOutlineMailOutline } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import Markdown from 'react-markdown'
import { useState } from 'react';

function ProfileEmployee() {

  const profile = {
    id:1,
    img: Profile,
    name: 'John Doe',
    city: 'New York',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam condimentum enim vel massa tincidunt, ac convallis dolor ultrices.',
    email: 'john.doe@example.com',
    phone:'0631887261'
  }
  const [showDesc, setShowDesc] = useState(false);
  return (
    <div className={`${styles.flexStart} ${styles.paddingX} bg-section-dark-bg pt-20 xl:pb-4`}>
        <div className={`${styles.boxWidth}`}>
          <div className='my-[12px] bg-[#121212] p-4 rounded-md'>  {/* CONTAINER */}
            <div className='flex'>
              <div className='w-[30%] p-5 flex flex-col gap-4 items-center'>
                <Avatar isBordered color="primary" src={profile.img} className="w-[140px] h-[160]" />
                <div>
                  <h1 className='font-bold text-default-600 text-[22px] text-center'>
                    {profile.name}
                  </h1>
                  <h1 className='font-semibold text-default-400 text-center flex gap-2 items-center'>
                  <MdOutlineMailOutline />
                    {profile.email}
                  </h1>
                  <h1 className='font-semibold text-default-400 text-center flex gap-2 items-center mt-2'>
                    <FaPhoneAlt />
                    {profile.phone}
                  </h1>
                </div>
              </div>
              <Divider orientation='vertical' className='h-1000 w-[2px] bg-[#3D3D3D] ' />
              <div className='p-4'> 
                <h1 className='text-[34px] '>
                  Profile
                </h1>
                <div>
                  <h1>
                    Desciption
                  </h1>
                  <p>
                <Markdown children={profile.description} className={`text-small text-default-400 leading-[1.6] ${showDesc ? 'line-clamp-none' : 'line-clamp-[6]'} `} />
                    <span className='text-primary-600 cursor-pointer' onClick={() => setShowDesc((prev) => !prev)}>
                        {showDesc ? "show Less" : "show more"}
                    </span>
                </p>
                <Divider />
                <div className='mt-2 flex flex-col gap-4'>
                <h1 className="font-bold text-default-600 text-[20px]">Educations</h1>
                <p className={`text-small text-default-400 ml-4`}>
                    • &nbsp;&nbsp; {profile.city}
                </p>
              </div>
                </div>
                <Divider />
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default ProfileEmployee