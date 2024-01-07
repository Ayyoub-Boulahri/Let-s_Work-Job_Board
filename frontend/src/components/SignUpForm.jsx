import React from 'react'
import { Dialog } from '@radix-ui/themes';
import { IoArrowForwardOutline } from "react-icons/io5";
import "../css/signUpForm.css";
import { usePagination, PaginationItemType } from "@nextui-org/react";
import PersonnelInfosForm from './sign_up/PersonnelInfosForm';
import AccountType from './sign_up/AccountType';
import { Provider } from 'react-redux';

function SignUpForm() {
    const { activePage, range, setPage, onNext, onPrevious } = usePagination({
        total: 6,
        showControls: true,
        siblings: 10,
        boundaries: 10,
    });

    const itms = [
        <AccountType />,
        <PersonnelInfosForm />,
        <PersonnelInfosForm />,
        <PersonnelInfosForm />,
        <PersonnelInfosForm />,
        <PersonnelInfosForm />
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
                                {itms.map((itm, index) => (
                                    index == activePage - 1 && itm
                                ))}
                            </div>
                            <div className='mt-6'>
                                <ul className="flex gap-2 items-center justify-center">
                                    {range.map((page) => {
                                        if (page !== PaginationItemType.NEXT && page !== PaginationItemType.PREV && page !== PaginationItemType.DOTS) {
                                            return (
                                                <li key={page} aria-label={`page ${page}`}>
                                                    <button
                                                        className={`w-3 h-3 bg-default-300 rounded-full ${activePage === page ? 'bg-rose-500' : ''}`}
                                                        onClick={() => setPage(page)}
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
                                    {activePage !== itms.length ? "Next" : "Sign Up"}
                                </button>
                            </div>
                        </div>
                    </div>

                </Dialog.Content>
            </Dialog.Root>
    )
}

export default SignUpForm