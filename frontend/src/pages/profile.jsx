import React, { useState, useEffect } from 'react';
import PersonnelInfos from '../components/profileComponents/PersonnelInfos';
import LoginInfos from '../components/profileComponents/LoginInfos';
import styles from '../style';
import "../css/profile.css";
import { Avatar, Divider, Spinner, Button } from "@nextui-org/react";
import profile from '../assets/profile.png';
import { PiAddressBookThin } from "react-icons/pi";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { GrAchievement } from "react-icons/gr";
import { FaBook } from "react-icons/fa";
import ExperiencesSkills from '../components/profileComponents/ExperiencesSkills';
import { useSelector } from 'react-redux';
import Degrees from '../components/profileComponents/Degrees';
import { getEmployeeByEmail, updateProfilePhoto } from '../services/employeeServices';
import { useNavigate } from 'react-router-dom';
import handleLogout from '../services/handleLogout';
import { useDispatch } from 'react-redux';
import { setLoginOut } from '../stores/authStore';
import { convertBufferToDataURL, fileToBase64 } from '../services/convertFunctions';
import { MdEdit } from "react-icons/md";
import { TbFileCv } from "react-icons/tb";
import MyCV from '../components/profileComponents/MyCV';
import "../css/height.css"

function Profile() {
  const [indexTab, setindexTab] = useState(1);
  const [myInfos, setMyInfos] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [profilePhoto, setProfilePhoto] = useState(profile)
  const authInfo = useSelector((state) => state.isAuthenticated.value);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const typeUser = localStorage.getItem('typeUser');
    if (typeUser != "employee") {
      handleLogout();
      dispatch(setLoginOut());
      navigate("/");
    }

    const fetchMyInfos = async () => {
      try {
        const response = await getEmployeeByEmail(authInfo?.email);
        setMyInfos(response.data);
        const base64Image = convertBufferToDataURL(response?.data.profilePhoto);
        setProfilePhoto(base64Image);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      } finally {
        setIsLoading(false); // Set loading to false after fetching data
      }
    };

    if (authInfo?.email) {
      fetchMyInfos();
    }
  }, [authInfo]);

  const addSkill = (newSkill) => {
    setMyInfos(prevState => ({
      ...prevState,
      skills: [...prevState.skills, newSkill]
    }));
  }

  const removeSkill = (skillToRemove) => {
    setMyInfos(prevState => {
      const updatedSkills = prevState.skills.filter(skill => skill !== skillToRemove);
      return {
        ...prevState,
        skills: updatedSkills
      };
    });
  };

  const addExperience = (newExperience) => {
    setMyInfos(prevState => ({
      ...prevState,
      experiences: [...prevState.experiences, newExperience]
    }));
  }

  const removeExperience= (id_exp) => {
    setMyInfos(prevState => {
      const updatedExperiences = prevState.experiences.filter(experience => experience._id !== id_exp);
      return {
        ...prevState,
        experiences: updatedExperiences
      };
    });
  };

  const addEducation = (newEducation) => {
    setMyInfos(prevState => ({
      ...prevState,
      educations: [...prevState.educations, newEducation],
    }));
  }

  const removeEducation = (id_edu) => {
    setMyInfos(prevState => {
      const updatedEducations = prevState.educations.filter(education => education._id !== id_edu);
      return {
        ...prevState,
        educations: updatedEducations
      };
    });
  };


  const handleImageChange = async (event) => {
    const photo = event.target.files[0];

    if (photo) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setProfilePhoto(e.target.result);
      };

      reader.readAsDataURL(photo);

      try {
        const formData = new FormData();
        formData.append('file', photo);

        let fileData = formData.get('file');
        let base64String = fileData instanceof Blob ? await fileToBase64(fileData) : fileData;

        updateProfilePhoto(myInfos?._id, base64String)
        window.location.reload();
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  const tabs = [
    {
      id: 1,
      title: "Personnel Informations",
      logo: <PiAddressBookThin />,
      component: <PersonnelInfos userInfos={{ cin: myInfos?.cin, first_name: myInfos?.first_name, last_name: myInfos?.last_name, address: myInfos?.address, about: myInfos?.about, phone: myInfos?.phone, country: myInfos?.country, city: myInfos?.city, date_of_birth: myInfos?.date_of_birth }} />
    },
    {
      id: 2,
      title: "Login Informations",
      logo: <MdOutlinePrivacyTip />,
      component: <LoginInfos userInfos={{ email: myInfos?.email, password: myInfos?.password }} />
    },
    {
      id: 3,
      title: "Skills & Experiences",
      logo: <GrAchievement />,
      component: <ExperiencesSkills userInfos={{ skills: myInfos?.skills, experiences: myInfos?.experiences }} addSkill={addSkill} addExperience={addExperience} removeSkill={removeSkill} removeExperience={removeExperience}/>
    },
    {
      id: 4,
      title: "Degrees",
      logo: <FaBook />,
      component: <Degrees userInfos={{ educations: myInfos?.educations }} addEducation={addEducation} removeEducation={removeEducation} />
    },
    {
      id: 5,
      title: "My CV",
      logo: <TbFileCv />,
      component: <MyCV userInfos={{ cv: myInfos?.cv }}/>
    }
  ];

  return (
    <div className={`pt-20 bg-section-dark-bg ${styles.flexStart} ${styles.paddingX}`}>
      <div className={`${styles.boxWidth} ${styles.paddingY} HeightTall`}>
        <div className={` flex sm:flex-row  flex-col justify-between`}>
          <div className='flex flex-col sm:w-[28%] items-center py-6 rounded-lg'>
            <div className="relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
              <Avatar isBordered color="primary" src={profilePhoto} className="w-[160px] h-[160px]" />
              {isHovered && (
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <label htmlFor='imageUpload' className="bg-black opacity-80 rounded-full p-2 w-full h-full text-center flex justify-center items-center cursor-pointer">
                    <MdEdit color='white' size={30} />
                  </label>
                  <input
                    type="file"
                    id="imageUpload"
                    accept=".png, .jpg, .jpeg"
                    onChange={handleImageChange}
                    hidden={true}
                  />
                </div>
              )}
            </div>
            {isLoading ? <Spinner className='mt-6' /> : (
              <h1 className={`${styles.heading3} text-center`}>{myInfos?.first_name} {myInfos?.last_name}</h1>
            )}
            <div className='flex sm:flex-col flex-row list-none mt-6 '>
              {tabs.map((tab) => (
                <>
                  <button key={tab.id} className={`flex font-poppins text-[18px] text-gray-300 font-medium hover:rounded-md hover:bg-[#21262C] p-1 px-3 ${tab.id === indexTab && 'active-tab'} ${tab.title == "My CV" && "sm:block hidden"}`} onClick={() => setindexTab(tab.id)}>
                    <div className='flex flex-row'>
                      <div className='sm:block hidden'>{tab.logo}</div>
                      <div className="text-sm sm:pl-3 pl-0">{tab.title}</div>
                    </div>
                  </button>
                  {tab.id !== tabs.length && <Divider key={`divider-${tab.id}`} className="my-4 bg-[#3D3D3D] sm:block hidden" />}
                </>
              ))}
            </div>
          </div>
          <Divider orientation='vertical' className='h-1000 w-[2px] bg-[#3D3D3D] ' />
          <div className="flex flex-col sm:w-[58%] sm:mr-20 items-center p-6 rounded-lg">
            {isLoading ? <Spinner size='lg' /> : (
              <div className='w-full'>
                {tabs.map(tab => (
                  indexTab === tab.id && tab.component
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Button isIconOnly size='lg' color="primary" aria-label="Like" className='fixed bottom-6 right-10 sm:hidden flex font-bold' onClick={() => setindexTab(5)}>
        <TbFileCv size={30}/>
      </Button>

    </div>
  );
}

export default Profile;
