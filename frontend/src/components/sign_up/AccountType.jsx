import React from 'react'
import { Divider } from "@nextui-org/react";
import "../../css/AccountTypeCard.css"
import { MdOutlineWork } from "react-icons/md";
import { HiHomeModern } from "react-icons/hi2";

function AccountType() {
    return (
        <div className='flex gap-10 justify-center'>
            <div className="bg-[#161B22] rounded-md py-6 px-10 flex items-center flex-col text-center card hover:scale-105 transition-transform duration-300 ease-in-out">
                <div className='w-full flex justify-center mb-4'><MdOutlineWork size={40} color='#F33A6A' /></div>
                <h1 className='font-bold'>Continue As Employee</h1>
            </div>

            <Divider className="my-4 bg-[#3D3D3D] h-100" orientation='vertical' />
            <div className="bg-[#161B22] rounded-md py-6 px-10 flex items-center flex-col text-center card hover:scale-105 transition-transform duration-300 ease-in-out">
                <div className='w-full flex justify-center mb-4'><HiHomeModern size={40} color='#0099FF' /></div>
                <h1 className='font-bold'>Continue As Comany</h1>
            </div>
        </div>
    )
}

export default AccountType