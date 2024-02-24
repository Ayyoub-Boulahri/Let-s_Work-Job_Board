import React, { useEffect, useState } from 'react';
import profile from '../../assets/work_boy.png';
import '../../css/profile.css';
import { Divider, Select, SelectItem } from '@nextui-org/react';
import { FaRegEdit } from 'react-icons/fa';
import { Input } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { getEmployeeByEmail, updateEmployeeInfos } from '../../services/employeeServices'; // Import the function directly
import { useSelector, useDispatch } from 'react-redux';
import { PersonnelInfosSchema, aboutSchema } from '../../schemas/employeeSchema';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQuery } from '@tanstack/react-query';
import getAllCountries from '../../services/countriesServices';

function PersonnelInfos(props) {
  const authInfo = useSelector((state) => state.isAuthenticated.value);
  const [selectedCountry, setSelectedCountry] = useState(props.userInfos.country)

  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(PersonnelInfosSchema)
  });

  const { register: aboutRegister, handleSubmit: handleSubmitAbout, formState: { aboutErrors } } = useForm({
    resolver: yupResolver(aboutSchema)
  });

  const List = [
    {
      id: 1,
      name: 'cin',
      text: props.userInfos.cin,
    },
    {
      id: 2,
      name: 'First name',
      text: props.userInfos.first_name,
    },
    {
      id: 3,
      name: 'Last name',
      text: props.userInfos.last_name,
    },
    {
      id: 4,
      name: 'Phone',
      text: props.userInfos.phone,
    },
    {
      id: 5,
      name: "Date of Birth",
      text: props.userInfos.date_of_birth
    },
    {
      id: 6,
      name: 'Adresse',
      text: props.userInfos.address,
    },
    {
      id: 7,
      name: 'Country',
      text: props.userInfos.country,
    },
    {
      id: 8,
      name: 'City',
      text: props.userInfos.city,
    }
  ];


  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isAboutMe, setIsAboutMe] = useState(true);

  const onSubmit = async (data) => {
    try {
      const formatedData = {
        "cin": data.cin,
        "first_name": data.firstName,
        "last_name": data.lastName,
        "phone": data.phoneNumber,
        "date_of_birth": data.dob.toLocaleDateString('en-CA'),
        "country": data.country,
        "city": data.city,
        "address": data.address
      }

      const response = await updateEmployeeInfos(authInfo?.userId, formatedData)
      if (response.status === 200) {
        window.location.reload()
      }
    } catch (err) {
      console.log(err)
    }
  }

  const onSubmitAbout = async (data) => {
    try {
      const formatedData = {
        "about": data.aboutMe
      }

      const response = await updateEmployeeInfos(authInfo?.userId, formatedData)
      if (response.status === 200) {
        window.location.reload()
      }
    } catch (err) {
      console.log(err)
    }
  }



  const { data: countries, isLoading } = useQuery({
    queryKey: ["countries"],
    queryFn: () => {
      return getAllCountries()
    }
  })
  const [cities, setCities] = useState(countries?.find((country) => country.pays_name == selectedCountry)?.cities)

  useEffect(() => {
    if (selectedCountry != "") {
      const country = countries?.find((country) => country.pays_name == selectedCountry)
      setCities(country?.cities)
    }
  }, [selectedCountry, countries])


  return (
    <div className='flex flex-col '>
      <div className='flex justify-between'>
        <div className='p-2 text-sm h-[30%] text-[20px]'>
          <h1 className=' font-medium text-blue-600 dark:text-blue-500 text-[18px]'>Profile</h1>
          <p className='mt-2 text-[16px]'>
            Optimisez votre expérience sur <b>let's work</b> en mettant à jour vos données professionnelles
          </p>
        </div>
          <img src={profile} alt='' className='w-32 ' />
      </div>
      <Divider className='my-4' />
      <div className='flex flex-row text-[24px] text-gray-300'>
        <h1>About Me</h1>
        <div className='flex items-center pl-3 hover:text-blue-500 duration-300 cursor-pointer'>
          <FaRegEdit onClick={() => setIsAboutMe((prev) => !prev)} />
        </div>
      </div>
      {isAboutMe == true ?
        <div className='text-small text-default-600 py-5'>
          {props.userInfos.about}
        </div>
        :
        <form onSubmit={handleSubmitAbout(onSubmitAbout)}>
          <div className='mt-4'>
          <Textarea
            label="Description"
            variant="bordered"
            placeholder="Enter your description"
            {...aboutRegister("aboutMe")} 
            classNames={{
              input: "resize-none min-h-[100px] text-gray-400",
            }}
            defaultValue={props.userInfos.about}
          />
          <div className='flex justify-end mt-6'>
            <button className="bg-rose-500 font-semibold px-4 py-2 mr-8 rounded-md" onClick={() => setIsAboutMe((prev) => !prev)}>Cancel</button>
            <button type='submit' className="bg-[#0099FF] font-semibold px-4 py-2 rounded-md">Save</button>
          </div>
        </div>
        </form>
      }
      <Divider className='my-4' />
      <div className='flex flex-row text-[24px] text-gray-300'>
        <h1>My Informations</h1>
        <div className='flex items-center pl-3 hover:text-blue-500 duration-300 cursor-pointer'>
          <FaRegEdit onClick={() => setIsFormVisible((prev) => !prev)} />
        </div>
      </div>
      {!isFormVisible ?
        <div>
          {List.map((item) => (
            <div key={item.id}>
              <div className='text-[14px] pt-3 text-lg font-extrabold'>{item.name}</div>
              <p className='text-[12px] font-thin'>{item.text}</p>
            </div>
          ))}
        </div> :
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div >
              <Input type="text" variant={"underlined"} color={errors.cin && "danger"} {...register("cin")} defaultValue={props.userInfos.cin} className='sm:w-[70%] w-[100%]' label="Id" />
              <Input type="text" variant={"underlined"} color={errors.firstName && "danger"} {...register("firstName")} defaultValue={props.userInfos.first_name} className='sm:w-[70%] w-[100%]' label="First Name" />
              <Input type="text" variant={"underlined"} color={errors.lastName && "danger"} {...register("lastName")} defaultValue={props.userInfos.last_name} className='sm:w-[70%] w-[100%]' label="Last Name" />
              <Input type="text" variant={"underlined"} color={errors.phoneNumber && "danger"} {...register("phoneNumber")} defaultValue={props.userInfos.phone} className='sm:w-[70%] w-[100%]' label="Phone" />
              <Input type="date" variant={"underlined"} color={errors.dob && "danger"} {...register("dob")} defaultValue={props.userInfos.date_of_birth} className='sm:w-[70%] w-[100%]' label="Date of Birth" />
              <Input type="text" variant={"underlined"} color={errors.address && "danger"} {...register("address")} defaultValue={props.userInfos.address} className='sm:w-[70%] w-[100%]' label="Adresse" />

              <label htmlFor="countrySelect" className={`mt-4 block ${errors.country && "text-danger"}`}>Country</label>
              <select
                className={`rounded-md block mt-2 p-2 ${errors.country && "outline outline-2 outline-danger-300"} sm:w-[70%] w-[100%]`}
                {...register("country")}
                id='countrySelect'
                onChange={(e) => {
                  setSelectedCountry(e.target.value);
                  // Reset the city select to its default state
                  const citySelect = document.getElementById("citySelect");
                  citySelect.selectedIndex = 0;
                  setValue('city', "")         
                }}
              >
                <option value={null} disabled selected>
                  Select a country
                </option>
                {countries?.map((option, index) => (
                  <option
                    key={index}
                    value={option.pays_name}
                    selected={props.userInfos.country == option.pays_name}
                  >
                    {option.pays_name}
                  </option>
                ))}
              </select>

              <label htmlFor="citySelect" className={`mt-4 block ${errors.city && "text-danger"}`}>City</label>
              <select
                id="citySelect"
                className={`rounded-md p-2 block mt-2 ${errors.city && "outline outline-2 outline-danger-300"} sm:w-[70%] w-[100%]`}
                {...register("city")}
                disabled={!selectedCountry}
              >
                <option value="" disabled selected>
                  Select a city
                </option>
                {cities?.map((option, index) => (
                  <option
                    key={index}
                    value={option.city_name}
                    selected={props.userInfos.city === option.city_name}
                  >
                    {option.city_name}
                  </option>
                ))}
              </select>

            </div>
            <div className='flex justify-end  mt-8 w-[70%]'>
              <button className="bg-rose-500 font-semibold px-4 py-2 mr-8 rounded-md" onClick={() => setIsFormVisible(false)}>Cancel</button>
              <button type='submit' className="bg-[#0099FF] font-semibold px-4 py-2 rounded-md">Save</button>
            </div>
          </div>
        </form>
      }
    </div>
  );
}

export default PersonnelInfos;