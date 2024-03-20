import React, { useEffect, useState } from 'react'
import styles from '../style'
import { Input } from '@nextui-org/react';
import { SiAddthis } from "react-icons/si";
import SkillItem from '../components/SkillItem';
import { useNavigate, useParams } from 'react-router-dom';
import handleLogout from '../services/handleLogout';
import { useDispatch, useSelector } from 'react-redux';
import { setLoginOut } from '../stores/authStore';
import "../css/height.css"
import { useQuery } from '@tanstack/react-query';
import getAllCurrencies from '../services/currenciesServices';
import searchSkills from '../services/skillsServices';
import { useForm } from 'react-hook-form'; import { yupResolver } from '@hookform/resolvers/yup';
import { jobOfferSchema } from '../schemas/JobOfferSchema';
import { getJobofferById, insertJobOffer, updateJobOfferInfos } from '../services/jobOfferServices';
import { formatDateForInput, formatDateForInput2 } from '../services/convertFunctions';

const EditJobOffer = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { jobOfferId } = useParams()
    const [skillInputValue, setSkillInputValue] = useState('');
    const [addedSkills, setAddedSkills] = useState([]);
    const [attachements, setAttachements] = useState([]);
    const [attachInput, setAttachInput] = useState("");
    const [minDate, setMinDate] = useState('');
    const [jobOffer, setJobOffer] = useState(null)
    const authInfo = useSelector((state) => state.isAuthenticated.value);



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


        const fetchData = async () => {
            getJobofferById(jobOfferId)
                .then((response) => {
                    setJobOffer(response.data.jobOffer[0])
                    setAddedSkills(response.data.jobOffer[0].skills)
                    setAttachements(response.data.jobOffer[0].attachements)
                    setValue("title", response.data.jobOffer[0].title)
                    setValue("grade", response.data.jobOffer[0].grade)
                    setValue("job_type", response.data.jobOffer[0].job_type)
                    setValue("salary", response.data.jobOffer[0].salary)
                    setValue("currency", response.data.jobOffer[0].currency)
                    setValue("pay_period", response.data.jobOffer[0].pay_period)
                    setValue("delais_depot", response.data.jobOffer[0].delais_depot)
                    setValue("description", response.data.jobOffer[0].description)
                })
                .catch((error) => console.log(error));
        }
        window.scrollTo(0, 0);
        fetchData()
    }, [])

    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
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
            ...data,
            skills: addedSkills,
        }

        const response = await updateJobOfferInfos(jobOffer?._id, formatedData)
        if(response.status == 200)
            navigate("/jobs/job/" + jobOffer?._id)
    }

    const handleAddAttachement = () => {
        let isValid = true;
        attachements.forEach((item) => {
            if (item.toLowerCase() === attachInput.toLowerCase())
                isValid = false;
        });
        if (isValid) {
            setAttachements(prev => [...prev, attachInput])
        }
    }

    const handleRemoveAttachement = (attachToRemove) => {
        setAttachements(prev => prev.filter((attach) => attach != attachToRemove))
    }

    const jobTypes = ["Full-time", "Contract", "Part-time", "Temporary"];
    const paymentPeriods = ["year", "month", "day", "hour"];

    if (!jobOffer) {
        return (
            <div>no infos</div>
        )
    }

    return (
        <div className={`${styles.flexStart} ${styles.paddingX} lg:px-80 bg-section-dark-bg pt-36 xl:pb-4`}>
            <div className={`${styles.boxWidth} HeightTall`}>
                <form onSubmit={handleSubmit(onSubmit)} className='bg-[#18181B] rounded-md sm:px-6 px-4 py-4 flex flex-col sm:gap-6 gap-4'>
                    <div className="flex sm:flex-row flex-col sm:gap-4 gap-2 sm:items-center">
                        <h1 className='sm:text-[20px] text-[16px] text-default-600 sm:w-[20%]'>Title <span className="text-danger-500">*</span></h1>
                        <input type="text" defaultValue={jobOffer?.title} {...register("title")} className={`bg-[#27272A] rounded-md p-2 ${errors.title ? "outline outline-2 outline-danger-300" : "outline-none"}  w-full`} placeholder='Enter the job title' />
                    </div>

                    <div className="flex sm:flex-row flex-col sm:gap-4 gap-2 sm:items-center">
                        <h1 className='sm:text-[20px] text-[16px] text-default-600 sm:w-[20%]'>Grade <span className="text-danger-500">*</span></h1>
                        <input type="text" defaultValue={jobOffer?.grade} {...register("grade")} className={`bg-[#27272A] rounded-md p-2 ${errors.grade ? "outline outline-2 outline-danger-300" : "outline-none"}  w-full`} placeholder='Enter the position grade' />
                    </div>

                    <div className="flex sm:flex-row flex-col sm:gap-4 gap-2 sm:items-center">
                        <h1 className='sm:text-[20px] text-[16px] text-default-600 sm:w-[20%]'>Job Type <span className="text-danger-500">*</span></h1>
                        <select {...register("job_type")} className={`bg-[#27272A] rounded-md p-2 ${errors.job_type ? "outline outline-2 outline-danger-300" : "outline-none"} w-full`}>
                            {jobTypes.map((type, index) => (
                                <option key={index} defaultValue={type} selected={type == jobOffer?.job_type}>{type}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex sm:flex-row flex-col sm:gap-0 gap-2 sm:items-center">
                    <h1 className='sm:text-[20px] text-[16px] text-default-600 sm:w-[22%]'>Salary <span className="text-danger-500">*</span></h1>
                        <div className="flex gap-4 w-full">
                            <Input
                                className={`rounded-md ${errors.salary ? "outline outline-2 outline-danger-300" : "outline-none"}`}
                                placeholder="0.00"
                                labelPlacement="outside"
                                defaultValue={parseFloat(jobOffer.salary)}
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
                                                <option key={currency._id} defaultValue={currency.code_currency} selected={currency.code_currency == jobOffer?.currency}>{currency.code_currency}</option>
                                            ))}
                                        </select>
                                    </div>
                                }
                                type="number"
                            />
                            <h1 className='text-[20px] text-default-600'>per</h1>
                            <select {...register("pay_period")} className="outline-none border-0 bg-[#27272A] p-2 rounded-md text-default-400 text-small">
                                {paymentPeriods.map((period, index) => (
                                    <option key={index} value={period} selected={period == jobOffer?.pay_period}>{period}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex sm:flex-row flex-col sm:gap-4 gap-2 sm:items-center">
                    <h1 className='sm:text-[20px] text-[16px] text-default-600 sm:w-[20%]'>Deadline <span className="text-danger-500">*</span></h1>
                        <Input type="date" size='sm' defaultValue={formatDateForInput(jobOffer?.delais_depot)} {...register("delais_depot")} min={minDate} className={`bg-[#27272A] rounded-md  ${errors.delais_depot ? "outline outline-2 outline-danger-300" : "outline-none"} w-full`} />
                    </div>

                    <div className="flex flex-col sm:gap-4 gap-2 justify-center">
                    <h1 className='sm:text-[20px] text-[16px] text-default-600'>Description <span className="text-danger-500">*</span></h1>
                        <textarea {...register("description")} defaultValue={jobOffer?.description} cols="30" rows="10" className={`bg-[#27272A] rounded-md p-2 outline-none w-full ${errors.description ? "outline outline-2 outline-danger-300" : "outline-none"} resize-none`}></textarea>
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

                    <div className="flex justify-end gap-4">
                        <button type="reset" onClick={() => navigate("/jobs/job/" + jobOfferId)} className='bg-rose-500 px-4 py-2 rounded-md'>Cancel</button>
                        <button type="submit" className='bg-primary-500 px-4 py-2 rounded-md'>Edit</button>
                    </div>

                </form>
            </div>
        </div>
    );
};
export default EditJobOffer;
