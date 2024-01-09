import React from 'react'

function CompanyDesc() {
    return (
        <div className="slideshow flex flex-col gap-2 min-h-[300px]">
            <p className="title py-4">Description</p>
            <div className='input-group flex flex-col gap-2'>
                <label className=''>Tell Us About Your Company</label>
                <div className='flex w-full gap-8 items-center'>
                    <textarea className="resize-none" name="" id="" cols="30" rows="10" placeholder='Description'></textarea>
                </div>
            </div>
        </div>
    )
}

export default CompanyDesc