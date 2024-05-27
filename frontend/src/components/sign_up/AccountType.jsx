import React, { useState } from 'react'
import { Divider } from "@nextui-org/react";
import "../../css/AccountTypeCard.css"
import { MdOutlineWork } from "react-icons/md";
import { HiHomeModern } from "react-icons/hi2";
import { useDispatch, useSelector } from 'react-redux';
import { setCompany, setEmployee } from '../../stores/signUpStore';

function AccountType() {
    const dispatch = useDispatch();
    const typeUser = useSelector((state) => state.typeUser.value);

    return (
        <div className='flex sm:flex-row flex-col sm:gap-10 gap-10 justify-center'>
            <div onClick={() => {dispatch(setEmployee())}} 
                className={`bg-[#161B22] rounded-md py-6 px-10 flex items-center flex-col text-center card ${typeUser == "employee" && "activeCard"} transition-transform duration-300 ease-in-out`}>
                <div className='w-full flex justify-center mb-4'><MdOutlineWork size={40} color='#F33A6A' /></div>
                <h1 className='font-bold'>Continue As candidate</h1>
            </div>

            <Divider className="my-4 bg-[#3D3D3D] h-100 sm:flex hidden" orientation='vertical' />
            <div onClick={() => {dispatch(setCompany())}} 
                className={`bg-[#161B22] rounded-md py-6 px-10 flex items-center flex-col text-center card ${typeUser == "company" && "activeCard"} transition-transform duration-300 ease-in-out`}>
                <div className='w-full flex justify-center mb-4'><HiHomeModern size={40} color='#0099FF' /></div>
                <h1 className='font-bold'>Continue As Comany</h1>
            </div>
        </div>
    )
}

export default AccountType