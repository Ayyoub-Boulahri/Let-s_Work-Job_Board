import React, { useEffect, useState } from 'react'
import CompanyProfileCard from './CompanyProfileCard';
import { Divider } from '@nextui-org/react';
import mac from '../../assets/mac.png';
import GlovoApp from '../../assets/GlovoApp.png'
import { getSuggestionsByIndustry } from '../../services/companyServices';

function Suggestions(props) {
    const [suggestions, setSuggestions] = useState(null)

    useEffect(() => {
        getSuggestionsByIndustry(props.industry, props.company_id)
            .then((suggestions) => setSuggestions(suggestions))
            .catch((error) => console.log(error))
    }, [])

    return (
        <div className='w-[40%] bg-[#191919] h-fit sticky rounded-lg px-4 pb-4'>
            <h2 className='text-[18px] font-bold p-4 text-default-600'>
                Suggestions
            </h2>
            {!suggestions ?
                <div className='min-h-[200px] flex justify-center items-center'>
                    No Suggestions found
                </div>
                : <div className='flex flex-col gap-4 min-h-fit max-h-[400px] overflow-y-scroll scrollbar-hide top-24 px-2'>
                    {suggestions?.map(ligne => (
                        <div>
                            <CompanyProfileCard name={ligne.company_name} city={ligne.city} country={ligne.country} logo={ligne.company_photo} followers={ligne.followersCount} id={ligne._id}/>
                            <Divider />
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}

export default Suggestions