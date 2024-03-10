import React from 'react'
import job1 from "../../assets/job1.svg"
import { Input } from "@nextui-org/react";
import { IoIosSearch } from "react-icons/io";

function JobsLeading(props) {
    return (
        <div className='w-full flex items-center flex-col pt-8'>
            <img src={job1} alt="" className='sm:w-[30%] w-[70%]' />
            <Input
                type="email" variant="bordered" placeholder='Serach a job' className='sm:w-[40%] w-[80%] mt-[-100px] bg-section-dark-bg bg-opacity-95'
                onChange={(e) => props.setSearchTxt(e.target.value)}
                endContent={
                    <button>
                        <IoIosSearch className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    </button>
                }
            />
        </div>
    )
}

export default JobsLeading