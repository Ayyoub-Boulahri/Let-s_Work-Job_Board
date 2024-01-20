import { Avatar } from '@nextui-org/react'
import React from 'react'
import "../../css/card.css"
function CompanyProfileCard(props) {
    return (
            <div className='flex justify-between items-center p-4 rounded-lg cursor-pointer'>
                <div className='flex gap-8 justify-start'>
                    <Avatar src={props.logo} size="lg" />
                    <div>
                        <h1 className='font-bold text-default-600 text-[20px]'>{props.name}</h1>
                        <h4 className='font-semibold text-default-400'>{props.city} ({props.country})</h4>
                    </div>
                </div>
                <div className='flex flex-col justify-center items-center'>
                    <h1 className='font-bold text-primary-600 text-[18px]'>2.7K</h1>
                    <h4 className='font-semibold text-default-400'>Followers</h4>
                </div>
            </div>
    )
}

export default CompanyProfileCard