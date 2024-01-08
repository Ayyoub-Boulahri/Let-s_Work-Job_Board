import React from 'react'
import styles from '../style'
import profile from '../assets/work_boy.png'
import "../css/profile.css"
import { Avatar, Divider} from "@nextui-org/react";
import { FaRegEdit } from "react-icons/fa";



function PersonnelInfos() {
  const List = [
    {
      id:1,
      name : "First name",
      text : "khalaf"
    },
    {
      id:2,
      name : "Last name",
      text : "drhourhi"
    },
    {
      id:3,
      name : "adresse",
      text : "mansour agouray"
    },
    {
      id:4,
      name : "phone",
      text : "0631887261"
    },
    {
      id:5,
      name : "city",
      text : "Meknes(Maroc)"
    }
  ]
  return (
    <div className='flex flex-col '>
      <div className='flex'>
          <div className='p-2 text-sm h-[30%] text-[20px]'>
              <h1 className=' font-medium text-blue-600 dark:text-blue-500 '>Profile</h1>
              <p className='mt-2'>Optimisez votre expérience sur <b>let's work</b> en mettant à jour vos données professionnelles</p>
          </div>
          <span className='w-[40%]'>
              <img src={profile} alt="" className='w-32 '/>
          </span>
      </div>
      <Divider className="my-4" />
      <div className='flex flex-row text-[24px] text-gray-500'>
      <h1>My Informations</h1>
      <div className='flex items-center pl-3 hover:text-blue-500'><a href=""><FaRegEdit /></a></div>
      </div>
      {List.map(tab => (
          <div key={tab.id}>
              <div className='text-[14px] pt-3 text-lg font-extrabold'>
                {tab.name}
              </div >
              <p className='text-[12px] font-thin'>
                {tab.text}
              </p>
          </div> 
      ))}
      </div>
  )
}

export default PersonnelInfos