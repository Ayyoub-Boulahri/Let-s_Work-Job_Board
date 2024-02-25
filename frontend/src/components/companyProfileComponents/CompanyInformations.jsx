import React, { useState, useEffect } from 'react'
import { Input } from "@nextui-org/react";
import { FaRegEdit } from 'react-icons/fa'
import { companyInfosSchema } from '../../schemas/companyShema';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import getAllIndustries from '../../services/industriesServices';
import { sizes } from '../../schemas/data';
import getAllCountries from '../../services/countriesServices';
import { updateCompanyInfos } from '../../services/companyServices';

function CompanyInformations(props) {

    const [isUpdateInformations, setIsUpdateInformations] = useState(false)
    const [selectedCountry, setSelectedCountry] = useState(props.company.country)

    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(companyInfosSchema),
    });


    const { data: countries, isLoading } = useQuery({
        queryKey: ["countries"],
        queryFn: () => {
            return getAllCountries()
        }
    })

    const { data: industries, isLoading: isLoadingIndustries } = useQuery({
        queryKey: ["industries"],
        queryFn: () => getAllIndustries()
    })

    const [cities, setCities] = useState(countries?.find((country) => country.pays_name == selectedCountry)?.cities)

    const selectStyle = "sm:w-[40%] w-[100%] p-3 outline-none rounded-md"

    const onSubmit = async (data) => {
        try {
            const formatedData = {
                "company_name": data.companyName,
                "company_phone": data.phoneNumber,
                "country": data.country,
                "city": data.city,
                "address": data.address,
                "size": data.size,
                "founded_year": data.foundedYear,
                "industry": data.industry
            }
            const response = await updateCompanyInfos(props.company.company_id, formatedData)
            if (response.status === 200) {
                window.location.reload()
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (selectedCountry != "") {
            const country = countries?.find((country) => country.pays_name == selectedCountry)
            setCities(country?.cities)
        }

    }, [selectedCountry, countries])
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex gap-4 ml-4 flex-col justify-center'>

                <div className="flex justify-normal gap-10 items-center">
                    <h1 className="font-bold text-default-900 text-[20px]">Informations</h1>
                    <FaRegEdit size={30} className='cursor-pointer hover:text-primary duration-300' onClick={() => setIsUpdateInformations((prev) => !prev)} />
                </div>

                <div className='flex'>
                    <p className='font-bold text-default-500 w-[30%]'>Company name</p>
                    {isUpdateInformations
                        ? <Input type="text" variant={"flat"} size='sm' className={`${errors.companyName && "outline outline-2 outline-danger-300"} sm:w-[40%] w-[100%]`} defaultValue={props.company.company_name} placeholder='Enter the New Company Name' {...register("companyName")} />
                        : <p className='text-default-400'>{props.company.company_name}</p>}
                </div>

                <div className='flex'>
                    <p className='font-bold text-default-500 w-[30%]'>Size</p>
                    {isUpdateInformations
                        ? <select className={`select ${errors.size && "outline outline-2 outline-danger-300"} ${selectStyle}`} {...register("size")} >
                            <option value="" disabled selected>company size</option>
                            {sizes.map((size) => (
                                <option key={size.id} value={size.value} selected={props.company.size == size.value}>
                                    {size.value}
                                </option>
                            ))}
                        </select>
                        : <p className='text-default-400'>{props.company.size}</p>
                    }
                </div>

                <div className='flex'>
                    <p className='font-bold text-default-500 w-[30%]'>Industry</p>
                    {isUpdateInformations
                        ?
                        <select className={`${errors.industry && "outline outline-2 outline-danger-300"} ${selectStyle}`} {...register("industry")} >
                            <option value="" disabled selected>Industry</option>
                            {isLoadingIndustries && <option value="" className='font-bold text-primary-500'>Loading ...</option>}
                            {industries?.map((industry, index) => (
                                <option key={index} value={industry.industry_name} selected={props.company.industry == industry.industry_name}>
                                    {industry.industry_name}
                                </option>
                            ))}
                        </select>
                        : <p className='text-default-400 w-[70%]'>{props.company.industry}</p>
                    }
                </div>

                <div className='flex'>
                    <p className='font-bold text-default-500 w-[30%]'>Founded</p>
                    {isUpdateInformations
                        ? <Input type="number" min={0} variant={"flat"} size='sm' className={`${errors.foundedYear && "outline outline-2 outline-danger-300"} sm:w-[40%] w-[100%]`} defaultValue={props.company.founded_year} {...register("foundedYear")} placeholder="Enter founded year" />
                        : <p className='text-default-400'>{props.company.founded_year}</p>}

                </div>

                <div className='flex'>
                    <p className='font-bold text-default-500 w-[30%]'>Address</p>
                    {isUpdateInformations
                        ? <Input type="text" variant={"flat"} size='sm' className={`${errors.address && "outline outline-2 outline-danger-300"} sm:w-[40%] w-[100%]`} placeholder='Enter the new Address' defaultValue={props.company.address} {...register("address")} />
                        : <p className='text-default-400'>{props.company.address}</p>}
                </div>

                <div className='flex'>
                    <p className='font-bold text-default-500 w-[30%]'>Phone</p>
                    {isUpdateInformations
                        ? <Input type="text" variant={"flat"} size='sm' className={`${errors.phoneNumber && "outline outline-2 outline-danger-300"} sm:w-[40%] w-[100%]`} placeholder='Enter the new Phone number' defaultValue={props.company.phone} {...register("phoneNumber")} />
                        : <p className='text-default-400'>{props.company.phone}</p>}
                </div>

                <div className='flex'>
                    <p className='font-bold text-default-500 w-[30%]'>Country</p>
                    {isUpdateInformations
                        ? <select
                            className={`${errors.country && "outline outline-2 outline-danger-300"} ${selectStyle}`}
                            {...register("country")}
                            id='countrySelect'
                            onChange={(e) => {
                                setSelectedCountry(e.target.value);
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
                                    selected={props.company.country == option.pays_name}
                                >
                                    {option.pays_name}
                                </option>
                            ))}
                        </select>
                        : <p className='text-default-400'>{props.company.country}</p>}
                </div>

                <div className='flex'>
                    <p className='font-bold text-default-500 w-[30%]'>City</p>
                    {isUpdateInformations
                        ? <select
                            id="citySelect"
                            className={`${errors.city && "outline outline-2 outline-danger-300"} ${selectStyle}`}
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
                                    selected={props.company.city === option.city_name}
                                >
                                    {option.city_name}
                                </option>
                            ))}
                        </select>
                        : <p className='text-default-400'>{props.company.city}</p>}
                </div>
                {isUpdateInformations &&
                    <div className='flex justify-end  mt-8 w-[70%]'>
                        <button className="bg-rose-500 font-semibold px-4 py-2 mr-8 rounded-md" onClick={() => setIsUpdateInformations(false)}>Cancel</button>
                        <button type='submit' className="bg-[#0099FF] font-semibold px-4 py-2 rounded-md">Save</button>
                    </div>
                }
            </div>
        </form>

    )
}

export default CompanyInformations