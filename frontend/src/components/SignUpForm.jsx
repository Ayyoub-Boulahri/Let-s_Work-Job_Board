import React from 'react'
import { Dialog } from '@radix-ui/themes';
import { IoArrowForwardOutline } from "react-icons/io5";
import "../css/signUpForm.css";
import { usePagination, PaginationItemType } from "@nextui-org/react";
import PersonnelInfosForm from './sign_up/PersonnelInfosForm';
import AccountType from './sign_up/AccountType';
import { useDispatch, useSelector } from 'react-redux';
import SecurityInfos from './sign_up/SecurityInfos';
import AddSkills from './sign_up/AddSkills';
import AddExperiences from './sign_up/AddExperiences';
import AddDegrees from './sign_up/AddDegrees';
import AlmostThere from './sign_up/AlmostThere';
import ResumeUploader from './sign_up/ResumeUploader';
import ImageUpload from './sign_up/ImageUpload ';

function SignUpForm() {
    const { activePage, range, setPage, onNext, onPrevious } = usePagination({
        total: 9,
        showControls: true,
        siblings: 10,
        boundaries: 10,
    });
    const typeUser = useSelector((state) => state.typeUser.value);


    const Employeeitems = [
        <PersonnelInfosForm />,
        <SecurityInfos />,
        <AddSkills />,
        <AddExperiences />,
        <AddDegrees />,
        <AlmostThere />,
        <ResumeUploader />,
        <ImageUpload />
    ];

    const companyItems = [
        <div>company1</div>,
        <div>company22</div>,
        <div>company3</div>,
        <div>company4</div>,
        <div>company5</div>,
    ];


    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <button type="button" className="inline-flex mr-6 items-center px-4 py-2 border border-transparent text-base leading-6 font-bold font-poppins rounded-md text-white bg-rose-600 hover:bg-rose-500 focus:border-rose-700 active:bg-rose-700 transition ease-in-out duration-150 cursor-pointer">
                    Get Started <IoArrowForwardOutline className='ml-2 text-[18px] font-bold' />
                </button>
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
                        <div className='mt-6'>
                            <ul className="flex gap-2 items-center justify-center">
                                {range.map((page) => {
                                    if (page !== PaginationItemType.NEXT && page !== PaginationItemType.PREV && page !== PaginationItemType.DOTS) {
                                        return (
                                            <li key={page} aria-label={`page ${page}`}>
                                                <button
                                                    className={`w-3 h-3 bg-default-300 rounded-full ${activePage === page ? 'bg-rose-500' : ''}`}
                                                />
                                            </li>
                                        );
                                    }
                                })}
                            </ul>
                        </div>

                        <div className='flex justify-end gap-4 mt-4'>
                            {activePage != 1 && <button onClick={onPrevious} className='font-semibold bg-rose-600 px-4 py-2 rounded-md'>Back</button>}
                            <button onClick={onNext} className="bg-[#0099FF] font-semibold px-4 py-2 rounded-md">
                                {activePage !== Employeeitems.length + 1 ? "Next" : "Sign Up"}
                            </button>
                        </div>
                    </div>
                </div>
            </Dialog.Content>
        </Dialog.Root>
    )
}

export default SignUpForm