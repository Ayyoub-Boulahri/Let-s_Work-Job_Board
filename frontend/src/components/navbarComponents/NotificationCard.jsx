import { Avatar } from '@nextui-org/react'
import React from 'react'
import candidat from "../../assets/candidat.jpg"

function NotificationCard() {
  return (
    <div className='flex gap-6'>
        <Avatar src={candidat} />
        <div className='flex flex-col gap-2'>
            <p className='text-default-700'>You are Accecpted in this job Offer</p>
            <span className='text-[12px]'>29 minutes ago</span>
        </div>
    </div>
  )
}

export default NotificationCard