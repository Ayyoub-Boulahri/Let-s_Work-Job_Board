import React from 'react'
import { PaginationItemType } from "@nextui-org/react";
import { setDescription } from '../../stores/signUpStore';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';

function CompanyDesc(props) {
    const dispatch = useDispatch();
    const companyData = useSelector((state) => state.companyData.value);

    const schema = yup.object().shape({
        description: yup.string().min(500, "Your description must be at least 500 characters").required()
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data) => {
        try {
            dispatch(setDescription(data.description))
            props.pagination.onNext()
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="slideshow flex flex-col gap-2 min-h-[300px]">
                <p className="title py-2">Description</p>
                <div className='input-group flex flex-col gap-2'>
                    <label className=''>Provide a comprehensive overview of your company, furnishing detailed insights that empower employees to grasp the intricacies of its operations, values, and goals.</label>
                    {errors.description && <label style={{ color: '#E11D48' }}>{errors.description.message}</label>}
                    <div className='flex w-full gap-8 items-center'>
                        <textarea className="resize-none" cols="30" rows="10" defaultValue={companyData.description} placeholder='Tell Us About your company' {...register("description")}></textarea>
                    </div>
                </div>

                <div className='mt-6'>
                    <ul className="flex gap-2 items-center justify-center">
                        {props.pagination.range.map((page) => {
                            if (page !== PaginationItemType.NEXT && page !== PaginationItemType.PREV && page !== PaginationItemType.DOTS) {
                                return (
                                    <li key={page} aria-label={`page ${page}`}>
                                        <button
                                            className={`w-3 h-3 bg-default-300 rounded-full ${props.pagination.activePage === page ? 'bg-rose-500' : ''}`}
                                        />
                                    </li>
                                );
                            }
                        })}
                    </ul>
                </div>

                <div className='flex justify-end gap-4 mt-4'>
                    <button onClick={props.pagination.onPrevious} className='font-semibold bg-rose-600 px-4 py-2 rounded-md'>Back</button>
                    <button type='submit' className="bg-[#0099FF] font-semibold px-4 py-2 rounded-md">
                        Next
                    </button>
                </div>
            </div>
        </form>
    )
}

export default CompanyDesc