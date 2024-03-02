import React, { useEffect } from 'react'
import styles from '../style'
import { Avatar, Divider, Spinner, Button } from "@nextui-org/react";
import Profile from '../assets/profile.png'
import { MdOutlineMailOutline } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router-dom';
import Markdown from 'react-markdown'
import { useState } from 'react';
import handleLogout from '../services/handleLogout';
import { useDispatch } from 'react-redux';
import { setLoginOut } from '../stores/authStore';
import "../css/height.css"
import { getEmployeeById } from '../services/employeeServices';
import { convertBufferToDataURL, formatDate } from '../services/convertFunctions';
import { FaWhatsapp } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaBirthdayCake } from "react-icons/fa";
import CvModel from '../components/ProfileEmployeeComponent/CvModel';

function ProfileEmployee() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { employee_id } = useParams()
  const [employeeInfos, setEmployeeInfos] = useState(null)
 

  useEffect(() => {
    const typeUser = localStorage.getItem('typeUser');
    if (typeUser != "company") {
      handleLogout();
      dispatch(setLoginOut());
      navigate("/");
    }

    const getEmployee = async () => {
      getEmployeeById(employee_id).then((response) => {
        const educations = response.educations.sort((a, b) => b.year - a.year);
        response.educations = educations;
        setEmployeeInfos(response)
      })
    }

    getEmployee()

  }, [])

  if (!employeeInfos) {
    return (
      <div className={`${styles.flexStart} ${styles.paddingX} bg-section-dark-bg pt-20 xl:pb-4`}>
        <div className={`${styles.boxWidth} HeightTall mt-6`}>
          <div className='flex justify-center items-start'><Spinner size='lg' /></div>
        </div>
      </div>
    )
  }

  return (
    <div className={`${styles.flexStart} ${styles.paddingX} bg-section-dark-bg pt-20 xl:pb-4`}>
      <div className={`${styles.boxWidth} HeightTall`}>
        <div className='my-[12px] p-4 rounded-md'>
          <div className='flex md:flex-row flex-col w-[100%]'>
            <div className='md:w-[20%] p-5 flex flex-col gap-6 items-center'>
              <Avatar isBordered color="primary" src={convertBufferToDataURL(employeeInfos.profilePhoto)} className="w-[160px] h-[160px] sticky" />
              <div className='flex flex-col gap-2'>
                <h1 className='font-bold text-default-600 text-[22px] text-center'>
                  {employeeInfos.first_name} {employeeInfos.last_name}
                </h1>
                <a href={"mailTo:" + employeeInfos.email} target='_blank'>
                  <h1 className='font-semibold text-default-400 text-center flex gap-2 items-center'>
                    <MdOutlineMailOutline size={18} />
                    {employeeInfos.email}
                  </h1>
                </a>
                <a href={"https://wa.me/" + employeeInfos.phone.replace(/\D/g, "")} target='_blank'>
                  <h1 className='font-semibold text-default-400 text-center flex gap-2 items-center mt-2'>
                    <FaWhatsapp size={20} />
                    {employeeInfos.phone}
                  </h1>
                </a>

                <h1 className='font-semibold text-default-400 text-center flex gap-2 items-center mt-2'>
                  <FaLocationDot size={16} />
                  {employeeInfos.city} ({employeeInfos.country})
                </h1>

                <h1 className='font-semibold text-default-400 text-center flex gap-2 items-center mt-2'>
                  <FaBirthdayCake size={16} />
                  {formatDate(employeeInfos.date_of_birth)}
                </h1>
                <CvModel first_name={employeeInfos.first_name} last_name={employeeInfos.last_name} cv={employeeInfos.cv}/>

              </div>
            </div>

            <Divider orientation="vertical" className='h-100 ml-6 md:flex hidden' />

            <div className='md:px-6 px-2 py-4 md:pl-10 md:w-[80%]'>
              <div>
                {/* About */}
                <div>
                  <h1 className="font-bold text-default-600 text-[20px]">About</h1>
                  <p className="text-small text-default-400 leading-[1.6]" style={{ textIndent: "30px" }}>
                    {employeeInfos.about}
                  </p>
                </div>


                <Divider className='my-4' />

                {/* Educations */}

                <div className='mt-2 flex flex-col gap-4'>
                  <h1 className="font-bold text-default-600 text-[20px]">Educations</h1>
                  {
                    employeeInfos.educations.map((education, index) => (
                      <div className='flex gap-6' key={index}>
                        <h2 className="text-default-400 font-bold">{education.year}</h2>
                        <div>
                          <h3 className='text-default-700 font-bold'>{education.degreeName}</h3>
                          <h1 className='text-default-400'>{education.school}</h1>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
              <Divider className='my-4' />

              {/* Skills */}

              <div className='flex flex-col gap-2  my-6'>
                <h1 className="font-bold text-default-600 text-[20px]">Skills</h1>
                <div className='flex gap-3 flex-wrap'>

                  {
                    employeeInfos.skills.map(skill => (
                      <div className="bg-zinc-800 text-white rounded-lg p-3 px-6">
                        <h2 className="text-xs font-bold">{skill}</h2>
                      </div>
                    ))
                  }
                </div>
              </div>

              <Divider className='my-4' />

              {/* Experiences */}

              <h1 className="font-bold text-default-600 text-[20px] mb-4">Experiences</h1>
              <div className='flex flex-col gap-4'>
                {
                  employeeInfos.experiences.map(experience => (
                    <div className="bg-default-50 text-white rounded-lg p-4 flex flex-col gap-2">
                      <h2 className="text-xl font-bold">{experience.title}</h2>
                      <p className="text-gray-300 font-semibold">{experience.company}</p>
                      {(experience.date_debut || experience.date_fin) && <p className="text-gray-400 font-semibold text-small">{experience.date_debut} - {experience.date_fin}</p>}
                      {experience.description && <p className="text-gray-500 text-small">{experience.description}</p>}
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ProfileEmployee