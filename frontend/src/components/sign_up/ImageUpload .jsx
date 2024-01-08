import React, { useState } from 'react';
import { FaPlusCircle } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import profile from "../../assets/profile.png"

const ImageUpload = () => {
    const [previewImage, setPreviewImage] = useState(profile);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        console.log(event.target.files[0])

        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                setPreviewImage(e.target.result);
            };

            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="container">
            <p className="title pt-4">Upload Your Photo</p>
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
        </div>
    );
};

export default ImageUpload;
