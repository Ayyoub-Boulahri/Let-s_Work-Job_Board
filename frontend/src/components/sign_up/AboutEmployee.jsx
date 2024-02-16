import React from 'react'
import { PaginationItemType } from "@nextui-org/react";
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { setAboutMe } from '../../stores/signUpStore';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createEmployee } from '../../services/employeeServices';
import checkAuthentication from '../../services/checkAuthentication';
import { setAuthenticated } from '../../stores/authStore';
import axios from 'axios';
import { aboutSchema } from '../../schemas/employeeSchema';

function AboutEmployee(props) {
    
    const dispatch = useDispatch();
    var employeeData = useSelector((state) => state.employeeData.value);

    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(aboutSchema)
    });

    const onSubmit = async (data) => {
        try {
            dispatch(setAboutMe(data.aboutMe));
            employeeData = dispatch((dispatch, getState) => getState().employeeData.value);
            console.log(employeeData)
            signUpFonction(employeeData);
            props.pagination.onNext() 
        } catch (err) {
            console.log(err);
        }
    }
    

    const signUpFonction = (employeeData) => {
        createEmployee(employeeData)
    }
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="slideshow flex flex-col gap-2 min-h-[300px]">
                <p className="title py-2">About Me</p>
                <div className='input-group flex flex-col gap-2'>
                    <label className=''>Your description is key in connecting you with the right job opportunities, helping companies understand your unique skills and qualifications.</label>
                    {errors.aboutMe && <label style={{ color: '#E11D48' }}>{errors.aboutMe.message}</label>}
                    <div className='flex w-full gap-8 items-center'>
                        <textarea className="resize-none" cols="30" rows="10" defaultValue={employeeData.aboutMe} placeholder='Tell Us About your self' {...register("aboutMe")}></textarea>
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
                        Sign Up
                    </button>
                </div>
            </div>
        </form>
    )
}

export default AboutEmployee