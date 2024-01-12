import PropTypes from 'prop-types'
import React, { Component } from 'react'

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
        },
        {
          id: 2,
          name: "GreenEco Solutions",
          industry: "Renewable Energy",
          founded_year: 2010,
          hq_location: "Austin, TX",
          website: "http://greeneco.com"
        },
        {
          id: 3,
          name: "Global Pharma Solutions",
          industry: "Pharmaceuticals",
          founded_year: 1998,
          hq_location: "New York, NY",
          website: "http://globalpharma.com"
        },
        {
          id: 4,
          name: "Creative Minds Studio",
          industry: "Design and Media",
          founded_year: 2012,
          hq_location: "Los Angeles, CA",
          website: "http://creativemindsstudio.com"
        },
        {
          id: 5,
          name: "Foodie Ventures",
          industry: "Food and Beverage",
          founded_year: 2007,
          hq_location: "Chicago, IL",
          website: "http://foodieventures.com"
        },
        {
          id: 6,
          name: "CleanTech Solutions",
          industry: "Environmental Services",
          founded_year: 2015,
          hq_location: "Seattle, WA",
          website: "http://cleantechsolutions.com"
        },
        {
          id: 7,
          name: "Financial Wizards LLC",
          industry: "Finance",
          founded_year: 2000,
          hq_location: "New York, NY",
          website: "http://financialwizards.com"
        }
      ];
      
    return (
      <section>
        <div>
            <h1>
                Discover the available companies
            </h1>

        </div>
      </section>
    )
  }
}

export default SearchSection