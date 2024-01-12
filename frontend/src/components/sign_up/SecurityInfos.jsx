import React, { useEffect, useState } from 'react'
import { PaginationItemType } from "@nextui-org/react";
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { setSecurityInfos, setCompanySecurityInfos } from '../../stores/signUpStore';
import { useDispatch, useSelector } from 'react-redux';

function SecurityInfos(props) {
    const dispatch = useDispatch();
    const employeeData = useSelector((state) => state.employeeData.value);
    const typeUser = useSelector((state) => state.typeUser.value);
    const companyData = useSelector((state) => state.companyData.value);

    const schema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string()
            .min(8, 'Password must be at least 8 characters long')
            .matches(/^(?=.*[A-Z])(?=.*\d)/, '\nPassword must contain at least one uppercase letter and one number')
            .required('Password is required'),
        confirmation: yup.string().oneOf([yup.ref("password"), null]).required(),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data) => {
        const formattedData = {
            email: data.email,
            password: data.password
        }
        try {
            if (typeUser == "employee")
                dispatch(setSecurityInfos(formattedData))
            else
                dispatch(setCompanySecurityInfos(formattedData))

            props.pagination.onNext()
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="slideshow flex flex-col gap-2">
                <p className="title py-4">Security Informations</p>
                <div className='input-group flex-col gap-4'>
                    {errors.email ? <label style={{ color: '#E11D48' }}>Email</label> : <label>Email</label>}
                    <input type="email" placeholder='Enter your Email' {...register("email")} className={`${errors.email && "erreur"}`} defaultValue={typeUser == "employee" ? employeeData.email : companyData.email} />

                    {errors.password ? <label className='pt-4' style={{ color: '#E11D48' }}>Password</label> : <label className='pt-4'>Password</label>}
                    <input type="password" placeholder='Enter a password' {...register("password")} className={`${errors.password && "erreur"}`} defaultValue={typeUser == "employee" ? employeeData.password : companyData.password} />
                    {errors.password && <label style={{ color: '#E11D48' }}>{errors.password.message}</label>}

                    {errors.confirmation ? <label className='pt-4' style={{ color: '#E11D48' }}>Confimation</label> : <label className='pt-4'>Confimation</label>}
                    <input type="password" placeholder='Confirm your password' {...register("confirmation")} className={`${errors.confirmation && "erreur"}`} defaultValue={typeUser == "employee" ? employeeData.password : companyData.password} />
                    {errors.confirmation && <label style={{ color: '#E11D48' }}>the confirmation didn't match the password</label>}
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

export default SecurityInfos