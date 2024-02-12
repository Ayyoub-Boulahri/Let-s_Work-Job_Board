import React, { useEffect, useState } from 'react';
import { MdEdit } from 'react-icons/md';
import profile from '../../assets/profile.png';
import coverDefault from '../../assets/cover_default.jpg';
import { useSelector, useDispatch } from 'react-redux';
import { PaginationItemType } from '@nextui-org/react';
import { setCompanyCoverPhoto, setCompanyProfilePhoto } from '../../stores/signUpStore';
import { convertBufferToDataURL, fileToBase64 } from '../../services/convertFunctions';
import { fetchAndConvertToBase64 } from '../../services/convertFunctions';

const CompanyPhotoUpload = (props) => {
    const dispatch = useDispatch();
    const companyData = useSelector((state) => state.companyData.value);
    
    const [previewProfileImage, setPreviewProfileImage] = useState(profile);
    const [previewCoverImage, setPreviewCoverImage] = useState(coverDefault);
    
    useEffect(() => {
        if (companyData.profilePhoto) {
            const dataURL = convertBufferToDataURL(companyData.profilePhoto);
            setPreviewProfileImage(dataURL);
        } else {
            fetchAndConvertToBase64(profile)
                .then(base64String => {
                    dispatch(setCompanyProfilePhoto(base64String));
                    setPreviewProfileImage(convertBufferToDataURL(base64String));
                })
                .catch(error => console.error('Error fetching or converting profile photo:', error));
        }
        if (companyData.company_cover) {
            const dataCover = convertBufferToDataURL(companyData.company_cover);
            setPreviewCoverImage(dataCover);
        } else {
            fetchAndConvertToBase64(coverDefault)
                .then(base64String => {
                    dispatch(setCompanyCoverPhoto(base64String));
                    setPreviewCoverImage(convertBufferToDataURL(base64String));
                })
                .catch(error => console.error('Error fetching or converting cover photo:', error));
        }
    }, [companyData.profilePhoto]);
    
    
    

    const handleImageChange = async (event) => {
        const photo = event.target.files[0];

        if (photo) {
            const reader = new FileReader();

            reader.onload = async (e) => {
                setPreviewProfileImage(e.target.result);

                try {
                    const formData = new FormData();
                    formData.append('file', photo);

                    const fileData = formData.get('file');
                    const base64String =
                        fileData instanceof Blob ? await fileToBase64(fileData) : fileData;

                    dispatch(setCompanyProfilePhoto(base64String));
                } catch (error) {
                    console.error('Error uploading file:', error);
                }
            };

            reader.readAsDataURL(photo);
        }
    };

    const handleCoverChange = async (event) => {
        const photo = event.target.files[0];

        if (photo) {
            const reader = new FileReader();

            reader.onload = async (e) => {
                setPreviewCoverImage(e.target.result);

                try {
                    const formData = new FormData();
                    formData.append('file', photo);

                    const fileData = formData.get('file');
                    const base64String =
                        fileData instanceof Blob ? await fileToBase64(fileData) : fileData;

                    dispatch(setCompanyCoverPhoto(base64String));
                } catch (error) {
                    console.error('Error uploading file:', error);
                }
            };

            reader.readAsDataURL(photo);
        }
    };

    return (
        <div className="container slideshow">
            <p className="title pt-4 mb-4">Company Logo or Photo</p>
            <div>
                <div className="w-full flex justify-center cover-upload relative">
                    <div
                        style={{
                            backgroundImage: `url(${previewCoverImage})`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                        }}
                        className="w-[96%] h-[200px] rounded-lg border-default-500 border-2"
                        id="coverPreview"
                    ></div>
                    <div className="avatar-edit bg-white rounded-full flex justify-center items-center">
                        <input
                            type="file"
                            id="coverUpload"
                            accept=".png, .jpg, .jpeg"
                            className="hidden"
                            onChange={handleCoverChange}
                        />
                        <label
                            htmlFor="coverUpload"
                            className="flex justify-center items-center w-[100%] h-[100%]"
                        >
                            <MdEdit size={23} color="#161B22" className="mt-1 ml-[6px]" />
                        </label>
                    </div>
                </div>
                <div className="avatar-upload relative mt-[-100px]">
                    <div className="avatar-edit">
                        <input
                            type="file"
                            id="imageUpload"
                            accept=".png, .jpg, .jpeg"
                            onChange={handleImageChange}
                        />
                        <label
                            htmlFor="imageUpload"
                            className="flex justify-center items-center w-[100%] h-[100%]"
                        >
                            <MdEdit size={23} color="#161B22" className="mt-1 ml-[6px]" />
                        </label>
                    </div>
                    <div className="avatar-preview">
                        <div
                            id="imagePreview"
                            style={{
                                backgroundImage: `url(${previewProfileImage})`,
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                            }}
                        ></div>
                    </div>
                </div>
            </div>
            <div className="mt-6">
                <ul className="flex gap-2 items-center justify-center">
                    {props.pagination.range.map((page) => {
                        if (
                            page !== PaginationItemType.NEXT &&
                            page !== PaginationItemType.PREV &&
                            page !== PaginationItemType.DOTS
                        ) {
                            return (
                                <li key={page} aria-label={`page ${page}`}>
                                    <button
                                        className={`w-3 h-3 bg-default-300 rounded-full ${props.pagination.activePage === page
                                            ? 'bg-rose-500'
                                            : ''
                                            }`}
                                    />
                                </li>
                            );
                        }
                    })}
                </ul>
            </div>

            <div className="flex justify-end gap-4 mt-4">
                <button
                    onClick={props.pagination.onPrevious}
                    className="font-semibold bg-rose-600 px-4 py-2 rounded-md"
                >
                    Back
                </button>
                <button
                    onClick={props.pagination.onNext}
                    className="bg-[#0099FF] font-semibold px-4 py-2 rounded-md"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default CompanyPhotoUpload;
