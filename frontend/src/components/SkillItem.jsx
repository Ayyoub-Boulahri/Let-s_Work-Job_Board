import React from 'react'
import { MdOutlineDelete } from "react-icons/md";
import { useState } from 'react';
import { HiPlus } from "react-icons/hi2";

function SkillItem(props) {
    const [isHovered, setIsHovered] = useState(false);

    const handleDelete = () => {
        if (props.delete) {
            props.delete(props.skill);
        } 
    };

    return (
        <div className='pl-4 pr-4 pt-2 pb-2 bg-zinc-800 rounded-xl m-2'>
            <div
                className={`cursor-pointer skill-item flex duration-300`}
            >
                {props.skill}
                <div className="flex ml-2 align-middle items-center">
                    <HiPlus className="cursor-pointer rotate-45" onClick={handleDelete} />
                </div>
            </div>
        </div>
    );
}

export default SkillItem