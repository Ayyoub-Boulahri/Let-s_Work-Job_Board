import React from 'react'
import styles from '../../style'
import profile from '../../assets/work_boy.png'
import "../../css/profile.css"
import { Avatar, Divider } from "@nextui-org/react";
import { FaRegEdit } from "react-icons/fa";

function LoginInfos() {
  const List = [
    {
      id: 1,
      name: "Email",
      text: "khalaf"
    },
    {
      id: 2,
      name: "password",
      text: "drhourhi"
    }
  ]
  return (
    <div className='flex flex-col '>
      <div className='flex'>
        <div className='p-2 text-sm h-[30%] text-[20px] '>
          <h1 className=' font-medium text-blue-600 dark:text-blue-500 '>Login</h1>
          <p className='mt-2 '>Gérez votre compte, assurez la sécurité de vos connexions, et prenez le contrôle de la sécurité de vos informations personnelles et bien plus encore.</p>
        </div>
        <span className='w-[40%]'>
          <img src={profile} alt="" />
        </span>
      </div>
      <Divider className="my-4" />
      <div className='flex flex-row text-[20px] text-gray-500 mt-5'>
        <h1>Email</h1>
        <div className='flex items-center pl-3 hover:text-blue-500'><a href=""><FaRegEdit /></a></div>
      </div>
      <div>
        <h1>khalaf.drh</h1>
      </div>
      <div className='flex flex-row text-[20px] text-yellow-50'>
        <h1>Password</h1>
        <div className='flex items-center pl-3 hover:text-blue-500'><a href=""><FaRegEdit /></a></div>
      </div>
      *********
    </div>
  )
}
export default LoginInfos;
