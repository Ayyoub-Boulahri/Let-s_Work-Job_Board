import React from 'react'
import { Divider } from "@nextui-org/react";
import SkillItem from '../SkillItem';
import { SiAddthis } from "react-icons/si";
import { PaginationItemType } from "@nextui-org/react";
import { addExperience, removeExperience } from '../../stores/signUpStore';
import { useDispatch, useSelector } from 'react-redux';

function AddExperiences(props) {
    const dispatch = useDispatch();
    const employeeData = useSelector((state) => state.employeeData.value);
    

    const HandelAddExperience = () => {
        const experienceInput = document.getElementById("experienceInput");
        if (experienceInput.value !== "") {
            var isValid = true;
            employeeData.experiences.forEach((item) => {
                if (item.toLowerCase() === experienceInput.value.toLowerCase())
                    isValid = false
            })
            if (isValid) {
                dispatch(addExperience({ experience: experienceInput.value }))
                experienceInput.value = "";
            }
        }
    }

    const handelRemoveExperience = (experience) => {
        dispatch(removeExperience({ experience: experience }))
    }

    return (
        <div className="slideshow flex flex-col gap-2 min-h-[300px]">
            <p className="title py-4">My Experiences</p>
            <div>
                <div className='input-group flex flex-col gap-2'>
                    <label>Did you have any Experiences ? 🤔</label>
                    <div className='flex w-full gap-8 items-center'>
                        <input id='experienceInput' type="text" className='w-[150px]' />
                        <SiAddthis size={30} className='cursor-pointer mr-2' onClick={HandelAddExperience}/>
                    </div>
                </div>
                <Divider className="my-4 bg-[#3D3D3D] sm:flex hidden" />
                <div className='min-h-[160px]'>
                    <div className='flex flex-col'>
                        {employeeData.experiences.map((experienceTxt, index) => (
                            <div key={index} className="w-fit">
                                <SkillItem skill={experienceTxt} delete={handelRemoveExperience}/>
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