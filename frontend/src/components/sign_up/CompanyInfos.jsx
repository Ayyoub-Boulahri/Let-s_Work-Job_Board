import React, { useEffect } from 'react';
import { PaginationItemType } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { setcompanyInfos } from '../../stores/signUpStore';
import { useDispatch, useSelector } from 'react-redux';

function CompanyInfos(props) {
    const dispatch = useDispatch();
    let companyData = useSelector((state) => state.companyData.value);
    useEffect(() => console.log(companyData), [])
    const schema = yup.object().shape({
        companyName: yup.string().required('Company Name is required'),
        phoneNumber: yup.string().min(10).required('Phone Number is required'),
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

    const countries = [
        { id: "MAR", value: "Morocco" },
        { id: "USA", value: "United States" },
        { id: "CAN", value: "Canada" },
        { id: "GBR", value: "United Kingdom" },
        { id: "AUS", value: "Australia" },
        { id: "GER", value: "Germany" },
        { id: "FRA", value: "France" },
        { id: "JPN", value: "Japan" },
    ];

    const cities = [
        { id: "RAB", value: "Rabat", country: "MAR" },
        { id: "NYC", value: "New York City", country: "USA" },
        { id: "TOR", value: "Toronto", country: "CAN" },
        { id: "LON", value: "London", country: "GBR" },
        { id: "SYD", value: "Sydney", country: "AUS" },
        { id: "BER", value: "Berlin", country: "GER" },
        { id: "PAR", value: "Paris", country: "FRA" },
        { id: "TOK", value: "Tokyo", country: "JPN" },
    ];

    const sizes = [
        { id: 1, value: "moins 10 employees" },
        { id: 2, value: "de 10 a 100 employee" },
        { id: 3, value: "de 101 a 500 employee" },
        { id: 4, value: "de 501 a 1000 employee" },
        { id: 5, value: "plus 1000 employee" },
    ]

    const industries = [
        { id: 1, value: "Fashion" },
        { id: 2, value: "Electrical Engineering" },
        { id: 3, value: "Civil Engineering" },
        { id: 4, value: "Computer Hardware" },
        { id: 5, value: "Computer Software" }
    ]

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
                        <input type="tel" placeholder='Phone Number' {...register('phoneNumber')} className={`${errors.phoneNumber && 'erreur'}`} defaultValue={companyData.phoneNumber} />
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
                            {industries.map((industry) => (
                                <option key={industry.id} value={industry.value} selected={companyData.industry == industry.value}>
                                    {industry.value}
                                </option>
                            ))}
                        </select>                    </div>

                    <div>
                        {errors.foundedYear ? <label style={{ color: '#E11D48' }}>Founded Year</label> : <label>Founded Year</label>}
                        <input type="number" placeholder='founded Year' {...register("foundedYear")} className={`${errors.foundedYear && "erreur"}`} defaultValue={companyData.foundedYear} />
                    </div>


                </div>

                <div className='input-group flex gap-6 w-full'>
                    <div className='w-full'>
                        {errors.country ? <label style={{ color: '#E11D48' }}>Country</label> : <label>Country</label>}
                        <select className={`select ${errors.country && "erreur"}`} {...register("country")} >
                            <option value="" disabled selected>Select a country</option>
                            {countries.map((option) => (
                                <option key={option.id} value={option.id} selected={companyData.country == option.id}>
                                    {option.value}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className='w-full'>
                        {errors.city ? <label style={{ color: '#E11D48' }}>City</label> : <label>City</label>}
                        <select className={`select ${errors.city && "erreur"}`} {...register("city")} >
                            <option value="" disabled selected>Select a city</option>
                            {cities.map((option) => (
                                <option key={option.id} value={option.id} selected={companyData.city == option.id}>
                                    {option.value}
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
