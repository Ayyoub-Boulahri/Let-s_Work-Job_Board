import React, { useEffect, useState, useRef } from 'react';
import { FaFileUpload } from "react-icons/fa";
import "../../css/CheckAnimationSuccess.css"
import { useSelector, useDispatch } from 'react-redux';
import { PaginationItemType } from "@nextui-org/react";
import { setCv, setFile } from '../../stores/signUpStore';
import { fileToBase64 } from '../../services/convertFunctions';
import { createCompany } from '../../services/companyServices';


const FileUploader = (props) => {
    const fileInputRef = useRef(null)
    const typeUser = useSelector((state) => state.typeUser.value);
    const dispatch = useDispatch();
    const employeeData = useSelector((state) => state.employeeData.value);
    const companyData = useSelector((state) => state.companyData.value);
    const [fileName, setFileName] = useState("")

    useEffect(() => {
        if (typeUser == "employee") {
            setFileName(employeeData.cv.name)
        } else {
            setFileName(companyData.file.name)
        }
    }, [])
    
    const handleFile = async (event) => {
        const file = event.target.files[0];
        setFileName(file.name);
    
        if (file) {
            try {
                const formData = new FormData();
                formData.append('file', file);
    
                const base64String = await fileToBase64(file);
    
                if (typeUser === "employee") {
                    dispatch(setCv({ name: file.name, blobObj: base64String }));
                } else {
                    dispatch(setFile({ name: file.name, blobObj: base64String }));
                }
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
    };
    

    const handleSelectClick = () => {
        fileInputRef.current.click();
    };


    const handelSubmit = () => {
        if (fileName != "" && typeUser == "employee")
            props.pagination.onNext()
        else if (fileName != "" && typeUser == "company") {
            createCompany(companyData)
            props.pagination.onNext()
        }
    }

    return (
        <div className='slideshow'>
            <p className="title py-4">
                {typeUser == "employee" ? "Upload Your CV" : "Upload File"}
            </p>
            <div className="input-group">
                <label className='text-justify'>Ensuring a secure environment for our users,
                    we require enterprises to submit authentic certificates or verifiable documentation,
                    validating their legitimacy and enhancing the safety of our platform</label>
            </div>
            <div className="mt-8 p-8 border-dashed border-2 border-gray-400 rounded-md text-center cursor-pointer"
                onClick={handleSelectClick}
            >
                <div className='flex flex-col items-center gap-4'>

                    {fileName == ""
                        ? <FaFileUpload color='#596475' size={60} />
                        : <div className="success-animation">
                            <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" /><path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" /></svg>
                        </div>
                    }
                    {!fileName == "" ? fileName
                        : <p className="mb-4">Click to select a file</p>
                    }
                    <input
                        type="file"
                        className="hidden"
                        onChange={handleFile}
                        ref={fileInputRef}
                        accept={".pdf"}
                    />
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
                {props.pagination.activePage != 1 && <button onClick={props.pagination.onPrevious} className='font-semibold bg-rose-600 px-4 py-2 rounded-md'>Back</button>}
                <button onClick={handelSubmit} className="bg-[#0099FF] font-semibold px-4 py-2 rounded-md">
                    {typeUser == "employee" ? "Next" : "Sign Up"}
                </button>
            </div>
        </div>
    )
};

export default FileUploader;
