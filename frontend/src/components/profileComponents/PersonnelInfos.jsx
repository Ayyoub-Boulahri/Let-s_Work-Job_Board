import React, { useState } from 'react';
import profile from '../../assets/work_boy.png';
import '../../css/profile.css';
import { Divider } from '@nextui-org/react';
import { FaRegEdit } from 'react-icons/fa';
import { Input } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import { Button } from "@nextui-org/react";

  function PersonnelInfos() {
  const List = [
    {
      id: 1,
      name: 'First name',
      text: 'khalaf',
    },
    {
      id: 2,
      name: 'Last name',
      text: 'drhourhi',
    },
    {
      id: 3,
      name: 'adresse',
      text: 'mansour agouray',
    },
    {
      id: 4,
      name: 'phone',
      text: '0631887261',
    },
    {
      id: 5,
      name: 'city',
      text: 'Meknes(Maroc)',
    },
  ];

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isAboutME, setIsAboutMe] = useState(true);

  return (
    <div className='flex flex-col '>
      <div className='flex'>
        <div className='p-2 text-sm h-[30%] text-[20px]'>
          <h1 className=' font-medium text-blue-600 dark:text-blue-500 '>Profile</h1>
          <p className='mt-2'>
            Optimisez votre expérience sur <b>let's work</b> en mettant à jour vos données professionnelles
          </p>
        </div>
        <span className='w-[40%]'>
          <img src={profile} alt='' className='w-32 ' />
        </span>
      </div>
      <Divider className='my-4' />
      <div className='flex flex-row text-[24px] text-gray-300'>
        <h1>About Me</h1>
        <div className='flex items-center pl-3 hover:text-blue-500 duration-300 cursor-pointer'>
          <FaRegEdit onClick={() => setIsAboutMe((prev) => !prev)} />
        </div>
      </div>
      {isAboutME == true ?
        <div className='py-5 '>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos voluptas repellendus veniam perspiciatis inventore dicta ipsam eveniet est! Soluta debitis laborum tempora deserunt facilis nulla expedita a maxime esse molestiae.
          &#13;Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti voluptatem corporis voluptatum iste numquam doloremque nihil suscipit explicabo modi harum ad error nostrum, eveniet reiciendis ducimus repellat? Praesentium, exercitationem nemo!
        </div>
        :
        <div className='mt-4'>
          <Textarea
            label="Description"
            variant="bordered"
            placeholder="Enter your description"
            disableAnimation
            classNames={{
              input: "resize-none min-h-[100px] text-gray-400",
            }}
            defaultValue='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos voluptas repellendus veniam perspiciatis inventore dicta ipsam eveniet est! Soluta debitis laborum tempora deserunt facilis nulla expedita a maxime esse molestiae.&#13;Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti voluptatem corporis voluptatum iste numquam doloremque nihil suscipit explicabo modi harum ad error nostrum, eveniet reiciendis ducimus repellat? Praesentium, exercitationem nemo!'
          />
        </div>
      }
      <Divider className='my-4' />
      <div className='flex flex-row text-[24px] text-gray-300'>
        <h1>My Informations</h1>
        <div className='flex items-center pl-3 hover:text-blue-500 duration-300 cursor-pointer'>
          <FaRegEdit onClick={() => setIsFormVisible((prev) => !prev)} />
        </div>
      </div>
      {!isFormVisible ?
        <div>
          {List.map((tab) => (
            <div key={tab.id}>
              <div className='text-[14px] pt-3 text-lg font-extrabold'>{tab.name}</div>
              <p className='text-[12px] font-thin'>{tab.text}</p>
            </div>
          ))}
        </div> :
        <div>
          {List.map((tab) => (
            <div key={tab.id}>
              <div className='text-[14px] pt-3 text-lg font-extrabold'>{tab.name}</div>
              <Input type="email" variant={"underlined"} className='w-[50%]' label={tab.name} />
            </div>
          ))}
          <div className='flex justify-start  mt-8 justify-evenly'>
            <button className="bg-rose-500 font-semibold px-4 py-2 rounded-md">Cancel</button>
            <button className="bg-[#0099FF] font-semibold px-4 py-2 rounded-md">Save</button>
          </div>
        </div>
      }
    </div>
  );
}

export default PersonnelInfos;
