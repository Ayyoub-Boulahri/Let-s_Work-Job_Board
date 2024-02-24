import React, { useEffect, useState } from 'react'
import mac from "../../assets/mac.png";
import JobCard from '../../components/jobsComponents/JobCard';
import WhatsApp from "../../assets/WhatsApp.jpg";
import apple from "../../assets/apple.jpg";
import { Pagination } from '@nextui-org/react';
import JobFilters from './JobFilters';
import { useQuery } from '@tanstack/react-query';
import { getSomeJobOffers, getTotalOpenJobOffers } from '../../services/jobOfferServices';
import { Spinner } from "@nextui-org/react";

function JobsList() {
    const [currentPage, setCurrentPage] = useState(1);
    const [visibleJobs, setVisibleJobs] = useState(null);
    const [totalPages, setTotalPages] = useState(1)
    const [isLoadingJobs, setIsLoadingJobs] = useState(true)

    const jobPerPage = 10;
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        window.scrollTo({ top: 400 });
    };


    useEffect(() => {
        const getJobOffers = async () => {
            try {
                getSomeJobOffers({
                    "_id": 1,
                    "company._id": 1,
                    "company.city": 1,
                    "company.country": 1,
                    "company.company_photo": 1,
                    "company.company_name": 1,
                    "title": 1,
                    "grade": 1,
                    "description": 1,
                    "job_type": 1,
                    "salary": 1,
                    "currency": 1,
                    "pay_period": 1,
                    "date_publication": 1,
                    "delais_depot": 1,
                    "job_status": 1,
                }, (currentPage - 1) * jobPerPage, jobPerPage).then(response => {
                    setVisibleJobs(response)
                    setIsLoadingJobs(false)
                }).catch(error => {
                    console.error(error);
                });
            } catch (error) {
                console.error(error)
            }
        }

        const getTotalJobs = async () => {
            try {
                getTotalOpenJobOffers().then(response => {
                    setTotalPages(Math.ceil(response / jobPerPage))
                }).catch(error => {
                    console.error(error);
                });
            } catch (error) {
                console.error(error)
            }
        }

        getTotalJobs()
        getJobOffers()

    }, [currentPage])

    return (
        <div>

            {isLoadingJobs
                ? <div className='h-[200px] flex justify-center items-start mt-10'>
                    <Spinner size='lg' />
                </div>
                : <>
                    <JobFilters />
                    <div className='flex items-center flex-col'>
                        <div className='grid sm:grid-cols-2 grid-cols-1 gap-6 gap-y-8 my-6 mb-14'>
                            {visibleJobs?.map((job) => (
                                <div key={job.id}>
                                    <JobCard job={job} />
                                </div>
                            ))}
                        </div>
                        <Pagination
                            total={totalPages}
                            current={currentPage}
                            onChange={handlePageChange}
                        />
                    </div>
                </>
            }
        </div>
    )
}

export default JobsList