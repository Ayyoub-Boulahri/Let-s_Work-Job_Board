import React from 'react'
import work_boy from '../../assets/work_boy.png';
import { Divider } from "@nextui-org/react";
import { MdAssignmentAdd } from "react-icons/md";
import DegreePopup from './DegreePopup';
import { Text, Box, Flex, Card } from '@radix-ui/themes';
import { FaUserGraduate } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useSelector } from 'react-redux';
import { removeEmployeeEducation } from '../../services/employeeServices';

function Degrees(props) {
  const authInfo = useSelector((state) => state.isAuthenticated.value);

  const handleRemoveEducation = async (id_education) => {
    const response = await removeEmployeeEducation(authInfo?.userId, id_education)
    if (response.status === 200)
      props.removeEducation(id_education)
  }
  return (
    <div>
      <div className='flex flex-col'>
        <div className='flex justify-between'>
          <div className='p-2 text-sm  text-[20px]'>
            <h1 className=' font-medium text-blue-600 dark:text-blue-500 '>Degrees</h1>
            <p className='mt-2'>Enhance your profile on <b>Let's Work</b> by updating your educational background and enriching your academic achievements.</p>
          </div>
          <img src={work_boy} alt="" className='w-32' />
        </div>
        <Divider className="my-4 " />
        <div className='mt-3 flex justify-end w-[100%]'>
          <DegreePopup addEducation={props.addEducation} />
        </div>
        <div className='grid md:grid-cols-2 grid-cols-1 gap-6 mt-5'>
          {props.userInfos.educations.map(education => (
            <Card key={education._id} className='w-full relative'>
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
              <div className='cursor-pointer absolute top-2 right-2 bg-[#27272A] p-2 rounded-full' onClick={() => handleRemoveEducation(education._id)}>
                <RiDeleteBin6Fill size={16} color='#9EB1FF' />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Degrees