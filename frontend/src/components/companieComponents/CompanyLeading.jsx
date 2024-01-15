import PropTypes from 'prop-types'
import React, { Component } from 'react'
import CompanyPhoto from '../../assets/Companies.svg'
import { Input } from "@nextui-org/react";
import { IoIosSearch } from "react-icons/io";

function CompanyLeading() {
  return (
    <section>
      <div className='flex gap-10 py-10'>
        <div>
          <img src={CompanyPhoto} alt='company photo'/>
        </div>
        <div className='flex flex-col justify-center p-4 '>
          <h1 className='font-poppins font-bold ss:text-[40px] text-[28px] text-gray-300'>
            Find the Company that fits You
          </h1>
          <p className=''>
            Discover the real scoop on an employer before you take the leap. Check out reviews and ratings, and filter companies based on the qualities that matter most to you.
          </p>
        </div>
      </div>
      <div className='flex justify-center p-12 space-x-unit-lg'>
        <h1 className='flex items-center font-bold text-[22px]'>
          Do you have a company on you're mind ?
        </h1>
        <Input
          type="email" variant="bordered" placeholder='Serach a company' className='w-[40%]'
          endContent={
            <button>
              <IoIosSearch className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            </button>
          }
        />
      </div>
    </section>
  )
}

export default CompanyLeading
