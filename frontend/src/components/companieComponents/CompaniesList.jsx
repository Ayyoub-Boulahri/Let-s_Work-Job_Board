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
            logo: mac,
            size: "+1000",
            description: "Tech Innovators Inc. is an industry-leading technology powerhouse with a rich history of groundbreaking achievements. Established in 2005 in the heart of Silicon Valley, we have been at the forefront of innovation, pushing the boundaries of what's possible in the realms of software development, hardware engineering, and cutting-edge artificial intelligence. Our diverse team of over 100,000 skilled professionals is dedicated to shaping the future and delivering transformative solutions to businesses across a myriad of industries. With a commitment to excellence, collaboration, and forward-thinking, Tech Innovators Inc. remains a driving force in the ever-evolving landscape of technology."

        },
        {
            id: 2,
            name: "GreenEco Solutions",
            industry: "Renewable Energy",
            founded_year: 2010,
            hq_location: "Austin, TX",
            website: "http://greeneco.com",
            logo: mac,
            size: "+1000",
            description: "Tech Innovators Inc. is an industry-leading technology powerhouse with a rich history of groundbreaking achievements. Established in 2005 in the heart of Silicon Valley, we have been at the forefront of innovation, pushing the boundaries of what's possible in the realms of software development, hardware engineering, and cutting-edge artificial intelligence. Our diverse team of over 100,000 skilled professionals is dedicated to shaping the future and delivering transformative solutions to businesses across a myriad of industries. With a commitment to excellence, collaboration, and forward-thinking, Tech Innovators Inc. remains a driving force in the ever-evolving landscape of technology."

        },
        {
            id: 3,
            name: "Global Pharma Solutions",
            industry: "Pharmaceuticals",
            founded_year: 1998,
            hq_location: "New York, NY",
            website: "http://globalpharma.com",
            logo: mac,
            size: "+1000",
            description: "Tech Innovators Inc. is an industry-leading technology powerhouse with a rich history of groundbreaking achievements. Established in 2005 in the heart of Silicon Valley, we have been at the forefront of innovation, pushing the boundaries of what's possible in the realms of software development, hardware engineering, and cutting-edge artificial intelligence. Our diverse team of over 100,000 skilled professionals is dedicated to shaping the future and delivering transformative solutions to businesses across a myriad of industries. With a commitment to excellence, collaboration, and forward-thinking, Tech Innovators Inc. remains a driving force in the ever-evolving landscape of technology."

        },
        {
            id: 4,
            name: "Creative Minds Studio",
            industry: "Design and Media",
            founded_year: 2012,
            hq_location: "Los Angeles, CA",
            website: "http://creativemindsstudio.com",
            logo: mac,
            size: "+1000",
            description: "Tech Innovators Inc. is an industry-leading technology powerhouse with a rich history of groundbreaking achievements. Established in 2005 in the heart of Silicon Valley, we have been at the forefront of innovation, pushing the boundaries of what's possible in the realms of software development, hardware engineering, and cutting-edge artificial intelligence. Our diverse team of over 100,000 skilled professionals is dedicated to shaping the future and delivering transformative solutions to businesses across a myriad of industries. With a commitment to excellence, collaboration, and forward-thinking, Tech Innovators Inc. remains a driving force in the ever-evolving landscape of technology."

        },
        {
            id: 5,
            name: "Foodie Ventures",
            industry: "Food and Beverage",
            founded_year: 2007,
            hq_location: "Chicago, IL",
            website: "http://foodieventures.com",
            logo: mac,
            size: "+1000",
            description: "Tech Innovators Inc. is an industry-leading technology powerhouse with a rich history of groundbreaking achievements. Established in 2005 in the heart of Silicon Valley, we have been at the forefront of innovation, pushing the boundaries of what's possible in the realms of software development, hardware engineering, and cutting-edge artificial intelligence. Our diverse team of over 100,000 skilled professionals is dedicated to shaping the future and delivering transformative solutions to businesses across a myriad of industries. With a commitment to excellence, collaboration, and forward-thinking, Tech Innovators Inc. remains a driving force in the ever-evolving landscape of technology."

        },
        {
            id: 6,
            name: "CleanTech Solutions",
            industry: "Environmental Services",
            founded_year: 2015,
            hq_location: "Seattle, WA",
            website: "http://cleantechsolutions.com",
            logo: mac,
            size: "+1000",
            description: "Tech Innovators Inc. is an industry-leading technology powerhouse with a rich history of groundbreaking achievements. Established in 2005 in the heart of Silicon Valley, we have been at the forefront of innovation, pushing the boundaries of what's possible in the realms of software development, hardware engineering, and cutting-edge artificial intelligence. Our diverse team of over 100,000 skilled professionals is dedicated to shaping the future and delivering transformative solutions to businesses across a myriad of industries. With a commitment to excellence, collaboration, and forward-thinking, Tech Innovators Inc. remains a driving force in the ever-evolving landscape of technology."

        },
        {
            id: 7,
            name: "Financial Wizards LLC",
            industry: "Finance",
            founded_year: 2000,
            hq_location: "New York, NY",
            website: "http://financialwizards.com",
            logo: mac,
            size: "+1000",
            description: "Tech Innovators Inc. is an industry-leading technology powerhouse with a rich history of groundbreaking achievements. Established in 2005 in the heart of Silicon Valley, we have been at the forefront of innovation, pushing the boundaries of what's possible in the realms of software development, hardware engineering, and cutting-edge artificial intelligence. Our diverse team of over 100,000 skilled professionals is dedicated to shaping the future and delivering transformative solutions to businesses across a myriad of industries. With a commitment to excellence, collaboration, and forward-thinking, Tech Innovators Inc. remains a driving force in the ever-evolving landscape of technology."

        },
        {
            id: 8,
            name: "Tech Innovators Inc.",
            industry: "Technology",
            founded_year: 2005,
            hq_location: "Silicon Valley, CA",
            website: "http://techinnovators.com",
            logo: mac,
            size: "+1000",
            description: "Tech Innovators Inc. is an industry-leading technology powerhouse with a rich history of groundbreaking achievements. Established in 2005 in the heart of Silicon Valley, we have been at the forefront of innovation, pushing the boundaries of what's possible in the realms of software development, hardware engineering, and cutting-edge artificial intelligence. Our diverse team of over 100,000 skilled professionals is dedicated to shaping the future and delivering transformative solutions to businesses across a myriad of industries. With a commitment to excellence, collaboration, and forward-thinking, Tech Innovators Inc. remains a driving force in the ever-evolving landscape of technology."

        },
        {
            id: 9,
            name: "GreenEco Solutions",
            industry: "Renewable Energy",
            founded_year: 2010,
            hq_location: "Austin, TX",
            website: "http://greeneco.com",
            logo: mac,
            size: "+1000",
            description: "Tech Innovators Inc. is an industry-leading technology powerhouse with a rich history of groundbreaking achievements. Established in 2005 in the heart of Silicon Valley, we have been at the forefront of innovation, pushing the boundaries of what's possible in the realms of software development, hardware engineering, and cutting-edge artificial intelligence. Our diverse team of over 100,000 skilled professionals is dedicated to shaping the future and delivering transformative solutions to businesses across a myriad of industries. With a commitment to excellence, collaboration, and forward-thinking, Tech Innovators Inc. remains a driving force in the ever-evolving landscape of technology."

        },
        {
            id: 10,
            name: "Global Pharma Solutions",
            industry: "Pharmaceuticals",
            founded_year: 1998,
            hq_location: "New York, NY",
            website: "http://globalpharma.com",
            logo: mac,
            size: "+1000",
            description: "Tech Innovators Inc. is an industry-leading technology powerhouse with a rich history of groundbreaking achievements. Established in 2005 in the heart of Silicon Valley, we have been at the forefront of innovation, pushing the boundaries of what's possible in the realms of software development, hardware engineering, and cutting-edge artificial intelligence. Our diverse team of over 100,000 skilled professionals is dedicated to shaping the future and delivering transformative solutions to businesses across a myriad of industries. With a commitment to excellence, collaboration, and forward-thinking, Tech Innovators Inc. remains a driving force in the ever-evolving landscape of technology."

        },
        {
            id: 11,
            name: "Creative Minds Studio",
            industry: "Design and Media",
            founded_year: 2012,
            hq_location: "Los Angeles, CA",
            website: "http://creativemindsstudio.com",
            logo: mac,
            size: "+1000",
            description: "Tech Innovators Inc. is an industry-leading technology powerhouse with a rich history of groundbreaking achievements. Established in 2005 in the heart of Silicon Valley, we have been at the forefront of innovation, pushing the boundaries of what's possible in the realms of software development, hardware engineering, and cutting-edge artificial intelligence. Our diverse team of over 100,000 skilled professionals is dedicated to shaping the future and delivering transformative solutions to businesses across a myriad of industries. With a commitment to excellence, collaboration, and forward-thinking, Tech Innovators Inc. remains a driving force in the ever-evolving landscape of technology."
,
        },
        {
            id: 12,
            name: "Foodie Ventures",
            industry: "Food and Beverage",
            founded_year: 2007,
            hq_location: "Chicago, IL",
            website: "http://foodieventures.com",
            logo: mac,
            size: "+1000",
            description: "Tech Innovators Inc. is an industry-leading technology powerhouse with a rich history of groundbreaking achievements. Established in 2005 in the heart of Silicon Valley, we have been at the forefront of innovation, pushing the boundaries of what's possible in the realms of software development, hardware engineering, and cutting-edge artificial intelligence. Our diverse team of over 100,000 skilled professionals is dedicated to shaping the future and delivering transformative solutions to businesses across a myriad of industries. With a commitment to excellence, collaboration, and forward-thinking, Tech Innovators Inc. remains a driving force in the ever-evolving landscape of technology."
,
        },
        {
            id: 13,
            name: "CleanTech Solutions",
            industry: "Environmental Services",
            founded_year: 2015,
            hq_location: "Seattle, WA",
            website: "http://cleantechsolutions.com",
            logo: mac,
            size: "+1000",
            description: "Tech Innovators Inc. is an industry-leading technology powerhouse with a rich history of groundbreaking achievements. Established in 2005 in the heart of Silicon Valley, we have been at the forefront of innovation, pushing the boundaries of what's possible in the realms of software development, hardware engineering, and cutting-edge artificial intelligence. Our diverse team of over 100,000 skilled professionals is dedicated to shaping the future and delivering transformative solutions to businesses across a myriad of industries. With a commitment to excellence, collaboration, and forward-thinking, Tech Innovators Inc. remains a driving force in the ever-evolving landscape of technology."

        },
        {
            id: 14,
            name: "Financial Wizards LLC",
            industry: "Finance",
            founded_year: 2000,
            hq_location: "New York, NY",
            website: "http://financialwizards.com",
            logo: mac,
            size: "+1000",
            description: "Tech Innovators Inc. is an industry-leading technology powerhouse with a rich history of groundbreaking achievements. Established in 2005 in the heart of Silicon Valley, we have been at the forefront of innovation, pushing the boundaries of what's possible in the realms of software development, hardware engineering, and cutting-edge artificial intelligence. Our diverse team of over 100,000 skilled professionals is dedicated to shaping the future and delivering transformative solutions to businesses across a myriad of industries. With a commitment to excellence, collaboration, and forward-thinking, Tech Innovators Inc. remains a driving force in the ever-evolving landscape of technology."

        }
    ];

    const companiesPerPage = 4;
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
        <div className='flex flex-col gap-6 items-center md:w-[50%]'>
            <div className='flex flex-col gap-2 md:w-[90%]'>
                {visibleCompanies.map(ligne => {
                    return <div key={ligne.id}>
                        <CompanyCard id={ligne.id} name={ligne.name} description={ligne.description} logo={ligne.logo} year={ligne.founded_year} size={ligne.size} lieu={ligne.hq_location} secteur={ligne.industry} />
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