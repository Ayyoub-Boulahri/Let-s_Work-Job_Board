import React from 'react'
import styles from '../style'
import profile from '../assets/work_boy.png'
import "../css/profile.css"
import { Avatar, Divider} from "@nextui-org/react";


const List = [
  {
    id:1,
    name : "First_name",
    text : "khalaf"
  },
  {
    id:2,
    name : "Last_name",
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

function PersonnelInfos() {
  return (
    <div className='flex flex-col'>
      <div className='flex'>
          <div className='p-2 text-sm h-[30%]'>
              <h1 className=' font-medium text-blue-600 dark:text-blue-500 '>Profile</h1>
              <p className='mt-2'>Optimisez votre expérience sur <b>let's work</b> en mettant à jour vos données professionnelles</p>
          </div>
          <span>
              <img src={profile} alt="" className='w-32 '/>
          </span>
      </div>
      <Divider className="my-4" />
      <h1>My Informations</h1>
      {List.map(tab => (
          <div key={tab.id}>
              <div className='text-[14px] pt-3'>
                {tab.name}*
              </div >
              <p className='text-[12px]'>
                {tab.text}
              </p>
          </div> 
      ))}
      </div>
  )
}

export default PersonnelInfos