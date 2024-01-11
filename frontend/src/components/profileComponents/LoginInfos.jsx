import React, { useState } from 'react'
import styles from '../../style'
import profile from '../../assets/work_boy.png'
import "../../css/profile.css"
import { Avatar, Divider } from "@nextui-org/react";
import { FaRegEdit } from "react-icons/fa";
import {Input} from "@nextui-org/react";
import { MdOutlineAlternateEmail } from "react-icons/md";
import PasswordInput from '../PasswordInput';

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
  const [changeEmail,setChangeEmail] = useState(false);
  const [changePassword,setChangePassword] = useState(false);
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
       {/* EMAIL */}
       <div className='mb-5 flex justify-between'>
        <div>
          <div className='flex items-center flex-row text-[20px] text-gray-300 mt-5 '>
            <h1>Email</h1>
          </div>
          <div className='text-[14px]'>
            <h1>khalaf.drhourhi@gmail.com</h1>
          </div>
        </div>
          {!changeEmail &&
          <div className='flex items-center pl-3 hover:text-blue-500 ' ><button  onClick={() => setChangeEmail((prev) => !prev)}><FaRegEdit className='size-6'/></button></div>}
        </div> 
    { changeEmail &&
        <div>
          <h1 className='mb-3 text-[16px]'>New email</h1>
            <Input
          type="email"
         
          placeholder="you@example.com"
          labelPlacement="outside"
          className='w-[50%]'
          startContent={
            <MdOutlineAlternateEmail />
          }
        />
          <h1 className='pt-4 pb-4'>Confirm that it's you</h1>
          <PasswordInput label="Password" />
        <div className='flex justify-start  mt-8 justify-evenly'>
            <button className="bg-rose-500 font-semibold px-8 py-2 rounded-md" onClick={() => setChangeEmail((prev) => !prev)}>Cancel</button>
            <button className="bg-[#0099FF] font-semibold px-8 py-2 rounded-md">Save</button>
          </div>
        </div>
    }
      
      <Divider className="my-4" />
      <div className='mb-5 flex justify-between'>
        <div>
          <div className='flex items-center flex-row text-[20px] text-gray-300 mt-5 '>
            {
              !changePassword ? <h1>Password</h1> : <h1>Current Password</h1>
            }
          </div>
          <div className='text-[14px]'>
            <h1>**************************</h1>
          </div>
        </div>
          {!changePassword &&
          <div className='flex items-center pl-3 hover:text-blue-500 ' ><button  onClick={() => setChangePassword((prev) => !prev)}><FaRegEdit className='size-6'/></button></div>}
        </div> 
      {changePassword &&
        <div>
          <h1 className='pt-2 pb-3'>Confirm you're current password</h1>
          <PasswordInput label="current password" />
          <h1 className='pt-2 pb-3'>You're new password</h1>
          <PasswordInput label="New password"/>
          <h1 className='pt-2 pb-3'>Confirm you're new password</h1>
          <PasswordInput label="Confirm new password"/>
          <div className='flex justify-start  mt-8 justify-evenly'>
            <button className="bg-rose-500 font-semibold px-8 py-2 rounded-md" onClick={() => setChangePassword((prev) => !prev)}>Cancel</button>
            <button className="bg-[#0099FF] font-semibold px-8 py-2 rounded-md">Save</button>
          </div>
        </div>
      }
    </div>
  )
}
export default LoginInfos;
