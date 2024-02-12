import React from 'react';
import styles from '../style'
import { Input } from '@nextui-org/react';
import { SiAddthis } from "react-icons/si";
import SkillItem from '../components/SkillItem';

const NewOffer = () => {
  return (
    <div className={`${styles.flexStart} ${styles.paddingX} md:px-96 bg-section-dark-bg pt-36 xl:pb-4`}>
      <div className={`${styles.boxWidth}`}>
        <div className='bg-[#18181B] rounded-md px-6 py-4 flex flex-col gap-6'>

          <div className="flex gap-4 items-center">
            <h1 className='text-[20px] text-default-600 w-[20%]'>Title</h1>
            <input type="text" className='bg-[#27272A] rounded-md p-2 outline-none w-full' placeholder='Enter the job title' />
          </div>

          <div className="flex gap-4 items-center">
            <h1 className='text-[20px] text-default-600 w-[20%]'>Grade</h1>
            <input type="text" className='bg-[#27272A] rounded-md p-2 outline-none w-full' placeholder='Enter the position grade' />
          </div>

          <div className="flex gap-4 items-center">
            <h1 className='text-[20px] text-default-600 w-[20%]'>Job Type</h1>
            <select className='bg-[#27272A] rounded-md p-2 outline-none w-full'>
              <option value="">Full time Job</option>
            </select>
          </div>

          <div className="flex gap-4 items-center">
            <h1 className='text-[20px] text-default-600 w-[28%]'>Salary</h1>
            <Input
              placeholder="0.00"
              labelPlacement="outside"
              startContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">$</span>
                </div>
              }
              endContent={
                <div className="flex items-center">
                  <select className="outline-none border-0 bg-transparent text-default-400 text-small">
                    <option>USD</option>
                    <option>ARS</option>
                    <option>EUR</option>
                  </select>
                </div>
              }
              type="number"
            />
            <h1 className='text-[20px] text-default-600'>per</h1>
            <select
              className="outline-none border-0 bg-[#27272A] p-2 rounded-md text-default-400 text-small"
            >
              <option value="Year">Year</option>
              <option value="month">month</option>
              <option value="day">day</option>
              <option value="hour">hour</option>
            </select>
          </div>

          <div className="flex gap-4 items-center">
            <h1 className='text-[20px] text-default-600 w-[20%]'>Deadline</h1>
            <input type="date" className='bg-[#27272A] rounded-md p-2 outline-none w-full' />
          </div>

          <div className="flex flex-col gap-4 justify-center">
            <h1 className='text-[20px] text-default-600'>Description</h1>
            <textarea cols="30" rows="10" className='bg-[#27272A] rounded-md p-2 outline-none w-full resize-none'></textarea>
          </div>

          <div className="flex flex-col gap-4 justify-center">
            <h1 className='text-[20px] text-default-600'>Required Skills</h1>
            <div className="flex gap-4 items-center">
              <select className='bg-[#27272A] rounded-md p-2 outline-none w-full'>
                <option value="Full-time">Full-time</option>
                <option value="Contract">Contract</option>
                <option value="Part-time">Part-time</option>
                <option value="Temporary">Temporary</option>
              </select>
              <SiAddthis size={30} className='cursor-pointer mr-2' />
            </div>
            <div className="flex">
              <SkillItem skill="Html" />
              <SkillItem skill="JavaScript" />
              <SkillItem skill="Adobe After Effects" />
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button className='bg-rose-500 px-4 py-2 rounded-md'>Cancel</button>
            <button className='bg-primary-500 px-4 py-2 rounded-md'>Publish</button>
          </div>

        </div>
      </div>
    </div>
  );
};
export default NewOffer;
