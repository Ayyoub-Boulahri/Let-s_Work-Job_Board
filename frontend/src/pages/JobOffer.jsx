import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import styles from '../style';
import WhatsApp from "../assets/WhatsApp.jpg";
import "../css/card.css"
import { Button } from '@nextui-org/react';
import { MdWork } from "react-icons/md";
import JobOfferInfos from '../components/jobOfferComponents/JobOfferInfos';
import ApplyPopUp from '../components/jobOfferComponents/ApplyPopUp';
import { getJobofferById } from '../services/jobOfferServices';
import { formatDate } from '../services/convertFunctions';
import { Spinner } from "@nextui-org/react";
import "../css/height.css"

function JobOffer() {
  const { job_id } = useParams();
  const [jobOffer, setJobOffer] = useState(null)
  const navigate = useNavigate()
  const [isLoadingJobOffer, setIsLoadingJobOffer] = useState(true)
  useEffect(() => {
    const fetchData = async () => {
      getJobofferById(job_id)
        .then((response) => { setJobOffer(response.data.jobOffer[0]);  setIsLoadingJobOffer(false)})
        .catch((error) => console.log(error));
    }

    fetchData()
  }, [])


  return (
    <div className={`${styles.flexStart} ${styles.paddingX} bg-section-dark-bg md:pt-40 pt-28 xl:pb-4`}>
      <div className={`${styles.boxWidth} HeightTall`}>
        {
          isLoadingJobOffer ? <div className='flex justify-center items-start'><Spinner size='lg' /> </div>
          :
          <div className='flex md:flex-row-reverse flex-col gap-10'>

          <div className='flex flex-col gap-4 md:w-[30%] shadowCard bg-[#141414] p-4 h-fit md:sticky md:top-28'>
            <ApplyPopUp attachements={jobOffer?.attachements} jobId={jobOffer._id}/>
            <div className='flex justify-between'>
              <div className='flex flex-col items-start gap-2'>
                <p className='font-bold text-default-700'>Job Type</p>
                <p className='font-bold text-default-700'>Grade</p>
                <p className='font-bold text-default-700'>Date Posted</p>
                <p className='font-bold text-default-700'>DeadLine</p>
                <p className='font-bold text-default-700'>Salary</p>
              </div>

              <div className='flex flex-col items-end gap-2'>
                <p className='font-semibold text-default-400'>{jobOffer?.job_type}</p>
                <p className='font-semibold text-default-400'>{jobOffer?.grade}</p>
                <p className='font-semibold text-default-400'>{formatDate(jobOffer?.date_publication)}</p>
                <p className='font-semibold text-red-600'>{formatDate(jobOffer?.delais_depot)}</p>
                <p className='font-bold text-[18px] text-green-600'>{jobOffer?.salary} {jobOffer?.pay_currency} {jobOffer?.currency}/ {jobOffer?.pay_period}</p>
              </div>

            </div>
          </div>
          <JobOfferInfos job_offer={jobOffer} />
        </div>
        }
      </div>
    </div>
  )
}

export default JobOffer