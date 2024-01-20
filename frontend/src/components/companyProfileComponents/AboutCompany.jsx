import React from 'react'
import { Divider } from '@nextui-org/react'
function AboutCompany(props) {
    return (
        <div className='mt-4'>
            <div className='flex flex-col gap-4'>
                <h1 className="font-bold text-default-600 text-[20px]">Description</h1>
                <p className={`text-default-500 text-medium leading-[1.6]`}>{props.company.description}</p>
            </div>
            <Divider className='bg-default-100 my-6' />
        </div>
    )
}

export default AboutCompany