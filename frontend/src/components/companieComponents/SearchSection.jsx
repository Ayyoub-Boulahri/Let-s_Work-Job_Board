import React, { useEffect, useState } from 'react'
import { Input, link } from "@nextui-org/react";
import { Divider } from "@nextui-org/react";
import { RadioGroup, Radio } from "@nextui-org/react";
import CompaniesList from './CompaniesList';
import { RiListSettingsLine } from "react-icons/ri";
import { sizes } from '../../schemas/data';
import { useQuery } from '@tanstack/react-query';
import getAllIndustries from '../../services/industriesServices';
import { getCities, getCountriesNames } from "../../services/countriesServices";

const SearchSection = (props) => {
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({});
  const [searchCity, setSearchCity] = useState("")
  const [searchCountry, setSearchCountry] = useState("")


  const { data: industries, isLoading: isLoadingIndustries } = useQuery({
    queryKey: ["industries"],
    queryFn: () => getAllIndustries()
  })

  const { data: cities, isLoading: isLoadingCities } = useQuery({
    queryKey: ["cities", searchCity],
    queryFn: () => getCities(searchCity)
  })

  const { data: countries, isLoading: isLoadingCountries } = useQuery({
    queryKey: ["countries", searchCountry],
    queryFn: () => getCountriesNames(searchCountry)
  })


  const handleValueChange = (filter, value) => {
    setFilters(prevFilters => {
      if (value == "all") {
        if (prevFilters?.hasOwnProperty(filter)) {
          const { [filter]: removedFilter, ...remainingFilters } = prevFilters;
          return remainingFilters;
        } else {
          return prevFilters
        }
      } else {
        return {
          ...prevFilters,
          [filter]: value
        };
      }

    });
  }


  const handleCityChange = (cityValue) => {
    setSearchCity(cityValue)
    let city = "all"
    if (cities?.includes(cityValue))
      city = cityValue
    handleValueChange("city", city)
  }

  const handleCountryChange = (countryValue) => {
    setSearchCountry(countryValue)
    let country = "all"
    if (countries?.includes(countryValue))
      country = countryValue
    handleValueChange("country", country)
  }


  return (
    <div>
      {console.log(filters)}
      <div className='py-10'>
        <p className='font-bold text-[24px]'>
          Find the right Company
        </p>
      </div>
      <div className='flex gap-10 md:flex-row flex-col'>
        <div className='md:w-[50%] md:px-10 px-6'>
          <div className='flex justify-between'>
            <p className='font-bold text-[18px]'>
              Filter the companies
            </p>
            <RiListSettingsLine size={26} className="cursor-pointer hover:text-default-500 duration-300 md:hidden flex" onClick={() => setShowFilters((prev) => !prev)} />
          </div>
          <div className={`py-10 flex flex-col gap-4 ${showFilters ? "flex" : "md:flex hidden"}`}>
            <span >
              <Input variant="bordered" label="city" list="cities"
                onChange={(e) => handleCityChange(e.target.value)}
              />
              <datalist id="cities">
                {cities?.map((city, index) => <option key={index} value={city} />)}
              </datalist>
              <Divider className="md:my-12 my-4 bg-[#3D3D3D] block" />
            </span>
            <span>
              <Input variant="bordered" label="Country" list="countries"
                onChange={(e) => handleCountryChange(e.target.value)}
              />
              <datalist id="countries">
                {countries?.map((country, index) => <option key={index} value={country} />)}
              </datalist>
              <Divider className="md:my-12 my-4 bg-[#3D3D3D] block" />
            </span>
            <span>
              <select
                className="bg-[#27272A] px-2 py-4 rounded-md w-full"
                onChange={(e) => handleValueChange("industry", e.target.value)}
              >
                <option value="all" selected>all</option>
                {industries?.map((industry, index) => (
                  <option key={index} value={industry.industry_name} >
                    {industry.industry_name}
                  </option>
                ))}

              </select>
            </span>
          </div>
          <div className={`${showFilters ? "block" : "md:block hidden"}`}>
            <RadioGroup
              label="Overall size of the company "
              color="warning"
              onValueChange={(v) => handleValueChange("size", v)}
            >
              <Radio value="all" >
                all sizes
              </Radio>
              {sizes.map((size) => (
                <Radio key={size.id} value={size.value} >
                  {size.value}
                </Radio>
              ))}
            </RadioGroup>
          </div>
        </div>
        <CompaniesList searchTxt={props.searchTxt} filters={filters} />
      </div>
    </div>
  )
}

export default SearchSection