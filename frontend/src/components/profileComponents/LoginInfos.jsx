import React, { useState } from 'react'
import profile from '../../assets/work_boy.png'
import "../../css/profile.css"
import { Divider } from "@nextui-org/react";
import { FaRegEdit } from "react-icons/fa";
import { Input } from "@nextui-org/react";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";
import * as yup from 'yup'
import { getAllEmployeeEmails, updateEmployeeInfos } from '../../services/employeeServices';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs'

function LoginInfos(props) {
  const [changeEmail, setChangeEmail] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
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
  const authInfo = useSelector((state) => state.isAuthenticated.value);

  const navigate = useNavigate()
  const updatePasswordSchema = yup.object().shape({
    currentPassword: yup.string().test('correct-password', 'Incorrect password', async function (value) {
      const passwordMatch = await bcrypt.compare(value, props.userInfos.password);
      return passwordMatch;
    }).required("Confirm your current password"),
    newPassword: yup.string()
      .min(8, 'Password must be at least 8 characters long')
      .matches(/^(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter and one number')
      .required('Type your new password'),
    confirmation: yup.string().oneOf([yup.ref("newPassword"), null], "Incorrect password confirmation").required("Confirm your new password"),
  });


  const updateEmailSchema = yup.object().shape({
    email: yup.string().email("Invalid Email").test('unique-email', 'Email already exists', async function (value) {
      const arrayOfEmails = await getAllEmployeeEmails();
      const lowercaseValue = value.toLowerCase();
      const lowercaseEmails = arrayOfEmails.map(email => email.toLowerCase());
      return !lowercaseEmails.includes(lowercaseValue);
    }).required("type your new email"),
    password: yup.string().test('correct-password', 'Incorrect password', async function (value) {
      const passwordMatch = await bcrypt.compare(value, props.userInfos.password);
      return passwordMatch;
    })
  })

  const { register: updateEmailRegister, handleSubmit: handleEmailSubmit, formState: { errors: emailUpdateErrors } } = useForm({
    resolver: yupResolver(updateEmailSchema)
  });

  const { register: updatePasswordRegister, handleSubmit: handlePasswordSubmit, formState: { errors: passwordUpdateErrors } } = useForm({
    resolver: yupResolver(updatePasswordSchema)
  });

  const handleUpdatePassword = async (data) => {
    const hashedPassword = await bcrypt.hash(data.newPassword, 10)
    const formatedData = { "password": hashedPassword }
    try {
      const response = await updateEmployeeInfos(authInfo?.userId, formatedData)
      if (response.status === 200) {
        window.scrollTo(0, 0);
        navigate("/")
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleUpdateEmail = async (data) => {
    const formatedData = { "email": data.email }
    try {
      const response = await updateEmployeeInfos(authInfo?.userId, formatedData)
      if (response.status === 200) {
        window.scrollTo(0, 0);
        navigate("/")
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='flex flex-col '>
      <div className='flex justify-between'>
        <div className='p-2 text-sm text-[20px]'>
          <h1 className=' font-medium text-blue-600 dark:text-blue-500 text-[18px]'>Profile</h1>
          <p className='mt-2 '>Gérez votre compte, assurez la sécurité de vos connexions, et prenez le contrôle de la sécurité de vos informations personnelles et bien plus encore.</p>

        </div>
        <img src={profile} alt='' className='w-32 ' />
      </div>
      <Divider className="my-4" />
      {/* EMAIL */}
      <div className='mb-5 flex justify-between'>
        <div>
          <div className='flex items-center flex-row text-[20px] text-gray-300 mt-5 '>
            <h1>Email</h1>
          </div>
          <div className='text-[14px]'>
            <h1>{props.userInfos.email}</h1>
          </div>
        </div>
        {!changeEmail &&
          <div className='flex items-center pl-3 hover:text-blue-500 ' ><button onClick={() => setChangeEmail((prev) => !prev)}><FaRegEdit className='size-6' /></button></div>}
      </div>
      {changeEmail &&
        <div>
          <h1 className='mb-3 text-[16px]'>New email</h1>
          <Input
            type="email"
            placeholder="you@example.com"
            labelPlacement="outside"
            {...updateEmailRegister("email")}
            className='sm:w-[60%]'
            startContent={
              <MdOutlineAlternateEmail />
            }
          />
          {emailUpdateErrors.email && <label style={{ color: '#E11D48' }}>{emailUpdateErrors.email.message}</label>}

          <h1 className='pt-4 pb-4'>Confirm that it's you</h1>
          <Input
            label="Password"
            autoComplete='new-password'
            variant="bordered"
            className='sm:w-[60%]'
            placeholder="Enter your password"
            {...updateEmailRegister("password")}
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

          <div className='flex justify-end  mt-8 sm:w-[60%]'>
            <button className="bg-rose-500 font-semibold px-8 py-2 mr-6 rounded-md" onClick={() => setChangeEmail((prev) => !prev)}>Cancel</button>
            <button onClick={handleEmailSubmit(handleUpdateEmail)} className="bg-[#0099FF] font-semibold px-8 py-2 rounded-md">Save</button>
          </div>
        </div>
      }

      <Divider className="my-4" />
      <div className='mb-5 flex justify-between'>
        <div>
          <div className='flex items-center flex-row text-[20px] text-gray-300 mt-5 '>
            {
              !changePassword ? <h1>Password</h1> : <h1>Current Password</h1>
            }
          </div>
          <div className='text-[14px]'>
            <h1>**************************</h1>
          </div>
        </div>
        {!changePassword &&
          <div className='flex items-center pl-3 hover:text-blue-500 ' ><button onClick={() => setChangePassword((prev) => !prev)}><FaRegEdit className='size-6' /></button></div>}
      </div>
      {changePassword &&
        <div>
          <div>
            <h1 className='pt-2 pb-3'>Confirm you're current password</h1>
            <Input
              label="Password"
              autoComplete='new-password'
              variant="bordered"
              className='sm:w-[60%]'
              placeholder="Enter your current password"
              {...updatePasswordRegister("currentPassword")}
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

            <h1 className='pt-2 pb-3'>You're new password</h1>
            <Input
              label="Password"
              autoComplete='new-password'
              variant="bordered"
              className='sm:w-[60%]'
              placeholder="Enter your new password"
              {...updatePasswordRegister("newPassword")}
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

            <h1 className='pt-2 pb-3'>Confirm you're new password</h1>
            <Input
              label="Password"
              autoComplete='new-password'
              variant="bordered"
              className='sm:w-[60%]'
              placeholder="confirm your password"
              {...updatePasswordRegister("confirmation")}
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

            <div className='flex justify-end  mt-8 sm:w-[60%]'>
              <button className="bg-rose-500 font-semibold px-8 py-2 mr-6 rounded-md" onClick={() => setChangeEmail((prev) => !prev)}>Cancel</button>
              <button onClick={handlePasswordSubmit(handleUpdatePassword)} className="bg-[#0099FF] font-semibold px-8 py-2 rounded-md">Save</button>
            </div>
          </div>
        </div>
      }
    </div>
  )
}
export default LoginInfos;
