import PropTypes from 'prop-types'
import React, { Component } from 'react'
import CompanyPhoto from '../../assets/Companies.svg'
import { Input } from "@nextui-org/react";
import { IoIosSearch } from "react-icons/io";

function CompanyLeading(props) {
  return (
    <section>
      <div className='flex gap-10 py-10 sm:flex-row flex-col'>

        <div className='flex justify-center md:w-fit w-[100%]'>
          <img src={CompanyPhoto} className='md:w-[100%] w-[80%]' alt='company photo'/>
        </div>

        <div className='flex flex-col justify-center md:p-4 p-2 w-[100%]'>
          <h1 className='font-bold md:text-[40px] text-[26px] pb-2 text-gray-300'>
            Find the Company that fits You
          </h1>
          <p className='text-default-500'>
            Discover the real scoop on an employer before you take the leap. Check out reviews and ratings, and filter companies based on the qualities that matter most to you.
          </p>
        </div>

      </div>
      <div className='flex md:flex-row flex-col items-center justify-center md:p-12 p-6 gap-6'>
        <h1 className='flex items-center font-bold text-[22px] text-center'>
          Do you have a company on you're mind ?
        </h1>
        <Input
          type="email" variant="bordered" placeholder='Serach a company' className='md:w-[40%]'
          onChange={(e) => props.setSearchTxt(e.target.value)}
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
