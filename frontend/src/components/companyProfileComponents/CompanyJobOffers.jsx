import React, { useEffect, useState } from 'react';
import JobCard from '../jobsComponents/JobCard';
import { getCompanyJobOffersCount, getSomeCompanyJobOffers } from '../../services/jobOfferServices';
import { Spinner, Button } from '@nextui-org/react';

function CompanyJobOffers(props) {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalJobOffers, setTotalJobOffers] = useState(0)
    const jobPerTime = 10

    useEffect(() => {
        getCompanyJobOffersCount(props.company_id, { company: props.company_id, job_status: true })
            .then((count) => setTotalJobOffers(count))
            .catch((err) => console.error(err));
    }, [])

    useEffect(() => {
        fetchJobs();
    }, [page]);

    const fetchJobs = () => {
        setLoading(true);
        getSomeCompanyJobOffers(
            props.company_id,
            {
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
            },
            ((page - 1) * jobPerTime), jobPerTime, { job_status: true })
            .then(response => {
                if (page != 1) setJobs(prevJobs => [...prevJobs, ...response])
                else {
                    setJobs(prevJobs => {
                        const prevJobIds = new Set(prevJobs.map(job => job._id));
                        const newJobs = response.filter(job => !prevJobIds.has(job._id));
                        return [...prevJobs, ...newJobs];
                    });

                }
                setLoading(false)
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            });
    };

    return (
        <div className='flex flex-col gap-8 my-6 mx-2 min-h-[500px] scrollbar-hide justify-center items-center' id='jobContainer'>
            {
                jobs.length === 0
                    ? <div>this company have no job Offers</div>
                    : <>
                        <div className={`${props.typeUser == "company" ? "grid sm:grid-cols-2 grid-cols-1 gap-6 gap-y-8 my-6 mb-14" : "flex flex-col gap-8"}`}>
                            {jobs.map(job => (
                                <JobCard key={job._id} job={{ ...job, company: [{ _id: props.company_id, company_name: props.company_name, city: props.city, country: props.country, company_photo: props.company_photo }] }} />
                            ))}
                        </div>
                        {loading ?
                            <div className='flex justify-center items-start mt-10'>
                                <Spinner size='lg' />
                            </div>
                            : totalJobOffers != jobs.length &&
                            <Button size="lg" className='w-fit self-center mt-8 shadow-xl' onClick={() => setPage(prevPage => prevPage + 1)}>
                                Load more
                            </Button>
                        }
                    </>
            }
        </div>
    );
}

export default CompanyJobOffers;
