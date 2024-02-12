import React, { useEffect, useState } from 'react'
import { PaginationItemType } from "@nextui-org/react";
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { setSecurityInfos, setCompanySecurityInfos } from '../../stores/signUpStore';
import { useDispatch, useSelector } from 'react-redux';
import { IoLogInOutline, IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5'; // Import eye icons
import { getAllEmployeeEmails } from '../../services/employeeServices';
import { getAllCompanyEmails } from '../../services/companyServices';

function SecurityInfos(props) {
    const dispatch = useDispatch();
    const employeeData = useSelector((state) => state.employeeData.value);
    const typeUser = useSelector((state) => state.typeUser.value);
    const companyData = useSelector((state) => state.companyData.value);

    const schema = yup.object().shape({
        email: yup.string()
            .email('Invalid email format')
            .required('Email is required')
            .test('unique-email', 'Email already exists', async function (value) {
                const arrayOfEmails = (typeUser === "employee" ? await getAllEmployeeEmails() : await getAllCompanyEmails());
                const lowercaseValue = value.toLowerCase();
                const lowercaseEmails = arrayOfEmails.map(email => email.toLowerCase());
                return !lowercaseEmails.includes(lowercaseValue);
            }),
        password: yup.string()
            .min(8, 'Password must be at least 8 characters long')
            .matches(/^(?=.*[A-Z])(?=.*\d)/, '\nPassword must contain at least one uppercase letter and one number')
            .required('Password is required'),
        confirmation: yup.string().oneOf([yup.ref("password"), null]).required(),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    // State to toggle password visibility
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit = async (data) => {
        const formattedData = {
            email: data.email.toLowerCase(),
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

                    {/* email input and label */}

                    {errors.email ? <label style={{ color: '#E11D48' }}>Email</label> : <label>Email</label>}
                    <input type="email" placeholder='Enter your Email' {...register("email")} className={`${errors.email && "erreur"}`} defaultValue={typeUser == "employee" ? employeeData.email : companyData.email} />
                    {errors.email && <label style={{ color: '#E11D48' }}>{errors.email.message}</label>}

                    {/* password input and label */}

                    {errors.password ? <label className='pt-4' style={{ color: '#E11D48' }}>Password</label> : <label className='pt-4'>Password</label>}
                    <div className={`password-input-container flex  ${errors.password && "erreur"}`}>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter a Password"
                            className='input-password'
                            {...register("password")}
                            defaultValue={typeUser == "employee" ? employeeData.password : companyData.password}
                        />
                        <button
                            type="button"
                            className="toggle-password"
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? <IoEyeOutline size={16} /> : <IoEyeOffOutline size={16} />}
                        </button>
                    </div>
                    {errors.password && <label style={{ color: '#E11D48' }}>{errors.password.message}</label>}

                    {/* password confirmation input and label */}

                    {errors.confirmation ? <label className='pt-4' style={{ color: '#E11D48' }}>Confimation</label> : <label className='pt-4'>Confimation</label>}
                    <div className={`password-input-container flex  ${errors.confirmation && "erreur"}`}>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder='Confirm your password'
                            className='input-password'
                            {...register("confirmation")}
                            defaultValue={typeUser == "employee" ? employeeData.password : companyData.password}
                        />
                        <button
                            type="button"
                            className="toggle-password"
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? <IoEyeOutline size={16} /> : <IoEyeOffOutline size={16} />}
                        </button>
                    </div>
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