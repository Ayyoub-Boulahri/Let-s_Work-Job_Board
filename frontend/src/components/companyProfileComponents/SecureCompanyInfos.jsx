import React, { useState } from 'react'
import { FaRegEdit } from 'react-icons/fa'
import { Input } from "@nextui-org/react";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";
import * as yup from 'yup'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { getAllCompanyEmails, updateCompanyInfos } from '../../services/companyServices';
import { useNavigate } from 'react-router-dom';
import bcrypt from "bcryptjs"
function SecureCompanyInfos(props) {
    const [isUpdateSecureInfos, setIsUpdateSecureInfos] = useState(false)
    
    const [isVisible, setIsVisible] = useState({
        password: false,
        currentPassword: false,
        newPassword: false,
        confirmPassword: false
    });
    const toggleVisibility = (property) => {
        setIsVisible(prev => {
            return { ...prev, [property]: !prev[property] };
        });
    };
    const navigate = useNavigate()
    const updateEmailSchema = yup.object().shape({
        email: yup.string().email("Invalid Email").test('unique-email', 'Email already exists', async function (value) {
            const arrayOfEmails = await getAllCompanyEmails();
            const lowercaseValue = value.toLowerCase();
            const lowercaseEmails = arrayOfEmails.map(email => email.toLowerCase());
            return !lowercaseEmails.includes(lowercaseValue);
        }).required("type your new email"),
        password: yup.string().test('correct-password', 'Incorrect password', async function (value) {
            const passwordMatch = await bcrypt.compare(value, props.company.password);
            return passwordMatch;
        }).required("confirm your password first"),
    });
    

    const updatePasswordSchema = yup.object().shape({
        currentPassword: yup.string().test('correct-password', 'Incorrect password', async function (value) {
            const passwordMatch = await bcrypt.compare(value, props.company.password);
            return passwordMatch;
        }).required("confirm your current password"),
        newPassword: yup.string()
            .min(8, 'Password must be at least 8 characters long')
            .matches(/^(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter and one number')
            .test('not_prev_password', 'This is your previous password', function (value) {
                return value !== this.parent.currentPassword;
            })
            .required('Type your new password'),
        confirmation: yup.string().oneOf([yup.ref("newPassword"), null], "Incorrect password confirmation").required("Confirm your new password"),
    });
    

    const { register: updateEmailRegister, handleSubmit: handleEmailSubmit, formState: { errors: emailUpdateErrors } } = useForm({
        resolver: yupResolver(updateEmailSchema)
    });

    const { register: updatePasswordRegister, handleSubmit: handlePasswordSubmit, formState: { errors: passwordUpdateErrors } } = useForm({
        resolver: yupResolver(updatePasswordSchema)
    });
    const onSubmitEmail = async (data) => {
        const formatedData = { "company_email": data.email }

        try {
            const response = await updateCompanyInfos(props.company.company_id, formatedData)
            if (response.status === 200) {
                window.scrollTo(0, 0);
                navigate("/")
            }
        } catch (err) {
            console.error(err)
        }
    }

    const onSubmitPassword = async (data) => {
        const hashedPassword = await bcrypt.hash(data.newPassword, 10)
        const formatedData = { "password": hashedPassword }

        try {
            const response = await updateCompanyInfos(props.company.company_id, formatedData)
            if (response.status === 200) {
                window.scrollTo(0, 0);
                navigate("/")
            }
        } catch (err) {
            console.error(err)
        }
    }

    return (

        <div className='flex gap-4 ml-4  flex-col'>
            <div className="flex justify-normal gap-10 items-center">
                <h1 className="font-bold text-default-900 text-[20px]">Log In Informations</h1>
                <FaRegEdit size={30} className='cursor-pointer hover:text-primary duration-300' onClick={() => setIsUpdateSecureInfos((prev) => !prev)} />
            </div>
            {!isUpdateSecureInfos ?
                <>
                    <div className='flex'>
                        <p className='font-bold text-default-500 w-[30%]'>Email</p>
                        <p className='text-default-400'>{props.company.email}</p>
                    </div>

                    <div className='flex'>
                        <p className='font-bold text-default-500 w-[30%]'>Password</p>
                        <p className='text-default-400'>************</p>
                    </div>
                </>
                : <div className='flex md:flex-row flex-col justify-between w-[100%] md:gap-28 gap-14'>
                    <div className='flex flex-col gap-4 md:ml-8 mt-4 md:w-[50%]'>
                        <h1 className='font-bold text-default-500 text-[20px]'>Change Email</h1>
                        <div>
                            <Input type="text" variant={"flat"} size='sm' className={`w-[100%]`} {...updateEmailRegister('email')} placeholder='Enter New Email' />
                            {emailUpdateErrors.email && <label style={{ color: '#E11D48' }}>{emailUpdateErrors.email.message}</label>}
                        </div>
                        <div>
                            <Input
                                label="Password"
                                autoComplete='new-password'
                                variant="bordered"
                                className={`w-[100%]`}
                                {...updateEmailRegister('password')}
                                placeholder="Confirm your password"
                                endContent={
                                    <button className="focus:outline-none" type="button" onClick={() => toggleVisibility("password")}>
                                        {isVisible.password ? (
                                            <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                                        ) : (
                                            <FaEye className="text-2xl text-default-400 pointer-events-none" />
                                        )}
                                    </button>
                                }
                                type={isVisible.password ? "text" : "password"}
                            />
                            {emailUpdateErrors.password && <label style={{ color: '#E11D48' }}>{emailUpdateErrors.password.message}</label>}

                        </div>
                        <div className='flex justify-end mt-8 w-[100%]'>
                            <button className="bg-rose-500 font-semibold px-4 py-2 mr-8 rounded-md" onClick={() => setIsUpdateSecureInfos(false)}>Cancel</button>
                            <button onClick={handleEmailSubmit(onSubmitEmail)} className="bg-[#0099FF] font-semibold px-4 py-2 rounded-md">Save</button>
                        </div>
                    </div>


                    <div className='flex flex-col gap-4 mt-4 md:w-[50%] md:mr-10'>
                    <h1 className='font-bold text-default-500 text-[20px]'>Change Password</h1>

                        <div>
                            <h1 className='pt-2 pb-3'>Confirm you're current password</h1>
                            <Input
                                label="Password"
                                autoComplete='new-password'
                                variant="bordered"
                                className={`w-[100%]`}
                                {...updatePasswordRegister("currentPassword")}
                                placeholder="Confirm your password"
                                endContent={
                                    <button className="focus:outline-none" type="button" onClick={() => toggleVisibility("currentPassword")}>
                                        {isVisible.currentPassword ? (
                                            <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                                        ) : (
                                            <FaEye className="text-2xl text-default-400 pointer-events-none" />
                                        )}
                                    </button>
                                }
                                type={isVisible.currentPassword ? "text" : "password"}
                            />
                            {passwordUpdateErrors.currentPassword && <label style={{ color: '#E11D48' }}>{passwordUpdateErrors.currentPassword.message}</label>}

                        </div>
                        <div>
                            <h1 className='pt-2 pb-3'>You're new password</h1>
                            <Input
                                label="Password"
                                autoComplete='new-password'
                                variant="bordered"
                                className={`w-[100%]`}
                                {...updatePasswordRegister("newPassword")}
                                placeholder="Confirm your password"
                                endContent={
                                    <button className="focus:outline-none" type="button" onClick={() => toggleVisibility("newPassword")}>
                                        {isVisible.newPassword ? (
                                            <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                                        ) : (
                                            <FaEye className="text-2xl text-default-400 pointer-events-none" />
                                        )}
                                    </button>
                                }
                                type={isVisible.newPassword ? "text" : "password"}
                            />
                            {passwordUpdateErrors.newPassword && <label style={{ color: '#E11D48' }}>{passwordUpdateErrors.newPassword.message}</label>}

                        </div>
                        <div>
                            <h1 className='pt-2 pb-3'>Confirm you're new password</h1>
                            <Input
                                label="Password"
                                autoComplete='new-password'
                                variant="bordered"
                                className={`w-[100%]`}
                                {...updatePasswordRegister("confirmation")}
                                placeholder="Confirm your password"
                                endContent={
                                    <button className="focus:outline-none" type="button" onClick={() => toggleVisibility("confirmPassword")}>
                                        {isVisible.confirmPassword ? (
                                            <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                                        ) : (
                                            <FaEye className="text-2xl text-default-400 pointer-events-none" />
                                        )}
                                    </button>
                                }
                                type={isVisible.confirmPassword ? "text" : "password"}
                            />
                            {passwordUpdateErrors.confirmation && <label style={{ color: '#E11D48' }}>{passwordUpdateErrors.confirmation.message}</label>}

                        </div>
                        <div className='flex justify-end mt-8 w-[100%]'>
                        <button className="bg-rose-500 font-semibold px-4 py-2 mr-8 rounded-md" onClick={() => setIsUpdateSecureInfos(false)}>Cancel</button>
                            <button onClick={handlePasswordSubmit(onSubmitPassword)} className="bg-[#0099FF] font-semibold px-4 py-2 rounded-md">Save</button>
                        </div>
                    </div>

                </div>
            }
        </div>
    )
}

export default SecureCompanyInfos