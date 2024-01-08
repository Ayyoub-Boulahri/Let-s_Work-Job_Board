import React, { useState } from 'react';
import profile from '../../assets/work_boy.png';
import { Divider } from "@nextui-org/react";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import SkillItem from '../SkillItem';
import { MdAddCircle } from "react-icons/md";

function ExperiencesSkills() {
    const Skills = [
        {
            id: 1,
            skill: "c++"
        },
        {
            id: 2,
            skill: "java"
        },
        {
            id: 3,
            skill: "javascript"
        },
        {
            id: 4,
            skill: "python"
        },
        {
            id: 5,
            skill: "react"
        },
        {
            id: 6,
            skill: "html"
        },
        {
            id: 7,
            skill: "css"
        }
    ];


    const Experiences = [
        // ... (unchanged)
    ];

    const [isSkillsTextFieldVisible, setSkillsTextFieldVisible] = useState(false);
    const [isExperiencesTextFieldVisible, setExperiencesTextFieldVisible] = useState(false);

    const handleSkillsButtonClick = () => {
        setSkillsTextFieldVisible(!isSkillsTextFieldVisible);
    };

    const handleExperiencesButtonClick = () => {
        setExperiencesTextFieldVisible(!isExperiencesTextFieldVisible);
    };

    return (
        <div className='flex flex-col'>
            <div className='flex'>
                <div className='p-2 text-sm h-[30%] text-[20px]'>
                    <h1 className=' font-medium text-blue-600 dark:text-blue-500 '>Achivements</h1>
                    <p className='mt-2'>Améliorez votre présence sur <b>let's work</b> en mettant à jour vos compétences et en enrichissant votre parcours professionnel.</p>
                </div>
                <span className='w-[40%]'> 

                    <img src={profile} alt="" className='w-32' />

                </span>
            </div>
            <Divider className="my-4 " />
            <div className='flex justify-between mt-4'>
                <div className='text-gray-500 text-[20px] font-bold'>
                    <h1>Skills</h1>
                </div>
                <div>
                    <button onClick={handleSkillsButtonClick} className="hover:text-blue-500">
                        <MdOutlinePlaylistAdd size={25} />
                    </button>
                </div>
            </div>
            {/* the div that has the form of adding a skill */}
            {isSkillsTextFieldVisible && (
                <div className='mt-3 flex'>
                    <input type="text "  className='rounded-md'/>
                    <div className='flex items-center m-1 bg-transparent'>
                    <MdAddCircle />
                    </div>
                </div>
            )}
            <div className='flex flex-wrap mt-3'>
                {Skills.map(tab => (
                    <div key={tab.id}>
                        <SkillItem skill={tab.skill} />
                    </div>
                ))}
            </div>
            <Divider className="my-4" />
            <div className='flex justify-between mt-4'>
                <div className='text-gray-500 text-[20px] font-bold '> 
                    <h1>Experiences</h1>
                </div>
                <div>
                    <button onClick={handleExperiencesButtonClick} className="hover:text-blue-500">
                        <MdOutlinePlaylistAdd size={25} />
                    </button>
                </div>
            </div>
            {/* the div that has the form of adding an experience */}
            {isExperiencesTextFieldVisible && (
                <div className='mt-3 flex'>
                <input type="text "  className='rounded-md'/>
                <div className='flex items-center m-1 bg-transparent'>
                <MdAddCircle />
                </div>
            </div>
            )}
            <div className='flex flex-wrap mt-3'>
                {Experiences.map(tab => (
                    <div key={tab.id}>
                        <SkillItem skill={tab.Experience} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ExperiencesSkills;
