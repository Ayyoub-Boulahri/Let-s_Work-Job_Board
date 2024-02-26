import React from 'react'
import { useNavigate } from 'react-router-dom'
import "../../css/profiles.css"
import { Avatar } from '@nextui-org/react'
function ProfileCard(props) {
    const navigate = useNavigate()

    return (
        <div className='flex flex-col bg-[#121212] p-4 rounded-md company-card cursor-pointer' onClick={() => navigate("/profiles/profile/" + props.profile.id)}>
            <div className='flex flex-col items-center'>
                <Avatar size='xl' className="w-20 h-20 mb-2" src={props.profile.img} />
                <h1 className='font-bold text-default-600 text-[20px]'>
                    {props.profile.name}
                </h1>
                <font className='font-semibold text-default-400'>
                    {props.profile.city}
                </font>
            </div>
            <div>
                <font className='line-clamp-3 text-small text-default-400 text-center'>
                    {props.profile.description}
                </font>
                <h1 className='text-center font-semibold'>
                    {props.profile.email}
                </h1>
                <div className='flex justify-center'>
                    <button className='bg-primary-500 font-bold mt-4 rounded-lg px-6 py-2'>Contact</button>
                </div>
            </div>
        </div>
    )
}

export default ProfileCard