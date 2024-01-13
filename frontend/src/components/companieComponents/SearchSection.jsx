import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Photo from "../../assets/about.png"
import CompanyCard from './CompanyCard';
import {Input} from "@nextui-org/react";
import { Divider} from "@nextui-org/react";
import {RadioGroup, Radio} from "@nextui-org/react";

export class SearchSection extends Component {
 
  render() {
    const ListOfCompanies = [
        {
          id: 1,
          name: "Tech Innovators Inc.",
          industry: "Technology",
          founded_year: 2005,
          hq_location: "Silicon Valley, CA",
          website: "http://techinnovators.com",
          logo: Photo
        },
        {
          id: 2,
          name: "GreenEco Solutions",
          industry: "Renewable Energy",
          founded_year: 2010,
          hq_location: "Austin, TX",
          website: "http://greeneco.com",
          logo: Photo
        },
        {
          id: 3,
          name: "Global Pharma Solutions",
          industry: "Pharmaceuticals",
          founded_year: 1998,
          hq_location: "New York, NY",
          website: "http://globalpharma.com",
          logo: Photo
        },
        {
          id: 4,
          name: "Creative Minds Studio",
          industry: "Design and Media",
          founded_year: 2012,
          hq_location: "Los Angeles, CA",
          website: "http://creativemindsstudio.com",
          logo: Photo
        },
        {
          id: 5,
          name: "Foodie Ventures",
          industry: "Food and Beverage",
          founded_year: 2007,
          hq_location: "Chicago, IL",
          website: "http://foodieventures.com",
          logo: Photo 
        },
        {
          id: 6,
          name: "CleanTech Solutions",
          industry: "Environmental Services",
          founded_year: 2015,
          hq_location: "Seattle, WA",
          website: "http://cleantechsolutions.com",
          logo: Photo 
        },
        {
          id: 7,
          name: "Financial Wizards LLC",
          industry: "Finance",
          founded_year: 2000,
          hq_location: "New York, NY",
          website: "http://financialwizards.com",
          logo: Photo
        }
      ];
      
    return (
      <section >
        <div className='py-10 px-16'> 
            <font className='font-bold text-[24px]'>
                Find the right Company
            </font>
        </div>
        <div className='flex'>
            <div className='w-[50%] px-20'>
                <font className='font-bold text-[18px]'>
                    Filter the companies
                </font>
                <div className='py-10'>
                    <span >
                        <Input type="industry" variant="bordered" label="city" />
                        <Divider className="my-14 bg-[#3D3D3D] sm:block hidden  " />
                    </span>
                    <span>
                        <Input type="industry" variant="bordered" label="Country" />
                        <Divider className="my-14 bg-[#3D3D3D] sm:block hidden  " />
                    </span>
                    <span>
                        <Input type="industry" variant="bordered" label="industry" />
                    </span>     
                </div>
                <div>
                    <RadioGroup
                        label="Overall size of the company "
                        color="warning"
                    >
                      <Radio value="small" >
                      1 - 50
                      </Radio>
                      <Radio value="small evantually" >
                      51 - 100
                      </Radio>
                      <Radio value="normal" >
                      101 - 1000
                      </Radio>
                      <Radio value="big" >
                      1001 - 5000
                      </Radio>
                      <Radio value="tokyo" >
                      5001 - 10000
                      </Radio>
                      <Radio value="tokyo" >
                      more than 10000
                      </Radio>
                    </RadioGroup>
                </div>
            </div>
            <div>
                {ListOfCompanies.map(ligne =>(
                    <CompanyCard name={ligne.name} logo={ligne.logo} taille={ligne.founded_year} lieu={ligne.hq_location} secteur={ligne.industry}/>
                ))
                }
            </div>
        </div>
      </section>
    )
  }
}

export default SearchSection