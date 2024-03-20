import React, { useEffect, useRef, useState } from 'react'
import styles from '../style'
import { Input } from '@nextui-org/react';
import { SiAddthis } from "react-icons/si";
import SkillItem from '../components/SkillItem';
import { useNavigate } from 'react-router-dom';
import handleLogout from '../services/handleLogout';
import { useDispatch, useSelector } from 'react-redux';
import { setLoginOut } from '../stores/authStore';
import "../css/height.css"
import { useQuery } from '@tanstack/react-query';
import getAllCurrencies from '../services/currenciesServices';
import searchSkills from '../services/skillsServices';
import { useForm } from 'react-hook-form'; import { yupResolver } from '@hookform/resolvers/yup';
import { jobOfferSchema } from '../schemas/JobOfferSchema';
import { insertJobOffer } from '../services/jobOfferServices';
import { ToastContainer, toast, Bounce } from 'react-toastify';

const NewOffer = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [skillInputValue, setSkillInputValue] = useState('');
  const [addedSkills, setAddedSkills] = useState([]);
  const [attachements, setAttachements] = useState([]);
  const [attachInput, setAttachInput] = useState("");
  const [minDate, setMinDate] = useState('');
  const authInfo = useSelector((state) => state.isAuthenticated.value);
  const formRef = useRef(null);

  useEffect(() => {
    const typeUser = localStorage.getItem('typeUser');
    if (typeUser != "company") {
      handleLogout();
      dispatch(setLoginOut());
      navigate("/");
    }

    const getTomorrowDate = () => {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const year = tomorrow.getFullYear();
      let month = tomorrow.getMonth() + 1;
      let day = tomorrow.getDate();

      month = month < 10 ? '0' + month : month;
      day = day < 10 ? '0' + day : day;

      return `${year}-${month}-${day}`;
    };

    setMinDate(getTomorrowDate());
    window.scrollTo(0, 0);
  }, [])

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(jobOfferSchema)
  });

  const { data: currencies, isLoadingCurrencies } = useQuery({
    queryKey: ["currencies"],
    queryFn: () => {
      return getAllCurrencies();
    }
  })

  const { data: skills, isLoading: isLoadingSkills } = useQuery({
    queryKey: ["skills", skillInputValue],
    queryFn: () => searchSkills(skillInputValue)
  });

  const handleInputChange = (e) => {
    setSkillInputValue(e.target.value);
  }

  const handleAddSkill = () => {
    const item = skills?.filter((sk) => sk.skill === skillInputValue);
    if (skillInputValue !== "" && item.length > 0) {
      var isValid = true;
      addedSkills.forEach((item) => {
        if (item.toLowerCase() === skillInputValue.toLowerCase())
          isValid = false;
      });
      if (isValid) {
        setAddedSkills(prev => [...prev, skillInputValue])
        setSkillInputValue("")
      }
    }
  }

  const handleRemoveSkill = (skillItem) => {
    setAddedSkills(prev => prev.filter((sk) => sk != skillItem))
  }

  const onSubmit = async (data) => {
    const formatedData = {
      company: authInfo?.userId,
      ...data,
      skills: addedSkills,
      attachements: attachements
    }
    await insertJobOffer(formatedData)
    toast.success('Job Offer Published Successfully', {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
    window.scrollTo(0, 0)
    formRef.current.reset()
    setAddedSkills([])
    setAttachements([])
    setSkillInputValue("")
    setAttachInput("")
  }

  const handleAddAttachement = () => {
    let isValid = true;
    attachements.forEach((item) => {
      if (item.toLowerCase() === attachInput.toLowerCase())
        isValid = false;
    });
    if (isValid) {
      setAttachements(prev => [...prev, attachInput])
      setAttachInput("")
    }
  }

  const handleRemoveAttachement = (attachToRemove) => {
    setAttachements(prev => prev.filter((attach) => attach != attachToRemove))
  }

  return (
    <div className={`${styles.flexStart} ${styles.paddingX} lg:px-80 bg-section-dark-bg pt-36 xl:pb-4`}>
      <div className={`${styles.boxWidth} HeightTall`}>
        <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className='bg-[#18181B] rounded-md sm:px-6 px-4 py-4 flex flex-col sm:gap-6 gap-4'>

          <div className="flex sm:flex-row flex-col sm:gap-4 gap-2 sm:items-center">
            <h1 className='sm:text-[20px] text-[16px] text-default-600 sm:w-[20%]'>Title <span className="text-danger-500">*</span></h1>
            <input type="text" {...register("title")} className={`bg-[#27272A] rounded-md p-2 ${errors.title ? "outline outline-2 outline-danger-300" : "outline-none"}  w-full`} placeholder='Enter the job title' />
          </div>

          <div className="flex sm:flex-row flex-col sm:gap-4 gap-2 sm:items-center">
            <h1 className='sm:text-[20px] text-[16px] text-default-600 sm:w-[20%]'>Grade <span className="text-danger-500">*</span></h1>
            <input type="text" {...register("grade")} className={`bg-[#27272A] rounded-md p-2 ${errors.grade ? "outline outline-2 outline-danger-300" : "outline-none"}  w-full`} placeholder='Enter the position grade' />
          </div>

          <div className="flex sm:flex-row flex-col sm:gap-4 gap-2 sm:items-center">
            <h1 className='sm:text-[20px] text-[16px] text-default-600 sm:w-[20%]'>Job Type <span className="text-danger-500">*</span></h1>
            <select  {...register("job_type")} className={`bg-[#27272A] rounded-md p-2 ${errors.job_type ? "outline outline-2 outline-danger-300" : "outline-none"}  w-full`}>
              <option value="Full-time" selected>Full-time</option>
              <option value="Contract">Contract</option>
              <option value="Part-time">Part-time</option>
              <option value="Temporary">Temporary</option>
            </select>
          </div>

          <div className="flex sm:flex-row flex-col sm:gap-0 gap-2 sm:items-center">
            <h1 className='sm:text-[20px] text-[16px] text-default-600 sm:w-[22%]'>Salary <span className="text-danger-500">*</span></h1>
            <div className="flex gap-4 w-full">
              <Input
                className={`rounded-md ${errors.salary ? "outline outline-2 outline-danger-300" : "outline-none"}`}
                placeholder="0.00"
                labelPlacement="outside"
                {...register("salary")}
                startContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">$</span>
                  </div>
                }
                endContent={
                  <div className="flex items-center">
                    <select {...register("currency")} className="outline-none border-0 bg-transparent text-default-400 text-small">
                      {currencies?.map((currency) => (
                        <option key={currency._id} value={currency.code_currency} selected={currency.code_currency == "USD"}>{currency.code_currency}</option>
                      ))}
                    </select>
                  </div>
                }
                type="number"
              />
              <h1 className='sm:text-[20px] text-[16px] text-default-600'>per</h1>
              <select
                {...register("pay_period")}
                className="outline-none border-0 bg-[#27272A] p-2 rounded-md text-default-400 text-small"
              >
                <option value="year" selected>year</option>
                <option value="month">month</option>
                <option value="day">day</option>
                <option value="hour">hour</option>
              </select>
            </div>
          </div>

          <div className="flex sm:flex-row flex-col sm:gap-4 gap-2 sm:items-center">
            <h1 className='sm:text-[20px] text-[16px] text-default-600 sm:w-[20%]'>Deadline <span className="text-danger-500">*</span></h1>
            <input type="date" {...register("delais_depot")} min={minDate} className={`bg-[#27272A] rounded-md p-2 ${errors.delais_depot ? "outline outline-2 outline-danger-300" : "outline-none"} w-full`} />
          </div>

          <div className="flex flex-col sm:gap-4 gap-2 justify-center">
            <h1 className='sm:text-[20px] text-[16px] text-default-600'>Description <span className="text-danger-500">*</span></h1>
            <textarea {...register("description")} cols="30" rows="10" className={`bg-[#27272A] rounded-md p-2 outline-none w-full ${errors.description ? "outline outline-2 outline-danger-300" : "outline-none"} resize-none`}></textarea>
          </div>

          <div className="flex flex-col sm:gap-4 gap-2 justify-center">
            <h1 className='sm:text-[20px] text-[16px] text-default-600'>Required Skills</h1>
            <div className="flex gap-4 items-center">
              <Input onChange={handleInputChange} placeholder='enter your skill and find it' list="skills" size='sm' id="skillInput" value={skillInputValue} />
              <datalist id="skills">
                {skills?.map((sk, index) => <option key={index} value={sk.skill} />)}
              </datalist>
              <SiAddthis onClick={handleAddSkill} size={30} className='cursor-pointer mr-2' />
            </div>
            <div className="flex flex-wrap">
              {addedSkills.map((skill, index) => (
                <SkillItem skill={skill} delete={handleRemoveSkill} />
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:gap-4 gap-2 justify-center">
            <h1>Required Attachements</h1>
            <div className="flex gap-4 items-center">
              <Input onChange={(e) => setAttachInput(e.target.value)} placeholder='enter the attachment name' size='sm' value={attachInput} />

              <SiAddthis onClick={handleAddAttachement} size={30} className='cursor-pointer mr-2' />
            </div>
            <div className="flex flex-wrap">
              {attachements.map((attach, index) => (
                <SkillItem skill={attach} delete={handleRemoveAttachement} />
              ))}
            </div>
          </div>

          <div className="flex justify-end sm:gap-4 gap-2">
            <button type="reset" className='bg-rose-500 px-4 py-2 rounded-md'>Cancel</button>
            <button type="submit" className='bg-primary-500 px-4 py-2 rounded-md'>Publish</button>
          </div>
          <ToastContainer />

        </form>
      </div>
    </div>
  );
};
export default NewOffer;
