import PropTypes from 'prop-types'
import React, { Component } from 'react'
import CompanyPhoto from '../../assets/Companies.svg'
import { Input } from "@nextui-org/react";
import { IoIosSearch } from "react-icons/io";
import '../../css/card.css'
import { Avatar } from '@nextui-org/react'
import { useNavigate } from 'react-router-dom';

function CompanyCard(props) {
  const navigate = useNavigate()
  return (
    <div className='flex flex-col gap-6 py-4 px-6 bg-[#121212] card rounded-md m-3 company-card' onClick={() => { window.location.href = "/companies/company/" + props.id }}>
      <div className='flex justify-between items-center'>
        <div className='flex gap-8 justify-start'>
          <Avatar radius='md' src={props.logo} size="lg" />
          <div>
            <h1 className='font-bold text-default-600 text-[20px]'>{props.name}</h1>
            <h4 className='font-semibold text-default-400'>{props.year}</h4>
          </div>
        </div>
        <div className='flex flex-col justify-center items-center'>
          <h1 className='font-bold text-primary-600 text-[18px]'>2.7K</h1>
          <h4 className='font-semibold text-default-400'>Followers</h4>
        </div>
      </div>
      <div className='flex flex-col gap-4'>
        <div className='flex md:flex-row flex-col md:gap-4 gap-2'>
          <div className='md:w-[32%] flex md:flex-col flex-row gap-20 md:gap-2'>
            <h1 className='font-bold'>Location</h1>
            <h4 className='font-semibold text-default-500'>{props.lieu}</h4>
          </div>
          <div className='md:w-[32%] flex md:flex-col flex-row gap-10 md:gap-2'>
            <h1 className='font-bold'>Company Size </h1>
            <h4 className='font-semibold text-default-500'>{props.size}</h4>
          </div>
          <div className='flex md:flex-col flex-row gap-20 md:gap-0'>
            <h1 className='font-bold'>Industry</h1>
            <h4 className='font-semibold text-default-500'>{props.secteur}</h4>
          </div>
        </div>
        <div>
          <h1 className='font-bold'>Description</h1>
          <div className='line-clamp-3 text-small text-default-400'>
            {props.description}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompanyCard
