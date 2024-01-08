import React from 'react'
import { Divider } from "@nextui-org/react";
import SkillItem from '../SkillItem';
import { SiAddthis } from "react-icons/si";

function AddExperiences() {
    return (
        <div className="slideshow flex flex-col gap-2 min-h-[300px]">
            <p className="title py-4">My Experiences</p>
            <div>
                <div className='input-group flex flex-col gap-2'>
                    <label>Did you have any Experiences ? 🤔</label>
                    <div className='flex w-full gap-8 items-center'>
                        <input type="text" className='w-[150px]' />
                        <SiAddthis size={30} className='cursor-pointer mr-2' />
                    </div>
                </div>
                <Divider className="my-4 bg-[#3D3D3D] sm:flex hidden" />
                <div className='flex h-100 flex-wrap'>
                    <SkillItem skill="Css" />
                    <SkillItem skill="Html" />
                    <SkillItem skill="JavaScript" />
                    <SkillItem skill="Css" />
                </div>
            </div>
        </div>
    )
}

export default AddExperiences