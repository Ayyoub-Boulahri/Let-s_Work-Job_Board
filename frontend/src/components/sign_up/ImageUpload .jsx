import React, { useEffect, useState } from 'react';
import { FaPlusCircle } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import profile from "../../assets/profile.png"
import { useSelector, useDispatch } from 'react-redux';
import { PaginationItemType } from "@nextui-org/react";
import { setProfilePhoto, setCompanyProfilePhoto } from '../../stores/signUpStore';

const ImageUpload = (props) => {
    const dispatch = useDispatch();
    const employeeData = useSelector((state) => state.employeeData.value);
    const companyData = useSelector((state) => state.companyData.value);

    const [previewImage, setPreviewImage] = useState(profile);

    const typeUser = useSelector((state) => state.typeUser.value);

    useEffect(() => {
        if (employeeData.profilePhoto.blobObj && typeUser == "employee") {
            convertFormDataToDataURL(employeeData.profilePhoto.blobObj).then((dataURL) => {
                setPreviewImage(dataURL);
            });
        } else if (companyData.profilePhoto.blobObj && typeUser == "company") {
            convertFormDataToDataURL(companyData.profilePhoto.blobObj).then((dataURL) => {
                setPreviewImage(dataURL);
            });
        }
    }, [])

    const handleImageChange = (event) => {
        const photo = event.target.files[0];

        if (photo) {
            const reader = new FileReader();

            reader.onload = (e) => {
                setPreviewImage(e.target.result);
            };

            reader.readAsDataURL(photo);

            try {
                const formData = new FormData();
                formData.append('file', photo);
                if(typeUser == "employee")
                    dispatch(setProfilePhoto({ name: photo.name, blobObj: formData }));
                else
                    dispatch(setCompanyProfilePhoto({ name: photo.name, blobObj: formData }));

            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
    };

    const convertFormDataToDataURL = async (formData) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                resolve(reader.result);
            };
            reader.readAsDataURL(formData.get('file'));
        });
    };

    return (
        <div className="container slideshow">
            <p className="title pt-4">
                {typeUser === "employee" ? "Upload Your Photo" : "Company Logo or Photo"}
            </p>
            <div className="avatar-upload">
                <div className="avatar-edit">
                    <input
                        type="file"
                        id="imageUpload"
                        accept=".png, .jpg, .jpeg"
                        onChange={handleImageChange}
                    />
                    <label htmlFor="imageUpload" className='flex justify-center items-center w-[100%] h-[100%]'><MdEdit size={23} color='#161B22' className='mt-1 ml-[6px]' /></label>
                </div>
                <div className="avatar-preview">
                    <div
                        id="imagePreview"
                        style={{ backgroundImage: `url(${previewImage})` }}
                    ></div>
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
                <button onClick={props.pagination.onNext} className="bg-[#0099FF] font-semibold px-4 py-2 rounded-md">
                    Next
                </button>
            </div>
        </div>
    );
};

export default ImageUpload;
