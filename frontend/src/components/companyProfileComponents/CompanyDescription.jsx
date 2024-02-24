import React, { useState } from 'react'
import { Textarea } from "@nextui-org/react";
import { FaRegEdit } from 'react-icons/fa'
import { companyDescSchema } from '../../schemas/companyShema';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { updateCompanyInfos } from '../../services/companyServices';

function CompanyDescription(props) {
    const [isUpdateDesc, setIsUpdateDesc] = useState(false)

    const { register: descRegister, handleSubmit: handleDescSubmit, formState: { errors: descErrors } } = useForm({
        resolver: yupResolver(companyDescSchema)
    });

    const onSubmit = async (data) => {
        try {
            const response = await updateCompanyInfos(props.company.company_id, data)
            if (response.status === 200) {
                window.location.reload()
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='flex flex-col ml-4 gap-4 mb-10'>
            <div className="flex justify-normal gap-10 items-center">
                <h1 className="font-bold text-default-900 text-[20px]">Desctiption</h1>
                <FaRegEdit size={30} className='cursor-pointer hover:text-primary duration-300' onClick={() => setIsUpdateDesc((prev) => !prev)} />
            </div>            {
                !isUpdateDesc
                    ? <p className={`text-default-500 text-medium leading-[1.6]`}>{props.company.description}</p>
                    : <form onSubmit={handleDescSubmit(onSubmit)}>
                        <Textarea
                            label="Description"
                            variant="bordered"
                            placeholder="Enter the new compny description"
                            {...descRegister('description')}
                            classNames={{
                                input: "resize-none min-h-[150px] text-gray-400",
                            }}
                            defaultValue={props.company.description}
                        />
                        {descErrors.description && <label className="text-red-500">{descErrors.description.message}</label>}
                        <div className='flex justify-end mt-8 w-[100%]'>
                            <button className="bg-rose-500 font-semibold px-4 py-2 mr-8 rounded-md" onClick={() => setIsUpdateDesc(false)}>Cancel</button>
                            <button type='submit' className="bg-[#0099FF] font-semibold px-4 py-2 rounded-md">Save</button>
                        </div>
                    </form>

            }
        </div >
    )
}

export default CompanyDescription