import React from 'react'
import CompanyProfileCard from './CompanyProfileCard';
import { Divider } from '@nextui-org/react';
import mac from '../../assets/mac.png';
import GlovoApp from '../../assets/GlovoApp.png'

function Suggestions() {
    const suggestions = [
        {
            company_email: "info@example.com",
            ID_CITY: 1,
            INDUSTRY_ID: 2,
            PASSWORD: "securepassword",
            COMPANY_NAME: "Example Corp",
            DESCRIPTION: "A description of the company.",
            company_phone: "+1234567890",
            CERTIFICAT: "base64_encoded_certificate",
            ISAPPROVED: 1,
            ADDRESS: "123 Main St, City, Country",
            company_PHOTO: GlovoApp,
            company_cover: "base64_encoded_cover",
            FOUNDED_YEAR: 2000,
            followers: 2010,
            ID_SIZE: 3,
            country: "United States",
            city: "New York",
        },
        {
            company_email: "sales@company.com",
            ID_CITY: 2,
            INDUSTRY_ID: 1,
            PASSWORD: "strongpassword",
            COMPANY_NAME: "Sales Cops",
            DESCRIPTION: "We specialize in sales.",
            company_phone: "+9876543210",
            CERTIFICAT: "base64_encoded_certificate_sales",
            ISAPPROVED: 0,
            ADDRESS: "456 Market St, Town, Country",
            company_PHOTO: mac,
            company_cover: "base64_encoded_cover_sales",
            FOUNDED_YEAR: 2010,
            followers: 2010,
            ID_SIZE: 2,
            country: "United States",
            city: "New York",
        },
        {
            company_email: "info@example.com",
            ID_CITY: 1,
            INDUSTRY_ID: 2,
            PASSWORD: "securepassword",
            COMPANY_NAME: "Example Corp",
            DESCRIPTION: "A description of the company.",
            company_phone: "+1234567890",
            CERTIFICAT: "base64_encoded_certificate",
            ISAPPROVED: 1,
            ADDRESS: "123 Main St, City, Country",
            company_PHOTO: GlovoApp,
            company_cover: "base64_encoded_cover",
            FOUNDED_YEAR: 2000,
            followers: 2010,
            ID_SIZE: 3,
            country: "United States",
            city: "New York",
        },
        {
            company_email: "info@example.com",
            ID_CITY: 1,
            INDUSTRY_ID: 2,
            PASSWORD: "securepassword",
            COMPANY_NAME: "Example Corp",
            DESCRIPTION: "A description of the company.",
            company_phone: "+1234567890",
            CERTIFICAT: "base64_encoded_certificate",
            ISAPPROVED: 1,
            ADDRESS: "123 Main St, City, Country",
            company_PHOTO: mac,
            company_cover: "base64_encoded_cover",
            FOUNDED_YEAR: 2000,
            followers: 2010,
            ID_SIZE: 3,
            country: "United States",
            city: "New York",
        },
    ];
    return (
        <div className='w-[40%] bg-[#191919] rounded-lg px-4 pb-4'>
            <h2 className='text-[18px] font-bold p-4 text-default-600'>
                Suggestions
            </h2>
            {suggestions.length === 0 ?
                <div>
                    NO DATA FOUND
                </div>
                : <div className='flex flex-col gap-4 h-[400px] overflow-y-scroll sticky top-24 px-2'>
                    {suggestions.map(ligne => (
                        <div>
                            <CompanyProfileCard name={ligne.COMPANY_NAME} city={ligne.city} country={ligne.country} logo={ligne.company_PHOTO} followers={ligne.followers} />
                            <Divider />
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}

export default Suggestions