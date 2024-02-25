import React from 'react'
import { Divider } from '@nextui-org/react'
function AboutCompany(props) {
    return (
        <div className='mt-4'>
            <div className='flex gap-4 ml-4  flex-col'>
                    <div className='flex'>
                        <p className='font-bold text-default-500 w-[30%]'>Email</p>
                        <p className='text-default-400'>{props.company.email}</p>
                    </div>
                    <div className='flex'>
                        <p className='font-bold text-default-500 w-[30%]'>Phone</p>
                        <p className='text-default-400'>{props.company.phone}</p>
                    </div>
                    <div className='flex'>
                        <p className='font-bold text-default-500 w-[30%]'>Address</p>
                        <p className='text-default-400'>{props.company.address}</p>
                    </div>

                    <div className='flex'>
                        <p className='font-bold text-default-500 w-[30%]'>Country</p>
                        <p className='text-default-400'>{props.company.country}</p>
                    </div>

                    <div className='flex'>
                        <p className='font-bold text-default-500 w-[30%]'>City</p>
                        <p className='text-default-400'>{props.company.city}</p>
                    </div>

                    <div className='flex'>
                        <p className='font-bold text-default-500 w-[30%]'>Size</p>
                        <p className='text-default-400'>{props.company.size}</p>
                    </div>
                    <div className='flex'>
                        <p className='font-bold text-default-500 w-[30%]'>Industry</p>
                        <p className='text-default-400 w-[70%]'>{props.company.industry}</p>
                    </div>
                    <div className='flex'>
                        <p className='font-bold text-default-500 w-[30%]'>Founded</p>
                        <p className='text-default-400'>{props.company.founded_year}</p>
                    </div>



            </div>
            <Divider className='bg-default-100 my-6' />
            <div className='flex flex-col gap-4'>
                <h1 className="font-bold text-default-600 text-[20px]">Description</h1>
                <p className={`text-default-500 text-medium leading-[1.6]`}>{props.company.description}</p>
            </div>
            <Divider className='bg-default-100 my-6' />
        </div>
    )
}

export default AboutCompany