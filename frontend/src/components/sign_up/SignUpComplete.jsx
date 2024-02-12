import React from 'react'
import complete from "../../assets/complete.svg"
import { PaginationItemType } from '@nextui-org/react';

function SignUpComplete(props) {
  return (
    <div className="flex flex-col items-center justify-center slideshow">
            <img src={complete} alt="Almost there" className='w-[200px] mb-4' />
            <h1 className="text-4xl font-bold mb-4">Thanks For Your Sign Up</h1>
            {props.type == "company" && <p className="text-lg text-center">We Will Send you an Email in a few hours when we verifie your company identity</p>}
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

            
        </div>
  )
}

export default SignUpComplete