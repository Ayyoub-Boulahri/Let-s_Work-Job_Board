import React from 'react'
import JobRequestsTable from "./JobRequestsTable"
import { Divider, Tabs, Tab } from "@nextui-org/react";

function JobRequestsHeader() {

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