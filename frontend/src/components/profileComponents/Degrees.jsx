import React from 'react'
import profile from '../../assets/work_boy.png';
import { Divider } from "@nextui-org/react";
import { MdAssignmentAdd } from "react-icons/md";
import DegreePopup from './DegreePopup';
import DegreeCard from './DegreeCard';
import { Text, Box, Flex, Card } from '@radix-ui/themes';
import { FaUserGraduate } from "react-icons/fa";

function Degrees(props) {
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
        <div className='mt-3 flex justify-end w-[100%]'>
          <DegreePopup />
        </div>
        <div className='grid md:grid-cols-2 grid-cols-1 gap-6 mt-5'>
          {props.userInfos.educations.map(education => (
              <Card key={education._id} className='w-full'>
                <Flex gap="3" align="center">
                <FaUserGraduate className="icon" size={26} />

                  <Box>
                    <Text as="div" size="3" weight="bold">
                      {education.degreeName}
                    </Text>
                    <Text as="div" size="2" color="gray">
                      {education.school}
                    </Text>
                    <Text as="div" size="2" color="primary">
                      {education.year}
                    </Text>
                  </Box>
                </Flex>
              </Card>
            ))}
        </div>
      </div>
    </div>
  )
}

export default Degrees