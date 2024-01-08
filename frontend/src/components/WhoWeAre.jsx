import React from 'react'
import profile from '../assets/profile.png'
import TeamCard from './TeamCard';

function WhoWeAre() {

    const teamInfos = [
        {
            id: 1,
            name: "Ayyoub Boulahri",
            bio: "ESTM Student",
            image: profile,
            links: {
                instagram: "https://www.instagram.com/",
                github: "https://www.github.com/",
                facebook: "https://www.facebook.com/"
            }
        }, 
        {
            id: 2,
            name: "Khalaf Drhourhi",
            bio: "ESTM Student",
            image: profile,
            links: {
                instagram: "https://www.instagram.com/",
                github: "https://www.github.com/",
                facebook: "https://www.facebook.com/"
            }
        }
    ]
    return (

        <div className='w-full flex flex-col items-center p-10'>
            <h2 className='text-[24px] font-bold text-gray-300 mb-10'>Who we are?</h2>
            <div className='flex sm:gap-20 gap-10 sm:flex-row flex-col'>
                {teamInfos.map((member, index) => (
                    <div key={index}>
                        <TeamCard member={member}/>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default WhoWeAre