import React, { useEffect, useState } from 'react';
import { RiListSettingsLine } from "react-icons/ri";
import FilterPopUp from "./FilterPopUp";
import { datePostedOptions } from '../../schemas/data';
import { getEmployeeInfos } from '../../services/employeeServices';
import { useSelector } from 'react-redux';

function JobFilters(props) {
    const [selectedFilters, setSelectedFilters] = useState([]);
    const authInfo = useSelector((state) => state.isAuthenticated.value);
    const [city, setCity] = useState("");

    useEffect(() => {
        getEmployeeInfos(authInfo?.userId, { city: 1 })
            .then((response) => setCity(response[0].city))
            .catch((response) => setCity(""))
    }, []);


    const handleMyLocationFilters = (filter, value) => {
        props.setFilters(prevFilters => {
            if (prevFilters.hasOwnProperty(filter) && prevFilters[filter] == city) {
                const { [filter]: removedFilter, ...remainingFilters } = prevFilters;
                return remainingFilters;
            } else {
                return {
                    ...prevFilters,
                    [filter]: value
                };
            }
        });
    };

    const handleDatePostedChange = (event) => {
        const selectedValue = event.target.value;
        let dateValue;

        switch (selectedValue) {
            case "lastDay":
                dateValue = calculateDate(-1);
                break;
            case "lastWeek":
                dateValue = calculateDate(-7);
                break;
            case "last2Weeks":
                dateValue = calculateDate(-14);
                break;
            case "lastMonth":
                dateValue = calculateDate(-30);
                break;
            default:
                dateValue = null; // For "any" or other cases
        }

        if (dateValue == null) {
            props.setFilters(prevFilters => {
                const { date_publication, ...remainingFilters } = prevFilters;
                return remainingFilters;
            });
        } else {
            props.setFilters(prevFilters => {
                return {
                    ...prevFilters,
                    "date_publication": dateValue,
                }
            })
        }
    };

    const calculateDate = (daysAgo) => {
        const lastDate = new Date();
        lastDate.setDate(lastDate.getDate() + daysAgo);
        lastDate.setHours(0, 0, 0, 0);
        return lastDate.toISOString();
    };

    return (
        <div className='flex mt-8 gap-4 items-center'>
            <div className='flex gap-4 overflow-x-auto max-w-full'>
                {console.log(props.filters)}
                <select
                    className='rounded-full text-[10px] sm:text-[18px] px-4 py-1 bg-section-bright-bg cursor-pointer hover:bg-default-200 duration-300'
                    onChange={handleDatePostedChange}
                >
                    <option value="" selected disabled>Date posted</option>
                    {datePostedOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
                <div
                    className={`rounded-full text-[10px] min-w-fit sm:text-[16px] px-4 py-1 cursor-pointer duration-300 ${props.filters["company.city"] == city ? 'bg-blue-600 hover:bg-blue-800' : 'bg-section-bright-bg hover:bg-default-200'}`}
                    onClick={() => { handleMyLocationFilters("company.city", city) }}
                >
                    My Location
                </div>
            </div>
            <FilterPopUp filters={props.filters} setFilters={props.setFilters} />
        </div>
    );
}

export default JobFilters;
