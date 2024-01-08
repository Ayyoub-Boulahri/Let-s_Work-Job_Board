import React, { useState, useRef } from 'react';
import { FaFileUpload } from "react-icons/fa";
import "../../css/CheckAnimationSuccess.css"

const FileUploader = () => {
    const fileInputRef = useRef(null)
    const [file, setfile] = useState("")

    const handleFile = (event) => {
        setfile(event.target.files[0].name)
        console.log(event.target.files[0].name)
        console.log(file)
    }

    const handleSelectClick = () => {
        // Trigger the file input click event
        fileInputRef.current.click();
    };

    return (
        <div className="mt-8 p-8 border-dashed border-2 border-gray-400 rounded-md text-center cursor-pointer"
            onClick={handleSelectClick}
        >
            <div className='flex flex-col items-center gap-4'>
                
                { file == "" 
                    ?   <FaFileUpload color='#596475' size={60}/>
                    :   <div class="success-animation">
                            <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" /><path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" /></svg>
                        </div>
                }

                {file}
                <p className="mb-4">Drag and drop your CV here or click to select a file</p>
                <input
                    type="file"
                    className="hidden"
                    onChange={handleFile}
                    ref={fileInputRef}
                />
            </div>
        </div>
    )
};

export default FileUploader;
