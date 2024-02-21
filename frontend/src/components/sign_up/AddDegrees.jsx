import React from 'react'
import { Divider, input } from "@nextui-org/react";
import { SiAddthis } from "react-icons/si";
import { PaginationItemType } from "@nextui-org/react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { addDegree, removeDegree } from '../../stores/signUpStore';
import { useDispatch, useSelector } from 'react-redux';
import { RiDeleteBin6Fill } from "react-icons/ri";

function AddDegrees(props) {
    const dispatch = useDispatch();
    const employeeData = useSelector((state) => state.employeeData.value);

    const schema = yup.object().shape({
        degree: yup.string().required("you must enter a degree"),
        school: yup.string().required("you must enter a university or school name"),
        year: yup.string().required("you must enter the year you graduated"),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    
    const aa = []
    const getNextId = () => {
        var id = 1;
        if(employeeData.degrees.length !== 0) {
            employeeData.degrees.forEach((degree) => {
                id = degree.id;
            })
            id++;
        }
        return id;
    }
    
    const onSubmit = async (data) => {
        var allInputs = document.querySelectorAll('input');
        var formattedData = {
            id_education: getNextId(),
            degreeName: data.degree,
            school: data.school,
            year: data.year
        }
        try {
            dispatch(addDegree(formattedData))
            allInputs.forEach(input => input.value = '');
        } catch (err) {
            console.log(err);
        }
    }

    const handelRemoveDegree = (degree) => {
        dispatch(removeDegree(degree));
    }

    return (
        <div className="slideshow flex flex-col gap-2 min-h-[300px]">
            <p className="title py-4">Education Degrees </p>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='input-group flex flex-col gap-2'>
                        <label>Tell Us about your Education level or degrees ? <span className='text-[20px]'>🎓</span></label>
                        <div className='flex flex-col w-full gap-2'>
                            <div className='flex w-full gap-4 items-center'>
                                <input type="text" placeholder='Your Educatin Degree' className='w-[150px]' {...register("degree")} />
                                <button type='submit'><SiAddthis size={30} className='cursor-pointer mr-2' /></button>
                            </div>
                            <div className='flex gap-4'>

                                <input type="text" placeholder="university or school" style={{ width: '70%' }} {...register("school")} />
                                <input type="number" placeholder='Year' style={{ width: '30%' }} {...register("year")} />
                            </div>
                        </div>
                    </div>
                </form>

                {/* the errors label */}

                <label style={{ color: '#E11D48' }}>
                    {
                        errors.degree ? errors.degree.message
                            : errors.school ? errors.school.message
                                : errors.year ? errors.year.message : ""
                    }
                </label>



                <Divider className="my-4 bg-[#3D3D3D]" />
                <div className='min-h-[130px]'>
                    {
                        employeeData.degrees.length !== 0 &&
                        <Table aria-label="Example static collection table">
                            <TableHeader>
                                <TableColumn>Degree</TableColumn>
                                <TableColumn>Etablissement</TableColumn>
                                <TableColumn>Year</TableColumn>
                                <TableColumn></TableColumn>
                            </TableHeader>
                            <TableBody>
                                {employeeData.degrees.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.degreeName}</TableCell>
                                        <TableCell>{item.school}</TableCell>
                                        <TableCell>{item.year}</TableCell>
                                        <TableCell><RiDeleteBin6Fill className='cursor-pointer' color='#E11D48' size={16} onClick={() => handelRemoveDegree(item)}/></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    }
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
                <button type='submit' onClick={props.pagination.onNext} className="bg-[#0099FF] font-semibold px-4 py-2 rounded-md">
                    Next
                </button>
            </div>
        </div>
    )
}

export default AddDegrees