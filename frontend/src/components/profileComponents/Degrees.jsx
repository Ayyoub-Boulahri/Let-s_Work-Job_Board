import React from 'react'
import profile from '../../assets/work_boy.png';
import { Divider } from "@nextui-org/react";
import { MdAssignmentAdd } from "react-icons/md";
import DegreePopup from './DegreePopup';
import DegreeCard from './DegreeCard';

function Degrees() {
    const degreeData = [
        {
          ID_DEGREE: 1,
          CIN: "ABC123",
          DEGREE_NAME: "Bachelor of Arts",
          ECOLE_NAME: "University A",
          YEAR_GRADUATED: 2020,
        },
        {
          ID_DEGREE: 2,
          CIN: "DEF456",
          DEGREE_NAME: "Master of Science",
          ECOLE_NAME: "College B",
          YEAR_GRADUATED: 2019,
        },
        {
          ID_DEGREE: 3,
          CIN: "GHI789",
          DEGREE_NAME: "PhD in Physics",
          ECOLE_NAME: "Institute C",
          YEAR_GRADUATED: 2022,
        },
        {
          ID_DEGREE: 4,
          CIN: "JKL012",
          DEGREE_NAME: "Associate Degree",
          ECOLE_NAME: "School D",
          YEAR_GRADUATED: 2018,
        },
        {
          ID_DEGREE: 5,
          CIN: "MNO345",
          DEGREE_NAME: "Bachelor of Science",
          ECOLE_NAME: "University E",
          YEAR_GRADUATED: 2021,
        },
      ];
  return (
    <div>
        <div className='flex flex-col'>
            <div className='flex'>
                <div className='p-2 text-sm h-[30%] text-[20px]'>
                    <h1 className=' font-medium text-blue-600 dark:text-blue-500 '>Degrees</h1>
                    <p className='mt-2'>Enhance your profile on <b>Let's Work</b> by updating your educational background and enriching your academic achievements.</p>
                </div>
                <span className='w-[40%]'> 

                    <img src={profile} alt="" className='w-32' />

                </span>
            </div>
            <Divider className="my-4 " />
            <div className='mt-3 flex justify-end w-[90%]'> 
                <DegreePopup/>
            </div>
            <div className='flex flex-wrap mt-5 justify-center'>
                {degreeData.map(tab=>{
                    return <DegreeCard name={tab.DEGREE_NAME} place={tab.ECOLE_NAME} year={tab.YEAR_GRADUATED}/>
                })}
            </div>
        </div>
    </div>
  )
}

export default Degrees