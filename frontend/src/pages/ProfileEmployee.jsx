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
    id: 1,
    img: Profile,
    name: 'John Doe',
    city: 'New York',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam condimentum enim vel massa tincidunt, ac convallis dolor ultrices. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam condimentum enim vel massa tincidunt, ac convallis dolor ultrices. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam condimentum enim vel massa tincidunt, ac convallis dolor ultrices. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam condimentum enim vel massa tincidunt, ac convallis dolor ultrices. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam condimentum enim vel massa tincidunt, ac convallis dolor ultrices. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam condimentum enim vel massa tincidunt, ac convallis dolor ultrices. ',
    email: 'john.doe@example.com',
    phone: '0631887261',
    degrees: [
      {
        id: 1,
        degree: "Dut Genie Informatique",
        school: "Ecole Superieur de technologie Meknes",
        year: 2024
      }, 
      {
        id: 2,
        degree: "Dut Genie Informatique",
        school: "Ecole Superieur de technologie Meknes",
        year: 2024
      }
    ]
  }

  return (
    <div className={`${styles.flexStart} ${styles.paddingX} bg-section-dark-bg pt-20 xl:pb-4`}>
      <div className={`${styles.boxWidth}`}>


        <div className='my-[12px] p-4 rounded-md'>
          {/* CONTAINER */}
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

            <Divider orientation="vertical" className='h-100 ml-6' />

            <div className='px-6 py-4 pl-10'>
              <div>
                {/* About */}
                <div >
                  <h1 className="font-bold text-default-600 text-[20px]">About</h1>
                  <p className="text-small text-default-400 leading-[1.6]" style={{textIndent: "30px"}}>
                    {profile.description}
                  </p>
                </div>

                <Divider className='my-4' />

                {/* Educations */}

                <div className='mt-2 flex flex-col gap-4'>
                  <h1 className="font-bold text-default-600 text-[20px]">Educations</h1>
                  {
                    profile.degrees.map((deg, index) => (
                      <div className='flex gap-6'>
                        <h2 className="text-default-400 font-bold">{deg.year}</h2>
                        <div>
                          <h3 className='text-default-700 font-bold'>{deg.degree}</h3>
                          <h1 className='text-default-400'>{deg.school}</h1>
                        </div>
                      </div>
                    ))
                  }
                </div>


              </div>
              <Divider className='my-4' />
            </div>
          </div>
        </div>


      </div>
    </div>
  )
}

export default ProfileEmployee