import { Avatar } from '@nextui-org/react'
import React from 'react'
import { convertBufferToDataURL, formatNotificationDate } from '../../services/convertFunctions'

function NotificationCard(props) {
  return (
    <div className='flex gap-6'>
        <Avatar src={convertBufferToDataURL(props.notification.photo)} />
        <div className='flex flex-col gap-2'>
            <p className='text-default-700'>{props.notification.message}</p>
            <span className='text-[12px]'>{formatNotificationDate(props.notification.created_at)}</span>
        </div>
    </div>
  )
}

export default NotificationCard