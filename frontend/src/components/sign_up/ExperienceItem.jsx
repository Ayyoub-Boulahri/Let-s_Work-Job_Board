import React from 'react'
import { RiDeleteBin6Fill } from "react-icons/ri";

function ExperienceItem(props) {
  return (
    <div className='bg-[#18181B] rounded-md px-4 py-2 w-full relative'>
        {props.experience.title && <p className="font-bold text-default-600">{props.experience.title}</p>}
        {props.experience.company && <p className="font-bold text-default-400 text-sm">{props.experience.company}</p>}
        <p className="font-bold text-small text-default-600">{props.experience.date_debut ? props.experience.date_debut : props.experience.date_fin && "------"} {props.experience.date_fin ? " - " + props.experience.date_fin : ""}</p>
        {props.experience.description && <p className='text-small text-default-400'>{props.experience.description}</p>}
        <div className='absolute top-0 mt-[-10px] right-0 bg-[#27272A] p-2 rounded-full'>
            <RiDeleteBin6Fill className='cursor-pointer' color='#E11D48' size={16} onClick={() => props.deleteExperience(props.experience.id_experience)}/>
        </div>
    </div>
  )
}

export default ExperienceItem