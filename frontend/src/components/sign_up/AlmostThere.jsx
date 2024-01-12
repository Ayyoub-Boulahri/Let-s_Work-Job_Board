import React from 'react'
import almostThere from "../../assets/almostThere.svg"
import { PaginationItemType } from "@nextui-org/react";

function AlmostThere(props) {
    return (
        <div className="flex flex-col items-center justify-center slideshow">
            <img src={almostThere} alt="Almost there" className='w-[200px] mb-4' />
            <h1 className="text-4xl font-bold mb-4">You're Almost There!</h1>
            <p className="text-lg">Just a few more steps to go...</p>
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

            <div className='flex justify-end gap-4 mt-4 w-full'>
                <button onClick={props.pagination.onPrevious} className='font-semibold bg-rose-600 px-4 py-2 rounded-md'>Back</button>
                <button type='submit' className="bg-[#0099FF] font-semibold px-4 py-2 rounded-md" onClick={props.pagination.onNext}>
                    Next
                </button>
            </div>
        </div>
    )
}

export default AlmostThere