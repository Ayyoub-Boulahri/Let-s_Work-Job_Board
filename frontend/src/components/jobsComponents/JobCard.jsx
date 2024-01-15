import React from 'react'
import { Avatar } from '@nextui-org/react'
import "../../css/jobCard.css"

function JobCard(props) {
    return (
        <div className="rounded-md flex flex-col px-4 pb-2 pt-3 gap-2 bg-[#121212] card">
            <div className='flex w-full justify-between'>
                <p className='text-default-500 text-small font-bold'>{props.job.date_posted}</p>
                <div className={`rounded-full  px-4 ${props.job.offer_status == "Open" ? "bg-green-700" : "bg-red-500"}`}>{props.job.offer_status}</div>
            </div>
            <a href="/companies/company/1" target="_blank">more</a>
            <div className='flex items-center gap-4'>
                <Avatar radius='md' src={props.job.photo} size="lg" />

                <div>
                    <h4 className='font-bold text-default-600 text-[16px]'>{props.job.companyName}</h4>
                    <h4 className='font-semibold text-default-400'>{props.job.city} ({props.job.country})</h4>
                </div>
            </div>

            <div className='text-default-700 font-extrabold text-[16px]'>
                <h3>{props.job.title}</h3>
            </div>

            <div className='line-clamp-3 text-small text-default-400'>
                {props.job.description}
            </div>

            <div className='flex w-full justify-between'>
                <p className='text-red-600 font-semibold text-small'>Deadline : {props.job.date_delais}</p>
                <div className="text-green-600 font-bold">{props.job.salary} / {props.job.pay_period}</div>
            </div>
        </div>
    )
}

export default JobCard