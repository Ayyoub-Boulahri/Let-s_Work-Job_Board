import React, { useState } from 'react';
import { Divider } from "@nextui-org/react";
import SkillItem from '../SkillItem';
import { SiAddthis } from "react-icons/si";
import { PaginationItemType } from "@nextui-org/react";
import { addSkill, removeSkill } from '../../stores/signUpStore';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import searchSkills from '../../services/skillsServices';

function AddSkills(props) {
    const dispatch = useDispatch();
    const employeeData = useSelector((state) => state.employeeData.value);
    const [inputValue, setInputValue] = useState('');

    const { data: skills, isLoading: isLoadingSkills } = useQuery({
        queryKey: ["skills", inputValue],
        queryFn: () => searchSkills(inputValue)
    });

    const HandelAddSkill = () => {
        const item = skills?.filter((sk) => sk.skill === inputValue);
        if (inputValue !== "" && item.length > 0) {
            var isValid = true;
            employeeData.skills.forEach((item) => {
                if (item.toLowerCase() === inputValue.toLowerCase())
                    isValid = false;
            });
            if (isValid) {
                dispatch(addSkill({ skill: inputValue }));
                setInputValue('');
            }
        }
    }

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }

    const handelRemoveSkill = (skill) => {
        dispatch(removeSkill({ skill: skill }))
    }

    return (
        <div className="slideshow flex flex-col gap-2 min-h-[300px]">
            <p className="title py-4">My Skills</p>
            <div>
                <div className='input-group flex flex-col gap-2'>
                    <label>What are your Skills ? 🧑‍⚕️</label>
                    <div className='flex w-full gap-8 items-center'>
                        <input
                            list="skills"
                            name="skill"
                            id="skillTxt"
                            value={inputValue}
                            onChange={handleInputChange}
                        />

                        <datalist id="skills">
                            {skills?.map((sk, index) => <option key={index} value={sk.skill} />)}
                        </datalist>

                        <SiAddthis size={30} className='cursor-pointer mr-2' onClick={HandelAddSkill} />
                    </div>
                </div>
                <Divider className="my-4 bg-[#3D3D3D] sm:flex hidden" />
                <div className='min-h-[160px]'>
                    <div className='flex flex-wrap'>
                        {employeeData.skills.map((skillText, index) => (
                            <div key={index}>
                                <SkillItem skill={skillText} delete={handelRemoveSkill} />
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

export default AddSkills;
