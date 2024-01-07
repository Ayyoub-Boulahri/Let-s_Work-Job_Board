import React from 'react';
import profile from '../assets/work_boy.png';
import { Divider } from "@nextui-org/react";
import { MdEdit, MdOutlineDelete } from "react-icons/md";
import '../css/animation.css'
import { MdOutlinePlaylistAdd } from "react-icons/md";

function ExperiencesSkills() {
    const List = [
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

    return (
        <div className='flex flex-col'>
            <div className='flex'>
                <div className='p-2 text-sm h-[30%]'>
                    <h1 className=' font-medium text-blue-600 dark:text-blue-500 '>Profile</h1>
                    <p className='mt-2'>Optimisez votre expérience sur <b>let's work</b> en mettant à jour vos données professionnelles</p>
                </div>
                <span>
                    <img src={profile} alt="" className='w-32' />
                </span>
            </div>
            <Divider className="my-4 " />
            <div className='flex justify-between mt-4'>
                <div>
                    <h1>Skills</h1>
                </div>
                <div>
                <MdOutlinePlaylistAdd />
                </div>
            </div>
            <div className='flex flex-wrap mt-3'>
                {List.map(tab => (
                    <div key={tab.id} className='pl-4 pr-4 pt-2 pb-2 bg-zinc-800 rounded-xl m-2'>
                        <SkillItem skill={tab.skill} />
                    </div>
                ))}
            </div>
            <Divider className="my-4" />
        </div>
    );
}

const SkillItem = ({ skill }) => {
    const [isHovered, setIsHovered] = React.useState(false);

    return (
        <div
            className={`cursor-pointer skill-item ${isHovered ? 'w-[120%]' : ''} flex duration-300`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {skill}
            {isHovered && (
                <div className="flex ml-2 align-middle items-center">
                    <MdOutlineDelete className="mr-2 cursor-pointer " />
                    <MdEdit className="cursor-pointer" />
                </div>
            )}
        </div>
    );
};

export default ExperiencesSkills;
