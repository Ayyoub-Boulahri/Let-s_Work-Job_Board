import React from 'react'

function CompanyProfileCard(props) {
  return (
    <div className='flex bg-[#121212] rounded-md p-4 gap-4'>
        <div>
            <img src={props.logo} alt="company logo" className='w-[80px] rounded-full'/>
        </div>
        <div className='flex justify-between'>
        <div className='flex flex-col'>
            <div>
                <font className='font-bold'>
                    {props.name}
                </font>
            </div>
            <div className='flex gap-4'>
                
                <div className='flex flex-col'>
                    <font className='text-default-700'>
                        City
                    </font>
                    <font className='text-default-500'>
                        {props.city}
                    </font>
                </div>
                <div className='flex flex-col'>
                    <font className='text-default-700'>
                        Followers
                    </font>
                    <font className='text-default-500'>
                        {props.followers}
                    </font>
                </div>
            </div> 
        </div>
        </div>
    </div>
  )
}

export default CompanyProfileCard