import React from 'react'
import { RiListSettingsLine } from "react-icons/ri";

function JobFilters() {

    const options = [
        { value: "any", label: "Any time" },
        { value: "lastDay", label: "Last Day" },
        { value: "last3Days", label: "Last 3 days" },
        { value: "lastWeek", label: "Last Week" },
        { value: "last2Weeks", label: "Last 2 weeks" },
        { value: "lastMonth", label: "Last month" },
    ];
    return (
        <div className='flex mt-8 gap-4 items-center'>
            <div className='flex gap-4'>
                <select className='rounded-full px-4 py-1 bg-section-bright-bg cursor-pointer hover:bg-default-200 duration-300'>
                    <option value="" selected disabled>Date posted</option>
                    {options.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
                <div className='rounded-full px-4 py-1 bg-section-bright-bg cursor-pointer hover:bg-default-200 duration-300'>
                    Open Jobs
                </div>
                <div className='rounded-full px-4 py-1 bg-section-bright-bg cursor-pointer hover:bg-default-200 duration-300'>
                    Salary
                </div>
                <div className='rounded-full px-4 py-1 bg-section-bright-bg cursor-pointer hover:bg-default-200 duration-300'>
                    my location
                </div>
            </div>
            <RiListSettingsLine size={25} className="cursor-pointer hover:text-default-500 duration-300" />

        </div>
    )
}

export default JobFilters