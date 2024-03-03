import React from 'react'
import { Divider, Tabs, Tab, Button } from "@nextui-org/react";
import JobListsTable from './JobListsTable';
import { FaPlus } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

function JobListingsHeader() {
    const jobOffers = [
        {
            id: 1,
            title: "Customer Service Representative",
            date_poste: "17/01/2024",
            Deadline: "17/01/2024",
            nbCondidat: 32,
            status: "Open",
        },
        {
            id: 2,
            title: "Delivery Driver",
            date_poste: "02/01/2024",
            Deadline: "17/01/2024",
            status: "close",
            nbCondidat: 57,
        },
        {
            id: 3,
            title: "Technical Support Specialist",
            date_poste: "01/12/2024",
            Deadline: "17/01/2024",
            status: "Open",
            nbCondidat: 100,
        },
        {
            id: 4,
            title: "Software Engineer - Messaging Platform",
            date_poste: "18/01/2024",
            Deadline: "17/01/2024",
            status: "Open",
            nbCondidat: 126
        }
    ]

    const navigate = useNavigate()
    return (
        <div className='min-h-[450px]'>
            <h1 className='text-[30px] text-default-800 my-6'>Manage Job Offers</h1>
            <Tabs variant="light" aria-label="Tabs variants">
                <Tab key="All" title="All" >
                    <Divider className='mb-6 mt-2' />
                    <JobListsTable jobOffers={jobOffers} condition={{}} />
                </Tab>
                <Tab key="Accepted" title="Opens" >
                    <Divider className='mb-6 mt-2' />
                    <JobListsTable jobOffers={jobOffers.filter(j => j.status === "Open")} condition={{ job_status: true }} />
                </Tab>
                <Tab key="In Progress" title="Closed" >
                    <Divider className='mb-6 mt-2' />
                    <JobListsTable jobOffers={jobOffers.filter(j => j.status === "close")} condition={{ job_status: false }} />
                </Tab>
            </Tabs>

            <button onClick={() => {navigate("/newOffer")}} className="rounded-full w-[50px] h-[50px] bg-primary-500 flex justify-center items-center fixed bottom-10 right-20">
                <FaPlus size={20}/>
            </button>
        </div>
    )
}

export default JobListingsHeader