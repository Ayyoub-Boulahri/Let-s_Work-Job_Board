import React, { useState } from 'react'
import { Dialog } from '@radix-ui/themes';
import { IoArrowForwardOutline } from "react-icons/io5";
import "../css/signUpForm.css";
import { usePagination } from "@nextui-org/react";
import PersonnelInfosForm from './sign_up/PersonnelInfosForm';
import AccountType from './sign_up/AccountType';
import { useDispatch, useSelector } from 'react-redux';
import SecurityInfos from './sign_up/SecurityInfos';
import AddSkills from './sign_up/AddSkills';
import AddExperiences from './sign_up/AddExperiences';
import AddDegrees from './sign_up/AddDegrees';
import AlmostThere from './sign_up/AlmostThere';
import FileUploader from './sign_up/FileUploader';
import AboutEmployee from './sign_up/AboutEmployee';
import CompanyInfos from './sign_up/CompanyInfos';
import CompanyDesc from './sign_up/CompanyDesc';
import SignUpComplete from './sign_up/signUpComplete';
import { initCompany, initEmployee } from '../stores/signUpStore';
import CompanyPhotoUpload from './sign_up/CompanyPhotoUpload';
import EmployeePhotoUpload from './sign_up/EmployeePhotoUpload';

function SignUpForm(props) {
    const typeUser = useSelector((state) => state.typeUser.value);
    const dispatch = useDispatch()
    const [nbPages, setNbPages] = useState(5)

    const { activePage, range, setPage, onNext, onPrevious } = usePagination({
        total: nbPages,
        showControls: true,
        siblings: 10,
        boundaries: 10,
    });

    const handleNext = () => {
        if (typeUser == "employee")
            setNbPages(Employeeitems.length + 1)
        else
            setNbPages(companyItems.length + 1)
        onNext();
    }

    const initializeAll = () => {
        dispatch(initEmployee());
        dispatch(initCompany());
        setPage(1)
    }

    const handleOutsideClick = (e) => {
        initializeAll()
    };
    
    var pagination = { activePage, range, setPage, onNext, onPrevious, handleNext, nbPages }


    const Employeeitems = [
        <PersonnelInfosForm pagination={pagination} />,
        <SecurityInfos pagination={pagination} />,
        <AddSkills pagination={pagination} />,
        <AddExperiences pagination={pagination} />,
        <AddDegrees pagination={pagination} />,
        <AlmostThere pagination={pagination} />,
        <FileUploader pagination={pagination} />,
        <EmployeePhotoUpload pagination={pagination} />,
        <AboutEmployee pagination={pagination} />,
        <SignUpComplete pagination={pagination} type="employee"/>,
    ];

    const companyItems = [
        <CompanyInfos pagination={pagination} />,
        <SecurityInfos pagination={pagination} />,
        <CompanyDesc pagination={pagination} />,
        <CompanyPhotoUpload pagination={pagination} />,
        <FileUploader pagination={pagination} />,
        <SignUpComplete pagination={pagination} type="company"/>,
    ];




    return (
        <Dialog.Root>
            <Dialog.Trigger>
                {props.buttonTxt == "Get Started" 
                    ?   <button type="button" className="inline-flex mr-6 items-center px-4 py-2 border border-transparent text-base leading-6 font-bold font-poppins rounded-md text-white bg-rose-600 hover:bg-rose-500 focus:border-rose-700 active:bg-rose-700 transition ease-in-out duration-150 cursor-pointer" onClick={handleOutsideClick}>
                            Get Started <IoArrowForwardOutline className='ml-2 text-[18px] font-bold' />
                        </button> 

                    :   <button className="bn632-hover bn26 mr-10 font-poppins" onClick={handleOutsideClick}>Sing Up</button>
                }
            </Dialog.Trigger>

            <Dialog.Content style={{ maxWidth: 500, backgroundColor: "#0D1117" }}>

                <div className="form-container">
                    <div className="flex flex-col gap-2">
                        <div>
                            {activePage == 1 ? <AccountType /> :
                                (typeUser == "employee") ?
                                    Employeeitems.map((item, index) => (
                                        index == activePage - 2 && item
                                    )) : companyItems.map((item, index) => (
                                        index == activePage - 2 && item
                                    ))
                            }
                        </div>

                        {activePage == 1 &&
                            <div className='flex justify-end gap-4 mt-4'>
                                <button onClick={handleNext} className="bg-[#0099FF] font-semibold px-4 py-2 rounded-md">
                                    Next
                                </button>
                            </div>
                        }

                    </div>
                </div>
                {
                    activePage == companyItems.length + 1 && typeUser == "company" &&
                    <Dialog.Close>
                        <div className='flex justify-end gap-4 mt-4 w-full'>
                            <button className='font-semibold bg-rose-600 px-4 py-2 rounded-md'>OK</button>
                        </div>
                    </Dialog.Close>
                }
            </Dialog.Content>


        </Dialog.Root>
    )
}

export default SignUpForm