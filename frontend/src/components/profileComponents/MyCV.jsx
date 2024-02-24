import React from 'react';
import { convertBase64ToUrlFile, fileToBase64 } from '../../services/convertFunctions';
import work_boy from '../../assets/work_boy.png';
import { Divider, Button } from "@nextui-org/react";
import { updateEmployeeCv } from '../../services/employeeServices';
import { useSelector } from 'react-redux';
import { FaRegEdit } from 'react-icons/fa';

function MyCV(props) {
    const authInfo = useSelector((state) => state.isAuthenticated.value)

    const handleFile = async (event) => {
        const file = event.target.files[0];

        if (file) {
            try {
                const formData = new FormData();
                formData.append('file', file);
                const base64String = await fileToBase64(file);
                const response = await updateEmployeeCv(authInfo?.userId, base64String)
                if (response.status === 200)
                    window.location.reload();
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
    };

    return (
        <div className='flex flex-col'>
            <div className='flex justify-between'>
                <div className='p-2 text-sm text-[20px]'>
                    <h1 className=' font-medium text-blue-600 dark:text-blue-500 '>Degrees</h1>
                    <p className='mt-2'>Enhance your profile on <b>Let's Work</b> by updating your educational background and enriching your academic achievements.</p>
                </div>
                <img src={work_boy} alt="" className='w-32' />
            </div>
            <Divider className="my-4 " />
            <label htmlFor="cvInput">
                <div className='flex items-center justify-end mb-4 hover:text-blue-500 duration-300 cursor-pointer'>
                    <FaRegEdit size={30} />
                </div>
            </label>
            <input type="file" id='cvInput' accept=".pdf" className='hidden' onChange={handleFile} />
            <div className="w-full max-w-4xl mx-auto">
                <iframe src={convertBase64ToUrlFile(props.userInfos.cv)} title='kdksqf' className='w-full h-screen' />
            </div>

        </div>

    );
}

export default MyCV;
