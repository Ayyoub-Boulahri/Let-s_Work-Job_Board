import React from 'react'
import { useNavigate } from 'react-router-dom'
import "../../css/profiles.css"
function ProfileCard(props) {
  const navigate = useNavigate()

  return (
    <div className='flex flex-col  bg-[#121212] p-4 rounded-md company-card'>
        <div className='flex flex-col items-center'>
            <img src={props.img} alt="profile" className='w-[100px] rounded-full'/>
            <h1 className='font-bold text-default-600 text-[20px]'>
                {props.name}
            </h1>
            <font className='font-semibold text-default-400'>
                {props.city}
            </font>
        </div>
        <div>
            <font className='line-clamp-3 text-small text-default-400 text-center'>
                {props.description}
            </font>
            <h1 className='text-center '>
                {props.email}
            </h1>
            <div className='flex justify-center'>
                <button className='bg-teal-500 border-teal-500 border-2 rounded-md text-black font-medium py-2 mt-2 px-8'>Contact</button>
            </div>
        </div>
    </div>
  )
}

export default ProfileCard