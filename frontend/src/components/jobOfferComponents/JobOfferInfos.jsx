import React, { useState } from 'react'
import { Avatar, Divider } from '@nextui-org/react';
import "../../css/card.css"
import Markdown from 'react-markdown'

function JobOfferInfos(props) {
    const [showDesc, setShowDesc] = useState(false);

    return (
        <div className='flex md:w-[70%] flex-col shadowCard bg-[#141414] p-8 h-fit'>
            <div className='flex justify-between items-center'>

                <div className='flex items-center gap-4'>
                    <Avatar src={props.job_offer.photo} size="sm" className='cursor-pointer' onClick={() => { window.location.href = "/companies/company/" + props.job_offer.id }} />
                    <div>
                        <h4 className='font-bold text-default-600 text-[14px] cursor-pointer' onClick={() => { window.location.href = "/companies/company/" + props.job_offer.id }}>{props.job_offer.company.companyName}</h4>
                        <h4 className='font-semibold text-default-400 text-[12px]'>{props.job_offer.company.followers} followers</h4>
                    </div>
                </div>

                <div className={`rounded-full h-fitt font-bold px-4 py-[2px] ${props.job_offer.offer_status == "Open" ? "bg-green-700" : "bg-red-500"}`}>{props.job_offer.offer_status}</div>

            </div>
            <h1 className='font-bold text-[24px] mt-6'>{props.job_offer.title}</h1>
            <h4 className='font-semibold text-default-400 text-[12px] mb-6'>{props.job_offer.company.city} ({props.job_offer.company.country})</h4>

            <div className='flex w-full justify-center'>
                <Divider className='w-[90%] bg-default-100' />
            </div>

            <div className='mt-10 flex flex-col gap-4'>
                <h1 className="font-bold text-default-600 text-[20px]">Job Description</h1>
                
                <p>
                <Markdown children={props.job_offer.description} className={`text-small text-default-400 leading-[1.6] ${showDesc ? 'line-clamp-none' : 'line-clamp-[6]'} `} />
                    <span className='text-primary-600 cursor-pointer' onClick={() => setShowDesc((prev) => !prev)}>
                        {showDesc ? "show Less" : "show more"}
                    </span>
                </p>
            </div>
            <Divider className='bg-default-100 my-6' />

            <div className='mt-2 flex flex-col gap-4'>
                <h1 className="font-bold text-default-600 text-[20px]">Educations</h1>
                <p className={`text-small text-default-400 ml-4`}>
                    • &nbsp;&nbsp; {props.job_offer.educations}
                </p>
            </div>

            <Divider className='bg-default-100 my-6' />

            <div className='mt-2 flex flex-col gap-4'>
                <h1 className="font-bold text-default-600 text-[20px]">Responsabilites</h1>
                <div className='flex flex-col text-small text-default-400 leading-[1.7]'>
                    {props.job_offer.responsabilities.map((respon, index) => (
                        <span key={index} className='ml-4'>• &nbsp;&nbsp; {respon}</span>
                    ))}
                </div>
            </div>

            <Divider className='bg-default-100 my-6' />

            <div className='mt-2 flex flex-col gap-4'>
                <h1 className="font-bold text-default-600 text-[20px]">Required Skills</h1>
                <div className='flex flex-col text-small text-default-400 leading-[1.7]'>
                    {props.job_offer.skills_required.map((skill, index) => (
                        <span key={index} className='ml-4'>• &nbsp;&nbsp; {skill}</span>
                    ))}
                </div>
            </div>

            <Divider className='bg-default-100 my-6' />

            <div className='mt-2 flex flex-col gap-4'>
                <h1 className="font-bold text-default-600 text-[20px]">Attachments</h1>
                <div className='flex flex-col text-small text-default-400 leading-[1.7]'>
                    {props.job_offer.attachements.map((attch, index) => (
                        <span key={index} className='ml-4'>• &nbsp;&nbsp; {attch}</span>
                    ))}
                </div>
            </div>

            <Divider className='bg-default-100 my-6' />

            <div className='mt-2 flex flex-col gap-4'>
                <h1 className="font-bold text-default-600 text-[20px]">Company Overview</h1>
                <div className='flex gap-4 ml-4 md:flex-row flex-col'>
                    <div className='flex flex-col md:w-[50%]'>
                        <div className='flex'>
                            <p className='font-bold text-default-500 w-[30%]'>Size</p>
                            <p className='text-default-400'>{props.job_offer.company.size}</p>
                        </div>
                        <div className='flex'>
                            <p className='font-bold text-default-500 w-[30%]'>Industry</p>
                            <p className='text-default-400 w-[70%]'>{props.job_offer.company.industry}</p>
                        </div>
                        <div className='flex'>
                            <p className='font-bold text-default-500 w-[30%]'>Founded</p>
                            <p className='text-default-400'>{props.job_offer.company.founded_year}</p>
                        </div>
                    </div>

                    <div className='flex flex-col md:w-[50%]'>
                        <div className='flex'>
                            <p className='font-bold text-default-500 w-[30%]'>Email</p>
                            <p className='text-default-400'>{props.job_offer.company.email}</p>
                        </div>
                        <div className='flex'>
                            <p className='font-bold text-default-500 w-[30%]'>Phone</p>
                            <p className='text-default-400'>{props.job_offer.company.Phone}</p>
                        </div>
                        <div className='flex'>
                            <p className='font-bold text-default-500 w-[30%]'>Address</p>
                            <p className='text-default-400'>{props.job_offer.company.address}</p>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default JobOfferInfos