import PropTypes from 'prop-types'
import React, { Component } from 'react'
import CompanyPhoto from '../../assets/Companies.svg'
import { Input } from "@nextui-org/react";
import { IoIosSearch } from "react-icons/io";
import '../../css/card.css'


function CompanyCard(props) {
  return (
    <div className='flex flex-col gap-2 p-8 bg-[#121212] card rounded-md m-3 company-card'>
      <div className='flex gap-3'>
        <img src={props.logo} className='w-[100px]' alt="company photo"/>
        <h1 className='text-[20px]'>{props.name}</h1>
      </div>
      <div className='flex gap-6 justify-between'>
          <div>
            <h1 className='font-bold'>Location</h1>
            <p>{props.lieu}</p>
          </div>
          <div>
            <h1 className='font-bold'>Company Size </h1>
            <p>{props.taille}</p>
          </div>
          <div>
            <h1 className='font-bold'>Industry</h1>
            <p>{props.secteur}</p>
          </div>
      </div>
    </div>
  )
}

export default CompanyCard
