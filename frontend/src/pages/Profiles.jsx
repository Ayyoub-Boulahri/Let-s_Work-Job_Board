import React, { useEffect } from 'react'
import styles from '../style'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Profile from '../assets/profile.png'
import ProfileList from '../components/profilesComponents/ProfileList';
import handleLogout from '../services/handleLogout';
import { useDispatch } from 'react-redux';
import { setLoginOut } from '../stores/authStore';
import "../css/height.css"

function Profiles() {
    const [selectedFilters, setSelectedFilters] = useState([]);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        const typeUser = localStorage.getItem('typeUser');
        if (typeUser != "company") {
            handleLogout();
            dispatch(setLoginOut());
            navigate("/");
        }
    }, [])
    
    const sampleProfile = {
        img: Profile,
        name: 'John Doe',
        city: 'New York',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam condimentum enim vel massa tincidunt, ac convallis dolor ultrices.',
        email: 'john.doe@example.com'
    };
    const options = [
        { value: "any", label: "Any time" },
        { value: "lastDay", label: "Last Day" },
        { value: "last3Days", label: "Last 3 days" },
        { value: "lastWeek", label: "Last Week" },
        { value: "last2Weeks", label: "Last 2 weeks" },
        { value: "lastMonth", label: "Last month" },
    ];

    const toggleFilter = (filter) => {
        if (selectedFilters.includes(filter)) {
            setSelectedFilters(selectedFilters.filter((item) => item !== filter));
        } else {
            setSelectedFilters([...selectedFilters, filter]);
        }
    };


    return (
        <div className={`${styles.flexStart} ${styles.paddingX} bg-section-dark-bg pt-20 xl:pb-4`}>
            <div className={`${styles.boxWidth} HeightTall`}>
                <div>
                    <div className='flex mt-8 gap-4 items-center'>
                        <div className='flex gap-4 overflow-x-auto max-w-full'>
                            <select
                                className='rounded-full text-[10px] sm:text-[18px] px-4 py-1 bg-section-bright-bg cursor-pointer hover:bg-default-200 duration-300'
                            >
                                <option value="" selected disabled>Date posted</option>
                                {options.map(option => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                            <div
                                className={`rounded-full text-[10px] min-w-fit sm:text-[18px] px-4 py-1 cursor-pointer duration-300 ${selectedFilters.includes('Open Jobs') ? 'bg-blue-600 hover:bg-blue-800' : 'bg-section-bright-bg hover:bg-default-200'}`}
                                onClick={() => toggleFilter('Open Jobs')}
                            >
                                Open Jobs
                            </div>
                            <div
                                className={`rounded-full text-[10px] min-w-fit sm:text-[18px] px-4 py-1 cursor-pointer duration-300 ${selectedFilters.includes('Salary') ? 'bg-blue-600 hover:bg-blue-800' : 'bg-section-bright-bg hover:bg-default-200'}`}
                                onClick={() => toggleFilter('Salary')}
                            >
                                Salary
                            </div>
                            <div
                                className={`rounded-full text-[10px] min-w-fit sm:text-[16px] px-4 py-1 cursor-pointer duration-300 ${selectedFilters.includes('My Location') ? 'bg-blue-600 hover:bg-blue-800' : 'bg-section-bright-bg hover:bg-default-200'}`}
                                onClick={() => toggleFilter('My Location')}
                            >
                                My Location
                            </div>
                        </div>

                    </div>
                </div>
                <ProfileList />
            </div>
        </div>
    )
}

export default Profiles