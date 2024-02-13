import React, { useEffect, useState } from 'react';
import { PaginationItemType } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { setcompanyInfos } from '../../stores/signUpStore';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import getAllIndustries from '../../services/industriesServices';
import getAllCountries from '../../services/countriesServices';

function CompanyInfos(props) {
    const dispatch = useDispatch();
    let companyData = useSelector((state) => state.companyData.value);
    
    const schema = yup.object().shape({
        companyName: yup.string().required('Company Name is required'),
        phoneNumber: yup.string()
                        .matches(/^\(\d{1,3}\) \d{3}-\d{6,}$/, 'Phone number must be in the format (212) 123-456789')
                        .required('Phone Number is required'),
        country: yup.string().required('Country is required'),
        city: yup.string().required('City is required'),
        address: yup.string().required('Address is required'),
        size: yup.string().required('Size is required'),
        foundedYear: yup.number().required('Year is required'),
        industry: yup.string().required('Industry is required'),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        dispatch(setcompanyInfos(data))
        props.pagination.onNext()
    }

    const { data: industries, isLoading: isLoadingIndustries } = useQuery({
        queryKey: ["industries"],
        queryFn: () => getAllIndustries()
    })

    const { data: countries, isLoading:isLoadingCountries } = useQuery({
        queryKey: ["countries"],
        queryFn: () => {
            return getAllCountries()
        }
    })

    const [selectedCountry, setSelectedCountry] = useState(companyData.country)
    const [cities, setCities] = useState()


    useEffect(() => {
        if (selectedCountry != "") {
            const country = countries?.find((country) => country.pays_name == selectedCountry)
            setCities(country?.cities)
        }
    }, [selectedCountry, countries])

    const sizes = [
        { id: 1, value: "1 - 50 employees" },
        { id: 2, value: "51 - 200 employees" },
        { id: 3, value: "201 - 500 employees" },
        { id: 4, value: "501 - 1000 employees" },
        { id: 5, value: "1001 - 5000 employees" },
        { id: 6, value: "5001 - 10000 employees" },
        { id: 7, value: "10000+ employees" }
    ];
    

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="slideshow flex flex-col gap-2">
                <p className="title py-4">Company Informations</p>

                <div className='input-group flex gap-6 w-full'>
                    <div className='flex flex-col w-full'>
                        {errors.companyName ? <label style={{ color: '#E11D48' }}>Company Name</label> : <label>Company Name</label>}
                        <input type="text" placeholder='Company Name' {...register('companyName')} className={`${errors.companyName && 'erreur'}`} defaultValue={companyData.companyName} />
                    </div>
                    <div className='flex flex-col w-full'>

                        {errors.phoneNumber ? <label style={{ color: '#E11D48' }}>Phone Number</label> : <label>Phone Number</label>}
                        <input type="tel" placeholder='Phone: (212) 123-456789' {...register('phoneNumber')} className={`${errors.phoneNumber && 'erreur'}`} defaultValue={companyData.phoneNumber} />
                    </div>

                </div>

                <div className='input-group flex gap-4'>
                    <div>
                        {errors.size ? <label style={{ color: '#E11D48' }}>Size</label> : <label>Size</label>}
                        <select className={`select ${errors.size && "erreur"}`} {...register("size")} >
                            <option value="" disabled selected>company size</option>
                            {sizes.map((size) => (
                                <option key={size.id} value={size.value} selected={companyData.size == size.value}>
                                    {size.value}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        {errors.industry ? <label style={{ color: '#E11D48' }}>Industry</label> : <label>Industry</label>}
                        <select className={`select ${errors.industry && "erreur"}`} {...register("industry")} >
                            <option value="" disabled selected>Industry</option>
                            {isLoadingIndustries && <option value="" className='font-bold text-primary-500'>Loading ...</option>}
                            {industries?.map((industry, index) => (
                                <option key={index} value={industry.industry_name} selected={companyData.industry == industry.industry_name}>
                                    {industry.industry_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        {errors.foundedYear ? <label style={{ color: '#E11D48' }}>Founded Year</label> : <label>Founded Year</label>}
                        <input type="number" placeholder='founded Year' {...register("foundedYear")} className={`${errors.foundedYear && "erreur"}`} defaultValue={companyData.foundedYear} />
                    </div>


                </div>

                <div className='input-group flex gap-6 w-full'>
                    <div className='w-full'>
                        {errors.country ? <label style={{ color: '#E11D48' }}>Country</label> : <label>Country</label>}
                        <select className={`select ${errors.country && "erreur"}`} {...register("country")} onChange={(e) => setSelectedCountry(e.target.value)}>
                            <option value="" disabled selected>Select a country</option>
                            {isLoadingCountries && <option value="" className='font-bold text-primary-500'>Loading ...</option>}
                            {countries?.map((option, index) => (
                                <option key={index} value={option.pays_name} selected={companyData.country == option.pays_name}>
                                    {option.pays_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className='w-full'>
                        {errors.city ? <label style={{ color: '#E11D48' }}>City</label> : <label>City</label>}
                        <select className={`select ${errors.city && "erreur"}`} {...register("city")} disabled={!selectedCountry && companyData.country == ""}>
                            <option value="" disabled selected>Select a city</option>
                            {cities?.map((option, index) => (
                                <option key={index} value={option.city_name} selected={companyData.city == option.city_name}>
                                    {option.city_name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className='input-group'>
                    <div>
                        {errors.address ? <label style={{ color: '#E11D48' }}>Address</label> : <label>Address</label>}
                        <input type="text" placeholder="Enter Your Address" defaultValue={companyData.address} {...register('address')} className={`${errors.address && 'erreur'}`} />
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
    );
}

export default CompanyInfos;
