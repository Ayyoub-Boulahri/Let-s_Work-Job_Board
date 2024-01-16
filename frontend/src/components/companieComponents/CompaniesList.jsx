import React, { useState } from 'react'
import mac from "../../assets/mac.png"
import CompanyCard from './CompanyCard';
import { Pagination } from '@nextui-org/react';

function CompaniesList() {
    const ListOfCompanies = [
        {
            id: 1,
            name: "Tech Innovators Inc.",
            industry: "Technology",
            founded_year: 2005,
            hq_location: "Silicon Valley, CA",
            website: "http://techinnovators.com",
            logo: mac
        },
        {
            id: 2,
            name: "GreenEco Solutions",
            industry: "Renewable Energy",
            founded_year: 2010,
            hq_location: "Austin, TX",
            website: "http://greeneco.com",
            logo: mac
        },
        {
            id: 3,
            name: "Global Pharma Solutions",
            industry: "Pharmaceuticals",
            founded_year: 1998,
            hq_location: "New York, NY",
            website: "http://globalpharma.com",
            logo: mac
        },
        {
            id: 4,
            name: "Creative Minds Studio",
            industry: "Design and Media",
            founded_year: 2012,
            hq_location: "Los Angeles, CA",
            website: "http://creativemindsstudio.com",
            logo: mac
        },
        {
            id: 5,
            name: "Foodie Ventures",
            industry: "Food and Beverage",
            founded_year: 2007,
            hq_location: "Chicago, IL",
            website: "http://foodieventures.com",
            logo: mac
        },
        {
            id: 6,
            name: "CleanTech Solutions",
            industry: "Environmental Services",
            founded_year: 2015,
            hq_location: "Seattle, WA",
            website: "http://cleantechsolutions.com",
            logo: mac
        },
        {
            id: 7,
            name: "Financial Wizards LLC",
            industry: "Finance",
            founded_year: 2000,
            hq_location: "New York, NY",
            website: "http://financialwizards.com",
            logo: mac
        },
        {
            id: 8,
            name: "Tech Innovators Inc.",
            industry: "Technology",
            founded_year: 2005,
            hq_location: "Silicon Valley, CA",
            website: "http://techinnovators.com",
            logo: mac
        },
        {
            id: 9,
            name: "GreenEco Solutions",
            industry: "Renewable Energy",
            founded_year: 2010,
            hq_location: "Austin, TX",
            website: "http://greeneco.com",
            logo: mac
        },
        {
            id: 10,
            name: "Global Pharma Solutions",
            industry: "Pharmaceuticals",
            founded_year: 1998,
            hq_location: "New York, NY",
            website: "http://globalpharma.com",
            logo: mac
        },
        {
            id: 11,
            name: "Creative Minds Studio",
            industry: "Design and Media",
            founded_year: 2012,
            hq_location: "Los Angeles, CA",
            website: "http://creativemindsstudio.com",
            logo: mac
        },
        {
            id: 12,
            name: "Foodie Ventures",
            industry: "Food and Beverage",
            founded_year: 2007,
            hq_location: "Chicago, IL",
            website: "http://foodieventures.com",
            logo: mac
        },
        {
            id: 13,
            name: "CleanTech Solutions",
            industry: "Environmental Services",
            founded_year: 2015,
            hq_location: "Seattle, WA",
            website: "http://cleantechsolutions.com",
            logo: mac
        },
        {
            id: 14,
            name: "Financial Wizards LLC",
            industry: "Finance",
            founded_year: 2000,
            hq_location: "New York, NY",
            website: "http://financialwizards.com",
            logo: mac
        }
    ];

    const companiesPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const totalCompanies = ListOfCompanies.length;
    const totalPages = Math.ceil(totalCompanies / companiesPerPage);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        const arrayCompanies = ListOfCompanies.slice(
            (newPage - 1) * companiesPerPage,
            newPage * companiesPerPage
        );
        setVisibleCompanies(arrayCompanies)
        window.scrollTo({ top: 400 });
    };

    const defaultCompanies = ListOfCompanies.slice(
        (currentPage - 1) * companiesPerPage,
        currentPage * companiesPerPage
    );

    const [visibleCompanies, setVisibleCompanies] = useState(defaultCompanies);
    return (
        <div className='flex flex-col gap-6 items-center'>
            <div className='flex flex-col gap-2'>
                {visibleCompanies.map(ligne => {
                    return <div key={ligne.id}>
                        <CompanyCard name={ligne.name} logo={ligne.logo} taille={ligne.founded_year} lieu={ligne.hq_location} secteur={ligne.industry} />
                    </div>

                })
                }
            </div>
            <Pagination
                total={totalPages}
                current={currentPage}
                onChange={handlePageChange}
            />
        </div>
    )
}

export default CompaniesList