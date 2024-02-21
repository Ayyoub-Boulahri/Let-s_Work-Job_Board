import React, { useState } from 'react';
import profile from '../../assets/work_boy.png';
import { Divider, Input } from "@nextui-org/react";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import SkillItem from '../SkillItem';
import { MdAddCircle } from "react-icons/md";
import { Select, SelectItem, Button } from "@nextui-org/react";
import { MdAddBox } from "react-icons/md";
import ExperienceItem from '../sign_up/ExperienceItem';
import { useQuery } from '@tanstack/react-query';
import searchSkills from '../../services/skillsServices';
import { addEmployeeSkill, removeEmployeeExperience } from '../../services/employeeServices';
import { useSelector } from 'react-redux';
import ExperiencePopup from './ExperiencePopup';
import { RiDeleteBin6Fill } from "react-icons/ri";

function ExperiencesSkills(props) {

    const [isSkillsTextFieldVisible, setSkillsTextFieldVisible] = useState(false);
    const [skillInputValue, setSkillInputValue] = useState('');

    const authInfo = useSelector((state) => state.isAuthenticated.value);


    const { data: skills, isLoading: isLoadingSkills } = useQuery({
        queryKey: ["skills", skillInputValue],
        queryFn: () => searchSkills(skillInputValue)
    });
    const handleSkillsButtonClick = () => {
        setSkillsTextFieldVisible(!isSkillsTextFieldVisible);
    };

    const handleInputChange = (e) => {
        setSkillInputValue(e.target.value);
    }

    const handleAddSkill = async () => {
        const item = skills?.filter((sk) => sk.skill === skillInputValue);
        if (skillInputValue !== "" && item.length > 0) {
            var isValid = true;
            props.userInfos.skills.forEach((item) => {
                if (item.toLowerCase() === skillInputValue.toLowerCase())
                    isValid = false;
            });
            if (isValid) {
                const response = await addEmployeeSkill(authInfo?.userId, skillInputValue)
                if (response.status === 200) {
                    props.addSkill(skillInputValue)
                    setSkillInputValue('');
                }
            }
        }
    }

    const handleRemoveExperience = async (id_exp) => {
        const response = await removeEmployeeExperience(authInfo?.userId, id_exp);
        if (response.status === 200) {
            props.removeExperience(id_exp)
        }
    }

    return (
        <div className='flex flex-col'>
            <div className='flex justify-between'>
                <div className='p-2 text-sm text-[20px]'>
                    <h1 className=' font-medium text-blue-600 dark:text-blue-500 '>Achivements</h1>
                    <p className='mt-2'>Améliorez votre présence sur <b>let's work</b> en mettant à jour vos compétences et en enrichissant votre parcours professionnel.</p>
                </div>
                <img src={profile} alt="" className='w-32' />

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
                <div className='mt-4 flex gap-4 items-center ml-2'>
                    <Input onChange={handleInputChange} placeholder='enter your skill and find it' list="skills" size='sm' id="skillInput" value={skillInputValue} className='md:w-[50%]' />
                    <datalist id="skills">
                        {skills?.map((sk, index) => <option key={index} value={sk.skill} />)}
                    </datalist>
                    <MdAddBox onClick={handleAddSkill} size={36} className='hover:text-default-500 duration-300 cursor-pointer' />

                </div>
            )}
            <div className='flex flex-wrap mt-3'>
                {props.userInfos.skills.map((skill, index) => (
                    <div key={index}>
                        <SkillItem skill={skill} delete={props.removeSkill} removeFromDb={true} />
                    </div>
                ))}
            </div>
            <Divider className="my-4" />
            <div className='flex justify-between mt-4'>
                <div className='text-gray-500 text-[20px] font-bold '>
                    <h1>Experiences</h1>
                </div>
                <div>
                    <ExperiencePopup addExperience={props.addExperience} />
                </div>
            </div>
            <div className='flex flex-wrap flex-col gap-4 mt-3'>
                {props.userInfos.experiences.map((experience, index) => (
                    <div key={index}>
                        <div className="bg-default-50 text-white relative rounded-lg p-4 flex flex-col gap-2">
                            <h2 className="text-xl font-bold">{experience.title}</h2>
                            <p className="text-gray-300 font-semibold">{experience.company}</p>
                            {(experience.date_debut || experience.date_fin) && <p className="text-gray-400 font-semibold text-small">{experience.date_debut} - {experience.date_fin}</p>}
                            {experience.description && <p className="text-gray-500 text-small">{experience.description}</p>}
                            <div className='cursor-pointer absolute top-2 right-2 bg-[#27272A] p-2 rounded-full' onClick={() => handleRemoveExperience(experience._id)}>
                                <RiDeleteBin6Fill size={20} color='#E11D48' />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ExperiencesSkills;
