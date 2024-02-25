import React, { useEffect, useState } from 'react'
import { PaginationItemType } from "@nextui-org/react";
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { setPersonnelInfos } from '../../stores/signUpStore';
import { useDispatch, useSelector } from 'react-redux';
import getAllCountries from '../../services/countriesServices';
import { useQuery } from '@tanstack/react-query';
import { PersonnelInfosSchema } from '../../schemas/employeeSchema';

function PersonnelInfosForm(props) {
    const dispatch = useDispatch();
    const employeeData = useSelector((state) => state.employeeData.value);
    const [selectedCountry, setSelectedCountry] = useState(employeeData.country)

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(PersonnelInfosSchema)
    });

    const onSubmit = async (data) => {
        try {
            const formattedData = {
                ...data,
                dob: data.dob.toLocaleDateString('en-CA'),
            };
            dispatch(setPersonnelInfos(formattedData))
            props.pagination.onNext()
        } catch (err) {
            console.log(err);
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
        <form onSubmit={handleSubmit(onSubmit)}>
            {errors.country && <label>{errors.country.message}</label>}
            {errors.city && <label>{errors.city.message}</label>}
            <div className="slideshow flex flex-col gap-2">
                <p className="title py-4">Personnel Informations</p>
                <div className='input-group flex gap-4'>
                    <div>
                        {errors.cin ? <label style={{ color: '#E11D48' }}>ID</label> : <label>ID</label>}
                        <input type="text" placeholder='ID' {...register("cin")} className={`${errors.cin && "erreur"}`} defaultValue={employeeData.cin} />
                    </div>

                    <div>
                        {errors.firstName ? <label style={{ color: '#E11D48' }}>First Name</label> : <label>First Name</label>}
                        <input type="text" placeholder='First Name' {...register("firstName")} className={`${errors.firstName && "erreur"}`} defaultValue={employeeData.firstName} />
                    </div>

                    <div>
                        {errors.lastName ? <label style={{ color: '#E11D48' }}>Last Name</label> : <label>Last Name</label>}
                        <input type="text" placeholder='Last Name' {...register("lastName")} className={`${errors.lastName && "erreur"}`} defaultValue={employeeData.lastName} />
                    </div>
                </div>

                <div className='input-group flex gap-6 w-full'>
                    <div className='w-full'>
                        {errors.phoneNumber ? <label style={{ color: '#E11D48' }}>Phone Number</label> : <label>Phone Number</label>}
                        <input type="tel" placeholder='Phone: (212) 123-456789' defaultValue={employeeData.phoneNumber} {...register("phoneNumber")} className={`${errors.phoneNumber && "erreur"}`} />
                    </div>

                    <div className='w-full'>
                        {errors.dob ? <label style={{ color: '#E11D48' }}>Date of Birth</label> : <label>Date of Birth</label>}
                        <input type="date" {...register("dob")} className={`${errors.dob && "erreur"}`} defaultValue={employeeData.dob} />
                    </div>
                </div>

                <div className='input-group flex gap-6 w-full'>
                    <div className='w-full'>
                        {errors.country ? <label style={{ color: '#E11D48' }}>Country</label> : <label>Country</label>}
                        <select className={`select ${errors.country && "erreur"}`} {...register("country")} onChange={(e) => setSelectedCountry(e.target.value)}>
                            <option value="" disabled selected>Select a country</option>
                            {isLoading && <option value="" className='font-bold text-primary-500'>Loading ...</option>}
                            {countries?.map((option, index) => (
                                <option key={index} value={option.pays_name} selected={employeeData.country == option.pays_name}>
                                    {option.pays_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className='w-full'>
                        {errors.city ? <label style={{ color: '#E11D48' }}>City</label> : <label>City</label>}
                        <select className={`select ${errors.city && "erreur"}`} defaultValue={employeeData.city} {...register("city")} disabled={!selectedCountry}>
                            <option value="" disabled>Select a city</option>
                            {cities?.map((option, index) => (
                                <option key={index} value={option.city_name} selected={employeeData.city === option.city_name}>
                                    {option.city_name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className='input-group'>
                    <div>
                        {errors.address ? <label style={{ color: '#E11D48' }}>Address</label> : <label>Address</label>}
                        <input type="text" placeholder="Enter Your Address" defaultValue={employeeData.address} {...register("address")} className={`${errors.address && "erreur"}`} />
                    </div>
                </div>
                <div className='mt-6'>
                    <ul className="flex gap-2 items-center justify-center">
                        {props.pagination.range.map((page) => {
                            if (page !== PaginationItemType.NEXT && page !== PaginationItemType.PREV && page !== PaginationItemType.DOTS) {
                                return (
                                    <li key={page} aria-label={`page ${page}`}>
                                        <button
                                            className={`w-3 h-3 bg-default-300 rounded-full ${props.pagination.activePage === page ? 'bg-rose-500' : ''}`}
                                        />
                                    </li>
                                );
                            }
                        })}
                    </ul>
                </div>

                <div className='flex justify-end gap-4 mt-4'>
                    <button onClick={props.pagination.onPrevious} className='font-semibold bg-rose-600 px-4 py-2 rounded-md'>Back</button>
                    <button type='submit' className="bg-[#0099FF] font-semibold px-4 py-2 rounded-md">
                        Next
                    </button>
                </div>
            </div>
        </form>
    )
}

export default PersonnelInfosForm