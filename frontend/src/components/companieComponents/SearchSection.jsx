import React, { useState } from 'react'
import { Input, link } from "@nextui-org/react";
import { Divider } from "@nextui-org/react";
import { RadioGroup, Radio } from "@nextui-org/react";
import CompaniesList from './CompaniesList';
import { RiListSettingsLine } from "react-icons/ri";

const SearchSection = () => {
  const [showFilters, setShowFilters] = useState(false)

  return (
    <div>
      <div className='py-10'>
        <p className='font-bold text-[24px]'>
          Find the right Company
        </p>
      </div>
      <div className='flex gap-10 md:flex-row flex-col'>
        <div className='md:w-[50%] md:px-10 px-6'>
          <div className='flex justify-between'>
            <p className='font-bold text-[18px]'>
              Filter the companies
            </p>
            <RiListSettingsLine size={26} className="cursor-pointer hover:text-default-500 duration-300 md:hidden flex" onClick={() => setShowFilters((prev) => !prev)} />
          </div>
          <div className={`py-10 flex flex-col gap-4 ${showFilters ? "flex" : "md:flex hidden"}`}>
            <span >
              <Input type="industry" variant="bordered" label="city" />
              <Divider className="md:my-12 my-4 bg-[#3D3D3D] block" />
            </span>
            <span>
              <Input type="industry" variant="bordered" label="Country" />
              <Divider className="md:my-12 my-4 bg-[#3D3D3D] block" />
            </span>
            <span>
              <Input type="industry" variant="bordered" label="industry" />
            </span>
          </div>
          <div className={`${showFilters ? "block" : "md:block hidden"}`}>
            <RadioGroup
              label="Overall size of the company "
              color="warning"
            >
              <Radio value="small" >
                1 - 50
              </Radio>
              <Radio value="small evantually" >
                51 - 100
              </Radio>
              <Radio value="normal" >
                101 - 1000
              </Radio>
              <Radio value="big" >
                1001 - 5000
              </Radio>
              <Radio value="tokyo" >
                5001 - 10000
              </Radio>
              <Radio value="kyo" >
                more than 10000
              </Radio>
            </RadioGroup>
          </div>
        </div>
        <CompaniesList />
      </div>
    </div>
  )
}

export default SearchSection