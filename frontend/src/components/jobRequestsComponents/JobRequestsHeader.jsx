import React from 'react'
import JobRequestsTable from "./JobRequestsTable"
import mac from "../../assets/mac.png"
import GlovoApp from '../../assets/GlovoApp.png'
import WhatsApp from "../../assets/WhatsApp.jpg";
import apple from "../../assets/apple.jpg";
import { Divider, Tabs, Tab } from "@nextui-org/react";
import { useSelector } from 'react-redux';

function JobRequestsHeader() {
    const jobOffers = [
        {
            id: 1,
            companyName: "McDonald's",
            country: "United States",
            city: "New York",
            title: "Customer Service Representative",
            date_applayment: "17/01/2024",
            status: "In Progress",
            photo: mac
        },
        {
            id: 2,
            companyName: "Glovo",
            country: "Morocco",
            city: "Meknes",
            title: "Delivery Driver",
            date_applayment: "02/01/2024",
            status: "Accept",
            photo: GlovoApp
        },
        {
            id: 3,
            companyName: "Apple Inc.",
            country: "United States",
            city: "Cupertino",
            title: "Technical Support Specialist",
            date_applayment: "01/12/2024",
            status: "Rejected",
            photo: apple
        },
        {
            id: 4,
            companyName: "WhatsApp Inc.",
            country: "United States",
            city: "Menlo Park",
            title: "Software Engineer - Messaging Platform",
            date_applayment: "18/01/2024",
            status: "In Progress",
            photo: WhatsApp,
        }
    ]
    const authInfo = useSelector((state) => state.isAuthenticated.value);


    return (
        <div className='min-h-[450px]'>
            <h1 className='text-[30px] text-default-800 my-6'>Manage Requests</h1>
            <Tabs variant="light" aria-label="Tabs variants" className='w-[100%] md:overflow-auto overflow-x-scroll'>


                <Tab key="All" title="All" >
                    <Divider className='mb-6 mt-2' />
                    <JobRequestsTable condition={{}} />
                </Tab>


                <Tab key="Accepted" title="Accepted" >
                    <Divider className='mb-6 mt-2' />
                    <JobRequestsTable condition={{ "postulations.status": "Accept" }} />
                </Tab>


                <Tab key="In Progress" title="In progress" >
                    <Divider className='mb-6 mt-2' />
                    <JobRequestsTable condition={{ "postulations.status": "In Progress" }} />
                </Tab>


                <Tab key="Rejected" title="Rejected" >
                    <Divider className='mb-6 mt-2' />
                    <JobRequestsTable condition={{ "postulations.status": "Rejected" }} />
                </Tab>


                <Tab key="Open" title="Open jobs" >
                    <Divider className='mb-6 mt-2' />
                    <JobRequestsTable condition={{ job_status: true }} />
                </Tab>


                <Tab key="Closed" title="Closed jobs" >
                    <Divider className='mb-6 mt-2' />
                    <JobRequestsTable condition={{ job_status: false }} />
                </Tab>
            </Tabs>

        </div>
    )
}

export default JobRequestsHeader