import React from 'react'
import { useParams } from 'react-router-dom';
import styles from '../style';
import WhatsApp from "../assets/WhatsApp.jpg";
import "../css/card.css"
import { Button } from '@nextui-org/react';
import { MdWork } from "react-icons/md";
import JobOfferInfos from '../components/jobOfferComponents/JobOfferInfos';
import ApplyPopUp from '../components/jobOfferComponents/ApplyPopUp';

function JobOffer() {
  const { job_id } = useParams();
  
  const job_offer = {
    id: job_id,
    title: "Senior Software Engineer - Exciting Opportunity at WhatsApp",
    company: {
      companyName: "WhatsApp",
      followers: "2.5k",
      country: "United States",
      city: "San Francisco",
      size: "+1000 employees",
      industry: "Technology",
      founded_year: "2005",
      email: "WhatsApp@gmail.com",
      Phone: "+212 0562311526",
      address: "n 114 zitone merjan"
    },
    date_posted: "2024-01-17",
    date_delais: "2024-02-15",
    offer_status: "Open",
    salary: 80000,
    pay_period: "yr",
    description: "Join the McDonald's team as a Customer Service Representative and be a part of the world's leading fast-food restaurant chain. At McDonald's, we are committed to providing exceptional service and creating a positive dining experience for our customers.\n\nAs a Customer Service Representative, you will play a crucial role in ensuring customer satisfaction by taking orders, processing payments, and providing friendly assistance. This position offers a dynamic and fast-paced work environment, making it an ideal opportunity for individuals who thrive in customer-focused roles.\n\nQualifications:\n- Previous experience in customer service is a plus.\n- Excellent communication and interpersonal skills.\n- Ability to work in a fast-paced environment.\n- Flexibility to work various shifts, including evenings and weekends.\n- Enthusiastic and positive attitude.\n\nJoin the McDonald's family and contribute to our commitment to quality, service, and cleanliness. If you are passionate about delivering excellent customer service and enjoy working in a team-oriented atmosphere, we invite you to apply for this exciting opportunity.\n\nApply now and become a valuable member of the McDonald's team!",
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
      "Resume",
      "Cover Letter",
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
    <div className={`${styles.flexStart} ${styles.paddingX} bg-section-dark-bg md:pt-40 pt-28 xl:pb-4`}>
      <div className={`${styles.boxWidth}`}>
        <div className='flex md:flex-row-reverse flex-col gap-10'>

          <div className='flex flex-col gap-4 md:w-[30%] shadowCard bg-[#141414] p-4 h-fit md:sticky md:top-28'>
            <ApplyPopUp attachements={job_offer.attachements} />
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

          <JobOfferInfos job_offer={job_offer} />
        </div>
      </div>
    </div>
  )
}

export default JobOffer