import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import styles from '../style';
import WhatsApp from "../assets/WhatsApp.jpg";
import "../css/card.css"
import { Button, Avatar, Divider } from '@nextui-org/react';
import { MdWork } from "react-icons/md";

function JobOffer() {
  const { job_id } = useParams();


  const job_offer = {
    id: 1,
    title: "Senior Software Engineer - Exciting Opportunity at WhatsApp",
    companyName: "WhatsApp",
    date_posted: "2024-01-17",
    date_delais: "2024-02-15",
    offer_status: "Open",
    salary: 80000,
    pay_period: "yr",
    description: "Join the McDonald's team as a Customer Service Representative and be a part of the world's leading fast-food restaurant chain. At McDonald's, we are committed to providing exceptional service and creating a positive dining experience for our customers.\n\nAs a Customer Service Representative, you will play a crucial role in ensuring customer satisfaction by taking orders, processing payments, and providing friendly assistance. This position offers a dynamic and fast-paced work environment, making it an ideal opportunity for individuals who thrive in customer-focused roles.\n\nResponsibilities:\n- Greet customers and provide a warm welcome.\n- Take and process customer orders accurately and efficiently.\n- Handle cash transactions and operate the point-of-sale system.\n- Maintain cleanliness and organization in the dining area.\n- Address customer inquiries and resolve issues promptly.\n- Collaborate with team members to ensure smooth operations.\n\nQualifications:\n- Previous experience in customer service is a plus.\n- Excellent communication and interpersonal skills.\n- Ability to work in a fast-paced environment.\n- Flexibility to work various shifts, including evenings and weekends.\n- Enthusiastic and positive attitude.\n\nJoin the McDonald's family and contribute to our commitment to quality, service, and cleanliness. If you are passionate about delivering excellent customer service and enjoy working in a team-oriented atmosphere, we invite you to apply for this exciting opportunity.\n\nApply now and become a valuable member of the McDonald's team!",
    country: "United States",
    city: "San Francisco",
    photo: WhatsApp,
    job_type: "Full-time",
    grade: "Senior",
    educations: "Bachelor's degree in Computer Science",
    pay_currency: "USD",
    responsabilities: [
      "Design and develop high-quality software solutions.",
      "Collaborate with cross-functional teams on project requirements.",
      "Conduct code reviews and provide constructive feedback.",
    ],
    attachements: [
      "Resume.pdf",
      "CoverLetter.docx",
    ],
    skills_required: [
      "JavaScript",
      "React",
      "Node.js",
      "RESTful APIs",
      "Agile methodology",
    ],
  }

  return (
    <div className={`${styles.flexStart} ${styles.paddingX} bg-section-dark-bg pt-40 xl:pb-4`}>
      <div className={`${styles.boxWidth}`}>
        <div className='flex sm:flex-row-reverse flex-col gap-10'>

          <div className='flex flex-col gap-4 sm:w-[30%] shadowCard bg-section-dark-bg p-4 h-fit'>
            <Button radius="sm" color="primary" className='w-full font-bold text-[18px]'>
              <MdWork /> Apply for the job
            </Button>
            <div className='flex justify-between'>
              <div className='flex flex-col items-start gap-2'>
                <p className='font-bold text-default-700'>Job Type</p>
                <p className='font-bold text-default-700'>Grade</p>
                <p className='font-bold text-default-700'>Date Posted</p>
                <p className='font-bold text-default-700'>DeadLine</p>
                <p className='font-bold text-default-700'>Salary</p>
              </div>

              <div className='flex flex-col items-end gap-2'>
                <p className='font-semibold text-default-400'>{job_offer.job_type}</p>
                <p className='font-semibold text-default-400'>{job_offer.grade}</p>
                <p className='font-semibold text-default-400'>{job_offer.date_posted}</p>
                <p className='font-semibold text-red-600'>{job_offer.date_delais}</p>
                <p className='font-bold text-[18px] text-green-600'>{job_offer.salary} {job_offer.pay_currency} / {job_offer.pay_period}</p>
              </div>

            </div>
          </div>

          <div className='flex sm:w-[70%] flex-col shadowCard bg-section-dark-bg p-8 h-fit'>
            <div className='flex justify-between items-center'>

              <div className='flex items-center gap-4'>
                <Avatar src={job_offer.photo} size="sm" />
                <div>
                  <h4 className='font-bold text-default-600 text-[14px]'>{job_offer.companyName}</h4>
                  <h4 className='font-semibold text-default-400 text-[12px]'>{job_offer.city} ({job_offer.country})</h4>
                </div>
              </div>

              <div className={`rounded-full h-fitt font-bold px-4 py-[2px] ${job_offer.offer_status == "Open" ? "bg-green-700" : "bg-red-500"}`}>{job_offer.offer_status}</div>

            </div>
            <h1 className='font-bold text-[24px] my-6'>{job_offer.title}</h1>

            <div className='flex w-full justify-center'>
              <Divider className='w-[90%] bg-default-100' />
            </div>

            <div className='mt-10 flex flex-col gap-4'>
              <h1 className="font-bold text-default-600 text-[20px]">Job Description</h1>
              <p className='text-small text-default-400 leading-[1.5] textju'>
                {job_offer.description}
              </p>
            </div>
            <Divider className='bg-default-100 my-6' />
          </div>



        </div>
      </div>
    </div>
  )
}

export default JobOffer