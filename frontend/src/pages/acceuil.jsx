import React from 'react'
import "../css/acceuil.css"
import { IoAirplaneSharp } from "react-icons/io5";
import { Box } from '@radix-ui/themes';
import styles from '../style';

function Acceuil() {
  return (
    <div className="pt-20">
      <div className='header'>
        <div className='stack grid grid-cols-2 bg-center lg:px-[200px] md:px-[100px]'>
          <div className='content px-6 py-6'>
              <div className="bg-regal-green">
                left
              </div>
              <div className="bg-primary-500">
                right
              </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default Acceuil