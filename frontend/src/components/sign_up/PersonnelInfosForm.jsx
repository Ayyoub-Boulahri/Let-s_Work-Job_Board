import React from 'react'
import { PaginationItemType } from "@nextui-org/react";
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { setPersonnelInfos } from '../../stores/signUpStore';
import { useDispatch, useSelector } from 'react-redux';

function PersonnelInfosForm(props) {
    const dispatch = useDispatch();
    const employeeData = useSelector((state) => state.employeeData.value);

    const schema = yup.object().shape({
        cin: yup.string().required('CIN is required'),
        firstName: yup.string().required('First Name is required'),
        lastName: yup.string().required('Last Name is required'),
        phoneNumber: yup.string().min(10).required('Phone Number is required'),
        dob: yup.date().required('Date of Birth is required'),
        country: yup.string().required('Country is required'),
        city: yup.string().required('City is required'),
        address: yup.string().required('Address is required'),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data) => {
        try {
            const formattedData = {
                ...data,
                dob: data.dob.toLocaleDateString('en-CA'), // Adjust the locale to match your desired format
            };
            dispatch(setPersonnelInfos(formattedData))
            props.pagination.onNext()
        } catch (err) {
            console.log(err);
        }
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

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="slideshow flex flex-col gap-2">
                <p className="title py-4">Personnel Informations</p>
                <div className='input-group flex gap-4'>
                    <div>
                        {errors.cin ? <label style={{ color: '#E11D48' }}>CIN</label> : <label>CIN</label>}
                        <input type="text" placeholder='CIN' {...register("cin")} className={`${errors.cin && "erreur"}`} defaultValue={employeeData.cin} />
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
                        <input type="tel" placeholder='Phone Number' defaultValue={employeeData.phoneNumber} {...register("phoneNumber")} className={`${errors.phoneNumber && "erreur"}`} />
                    </div>

                    <div className='w-full'>
                        {errors.dob ? <label style={{ color: '#E11D48' }}>Date of Birth</label> : <label>Date of Birth</label>}
                        <input type="date" {...register("dob")} className={`${errors.dob && "erreur"}`} defaultValue={employeeData.dob} />
                    </div>
                </div>

                <div className='input-group flex gap-6 w-full'>
                    <div className='w-full'>
                        {errors.country ? <label style={{ color: '#E11D48' }}>Country</label> : <label>Country</label>}
                        <select className={`select ${errors.country && "erreur"}`} {...register("country")} >
                            <option value="" disabled selected>Select a country</option>
                            {countries.map((option) => (
                                <option key={option.id} value={option.id} selected={employeeData.country == option.id}>
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
                                <option key={option.id} value={option.id} selected={employeeData.city == option.id}>
                                    {option.value}
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