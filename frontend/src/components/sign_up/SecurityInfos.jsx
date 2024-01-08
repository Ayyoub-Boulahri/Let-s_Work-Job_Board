import React from 'react'

function SecurityInfos() {
    return (
        <div className="slideshow flex flex-col gap-2">
            <p className="title py-4">Security Informations</p>
            <div className='input-group flex-col gap-4'>
                <label>Email</label>
                <input type="email" name="" id="" placeholder='Enter your Email'/>
                <label className='pt-4'>Password</label>
                <input type="password" name="" id="" placeholder='Enter a password'/>
                <label className='pt-4'>Confirmation</label>
                <input type="password" name="" id="" placeholder='Confirm your password'/>
            </div>
        </div>
    )
}

export default SecurityInfos