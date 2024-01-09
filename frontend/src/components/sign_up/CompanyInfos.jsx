import React from 'react'

function CompanyInfos() {
    return (
        <div className="slideshow flex flex-col gap-2">
            <p className="title py-4">Company Informations</p>
            <div className='input-group flex flex-col'>
                <label htmlFor="">Company Name</label>
                <input type="text" id="" name="" placeholder='Company Nam' />
            </div>

            <div className='input-group flex w-full flex-col'>
                <label htmlFor="phoneNumber">Phone Number</label>
                <input type="tel" id="phoneNumber" name="phoneNumber" placeholder='Phone Number' defaultValue={"+212 "} />
            </div>

            <div className='input-group flex gap-6 w-full'>
                <div className='w-full'>
                    <label htmlFor="country">Country</label>
                    <select id="country" name="country" className='select'>
                        <option value="" disabled selected>Select a country</option>
                        <option value="MAR">Morocco</option>
                        <option value="USA">United States</option>
                        <option value="CAN">Canada</option>
                        <option value="GBR">United Kingdom</option>
                        <option value="AUS">Australia</option>
                        <option value="GER">Germany</option>
                        <option value="FRA">France</option>
                        <option value="JPN">Japan</option>
                    </select>
                </div>

                <div className='w-full'>
                    <label htmlFor="city">City</label>
                    <select id="city" name="city" className='select'>
                        <option value="" disabled selected>Select a city</option>
                        <option value="MAR">Morocco</option>
                        <option value="USA">United States</option>
                        <option value="CAN">Canada</option>
                        <option value="GBR">United Kingdom</option>
                        <option value="AUS">Australia</option>
                        <option value="GER">Germany</option>
                        <option value="FRA">France</option>
                        <option value="JPN">Japan</option>
                    </select>
                </div>
            </div>

            <div className='input-group'>
                <div>
                    <label htmlFor="address">Address</label>
                    <input type="text" id="address" name="address" placeholder="Enter Your Address" />
                </div>
            </div>
        </div>
    )
}

export default CompanyInfos