import React from 'react'
import { Input, link } from "@nextui-org/react";
import { Divider } from "@nextui-org/react";
import { RadioGroup, Radio } from "@nextui-org/react";
import CompaniesList from './CompaniesList';

const SearchSection = () => {



  return (
    <div>
      <div className='py-10'>
        <p className='font-bold text-[24px]'>
          Find the right Company
        </p>
      </div>
      <div className='flex gap-10'>
        <div className='w-[50%] px-10'>
          <p className='font-bold text-[18px]'>
            Filter the companies
          </p>
          <div className='py-10'>
            <span >
              <Input type="industry" variant="bordered" label="city" />
              <Divider className="my-14 bg-[#3D3D3D] sm:block hidden  " />
            </span>
            <span>
              <Input type="industry" variant="bordered" label="Country" />
              <Divider className="my-14 bg-[#3D3D3D] sm:block hidden  " />
            </span>
            <span>
              <Input type="industry" variant="bordered" label="industry" />
            </span>
          </div>
          <div>
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