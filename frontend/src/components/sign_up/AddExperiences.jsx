import React, { useState } from 'react'
import { Divider } from "@nextui-org/react";
import { SiAddthis } from "react-icons/si";
import { PaginationItemType } from "@nextui-org/react";
import { addExperience, removeExperience } from '../../stores/signUpStore';
import { useDispatch, useSelector } from 'react-redux';
import ExperienceItem from './ExperienceItem';
import { reverseDateFormat } from '../../services/convertFunctions';

function AddExperiences(props) {
    const dispatch = useDispatch();
    const employeeData = useSelector((state) => state.employeeData.value);
    const initialId = employeeData.experiences.length > 0 ? employeeData.experiences[employeeData.experiences.length - 1].id_experience + 1 : 1;
    const [newExperience, setNewExperience] = useState({
        id_experience: initialId,
        company: '',
        title: '',
        date_debut: '',
        date_fin: '',
        description: '',
    });

    const handleInputChange = (field, value) => {
        let formattedDate = value;

        if (/^\d{4}-\d{2}$/.test(value)) {
            const [year, month] = value.split("-");
            const date = new Date(`${year}-${month}-01`);
            formattedDate = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        }

        setNewExperience(prevState => ({
            ...prevState,
            [field]: formattedDate,
        }));
    };


    const handleAddExperience = () => {
        const filledFields = Object.keys(newExperience).filter((key) => newExperience[key] !== '');
        const experienceToAdd = {};
    
        filledFields.forEach((field) => {
            experienceToAdd[field] = newExperience[field];
        });
    
        if (Object.keys(experienceToAdd).length > 0) {
            dispatch(addExperience(experienceToAdd));
            setNewExperience((prevState) => ({
                ...prevState,
                id_experience: prevState.id_experience + 1,
                company: '',
                title: '',
                date_debut: '',
                date_fin: '',
                description: '',
            }));
        }
    };
    

    const handelRemoveExperience = (experienceId) => {
        dispatch(removeExperience({ id_experience: experienceId }));
    }

    return (
        <div className="slideshow flex flex-col gap-2 min-h-[300px]">
            <p className="title py-4">My Experiences</p>
            <div>
                <div className='input-group flex flex-col gap-2'>
                    <label>Did you have any Experiences ? 🤔</label>
                    <div className='flex w-full'>
                        <div className='flex flex-col w-full gap-2'>
                            <input
                                id='company'
                                type="text"
                                placeholder='company'
                                value={newExperience.company}
                                onChange={(e) => handleInputChange('company', e.target.value)}
                            />
                            <input
                                id='title'
                                type="text"
                                placeholder='title'
                                value={newExperience.title}
                                onChange={(e) => handleInputChange('title', e.target.value)}
                            />
                            <div className='flex gap-8'>
                                <input
                                    type="month"
                                    name="date_debut"
                                    placeholder='debut'
                                    value={reverseDateFormat(newExperience.date_debut)}
                                    onChange={(e) => handleInputChange('date_debut', e.target.value)}
                                />
                                <input
                                    type="month"
                                    name="date_fin"
                                    placeholder='fin'
                                    value={reverseDateFormat(newExperience.date_fin)}
                                    onChange={(e) => handleInputChange('date_fin', e.target.value)}
                                />
                            </div>
                            <textarea
                                name="description"
                                cols="30"
                                rows="5"
                                placeholder='Description'
                                value={newExperience.description}
                                onChange={(e) => handleInputChange('description', e.target.value)}
                            />
                            <SiAddthis size={30} className='cursor-pointer self-center' onClick={handleAddExperience} />
                        </div>
                    </div>
                </div>
                {employeeData.experiences.length > 0 && <Divider className="my-4 bg-[#3D3D3D] sm:flex hidden" />}
                <div>
                    <div className='flex flex-col gap-4'>
                        {employeeData.experiences.map((experience, index) => (
                            <div key={index} className="w-full">
                                <ExperienceItem experience={experience} deleteExperience={handelRemoveExperience} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='mt-6'>
                <ul className="flex gap-2 items-center justify-center">
                    {props.pagination.range.map((page) => {
                        if (page !== PaginationItemType.NEXT && page !== PaginationItemType.PREV && page !== PaginationItemType.DOTS) {
                            return (
                                <li key={page} aria-label={`page ${page}`}>
                                    <button
                                        className={`w-3 h-3 bg-default-300 rounded-full ${props.pagination.activePage === page ? 'bg-rose-500' : ''}`}
                                    />
                                </li>
                            );
                        }
                    })}
                </ul>
            </div>

            <div className='flex justify-end gap-4 mt-4'>
                <button onClick={props.pagination.onPrevious} className='font-semibold bg-rose-600 px-4 py-2 rounded-md'>Back</button>
                <button type='submit' onClick={props.pagination.onNext} className="bg-[#0099FF] font-semibold px-4 py-2 rounded-md">
                    Next
                </button>
            </div>
        </div>
    )
}

export default AddExperiences