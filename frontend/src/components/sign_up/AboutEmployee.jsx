import React from 'react'

function AboutEmployee() {
    return (
        <div className="slideshow flex flex-col gap-2 min-h-[300px]">
            <p className="title py-4">About Me</p>
            <div className='input-group flex flex-col gap-2'>
                <label className=''>Your description is key in connecting you with the right job opportunities, helping companies understand your unique skills and qualifications</label>
                <div className='flex w-full gap-8 items-center'>
                    <textarea className="resize-none" name="" id="" cols="30" rows="10" placeholder='Tell Us About your self'></textarea>
                </div>
            </div>
        </div>
    )
}

export default AboutEmployee