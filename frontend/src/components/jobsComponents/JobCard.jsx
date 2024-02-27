import React, { useEffect } from 'react'
import { Avatar } from '@nextui-org/react'
import "../../css/jobCard.css"
import { useNavigate } from 'react-router-dom'
import { convertBufferToDataURL, formatDate } from '../../services/convertFunctions'

function JobCard(props) {
    const navigate = useNavigate()
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <div className="rounded-md flex flex-col px-4 pb-2 pt-3 gap-2 bg-[#121212] card" onClick={() => navigate("/jobs/job/" + props.job._id)}>
            <div className='flex w-full justify-between'>
                <p className='text-default-500 text-small font-bold'>{formatDate(props.job.date_publication)}</p>
                <div className={`rounded-full  px-4 ${props.job.job_status ? "bg-green-700" : "bg-red-500"}`}>{props.job.job_status ? "Open" : "Closed"}</div>
            </div>
            <div className='flex items-center gap-4'>
                <Avatar radius='md' src={convertBufferToDataURL(props.job.company[0].company_photo)} size="lg" />

                <div>
                    <h4 className='font-bold text-default-600 text-[16px]'>{props.job.company[0].company_name}</h4>
                    <h4 className='font-semibold text-default-400'>{props.job.company[0].city} ({props.job.company[0].country})</h4>
                </div>
            </div>

            <div className='text-default-700 font-extrabold text-[16px]'>
                <h3>{props.job.title} <span className='font-semibold text-default-400'> ({props.job.job_type})</span></h3>
            </div>

            <div className='line-clamp-3 text-small text-default-400'>
                {props.job.description}
            </div>

            <div className='flex w-full justify-between'>
                <p className='text-red-600 font-semibold text-small'>Deadline : {formatDate(props.job.delais_depot)}</p>
                <div className="text-green-600 font-bold">{props.job.salary} {props.job.currency}/ {props.job.pay_period}</div>
            </div>
        </div>
    )
}

export default JobCard