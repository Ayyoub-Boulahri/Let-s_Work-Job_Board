import React, { useState } from 'react'
import { Divider } from '@nextui-org/react'
import { FaRegEdit } from 'react-icons/fa';
import { Input } from "@nextui-org/react";
import { companyInfosSchema } from '../../schemas/companyShema';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import CompanyInformations from './CompanyInformations';
import CompanyDescription from './CompanyDescription';
import SecureCompanyInfos from './SecureCompanyInfos';

function CompanyProfileInfos(props) {

    return (
        <div className='mt-4'>
            <CompanyInformations company={{company_id: props.company.company_id, company_name: props.company.company_name, city: props.company.city, country: props.company.country, industry: props.company.industry, phone: props.company.phone, address: props.company.address, founded_year: props.company.founded_year, size: props.company.size }} />

            <Divider className='bg-default-100 my-6' />

            <SecureCompanyInfos company={{email: props.company.email, password: props.company.password, company_id: props.company.company_id}}/>
            
            <Divider className='bg-default-100 my-6' />

            <CompanyDescription company={{ company_id: props.company.company_id, description: props.company.description}} />
        </div>
    )
}

export default CompanyProfileInfos