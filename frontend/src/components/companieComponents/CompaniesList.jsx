import React, { useState, useEffect } from 'react'
import mac from "../../assets/mac.png"
import CompanyCard from './CompanyCard';
import { Pagination } from '@nextui-org/react';
import { getSomeCompanies, getTotalCompanies } from '../../services/companyServices';

function CompaniesList() {
    const [currentPage, setCurrentPage] = useState(1);
    const [visibleCompanies, setVisibleCompanies] = useState(null);
    const [totalPages, setTotalPages] = useState(1)
    const companyPerPage = 5;
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        window.scrollTo({ top: 400 });
    };

    useEffect(() => {
        const getCompanies = async () => {
            try {
                getSomeCompanies({
                    "_id": 1,
                    "city": 1,
                    "country": 1,
                    "industry": 1,
                    "company_name": 1,
                    "description": 1,
                    "currency": 1,
                    "company_photo": 1,
                    "founded_year": 1,
                    "size": 1,
                }, (currentPage - 1) * companyPerPage, companyPerPage).then(response => {
                    setVisibleCompanies(response);
                }).catch(error => {
                    console.error(error);
                });
            } catch (error) {
                console.error(error)
            }
        }

        const getNumCompanies = async () => {
            getTotalCompanies().then(response => {
                setTotalPages(Math.ceil(response / companyPerPage))
            }).catch(error => {
                console.log(error)
            });
        }

        getNumCompanies()
        getCompanies()
    }, [currentPage])


    return (
        <div className='flex flex-col gap-6 items-center md:w-[50%]'>
            <div className='flex flex-col gap-2 md:w-[90%]'>
                {visibleCompanies?.map(ligne => {
                    return <div key={ligne.id}>
                        <CompanyCard id={ligne._id} name={ligne.company_name} description={ligne.description} logo={ligne.company_photo} year={ligne.founded_year} size={ligne.size} city={ligne.city} country={ligne.country} industry={ligne.industry} />
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