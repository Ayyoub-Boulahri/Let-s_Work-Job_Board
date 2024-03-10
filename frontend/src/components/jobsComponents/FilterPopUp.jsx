import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Divider } from "@nextui-org/react";
import { RiListSettingsLine } from "react-icons/ri";
import { Select, SelectItem, Input, Switch } from "@nextui-org/react";
import { datePostedOptions, jobTypes } from '../../schemas/data';
import getAllIndustries from '../../services/industriesServices';
import { useQuery } from '@tanstack/react-query';
import { getCities } from "../../services/countriesServices";

function FilterPopUp(props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [searchCity, setSearchCity] = useState("")
  const [filtersObj, setFiltersObj] = useState({
    job_type: "all",
    city: "all",
    industry: "all"
  })

  const handleSelectChange = (property, value) => {
    if (value == "all") {
      if (props.filters.hasOwnProperty(property)) {
        props.setFilters(prevFilters => {
          const { [property]: removedProperty, ...remainingFilters } = prevFilters;
          return remainingFilters;
        });
      }
    } else {
      props.setFilters(prevFilters => {
        return {
          ...prevFilters,
          [property]: value,
        };
      });
    }
  };

  const { data: industries, isLoading: isLoadingIndustries } = useQuery({
    queryKey: ["industries"],
    queryFn: () => getAllIndustries()
  })

  const { data: cities, isLoading: isLoadingCities } = useQuery({
    queryKey: ["cities", searchCity],
    queryFn: () => getCities(searchCity)
  })

  const confirmFilters = (onClose) => {
    let city = "";
    if (cities?.includes(searchCity)) {
      setFiltersObj(prev => ({
        ...prev,
        city: searchCity,
      }));
      city = searchCity
    } else {
      setFiltersObj(prev => ({
        ...prev,
        city: "all",
      }));
      city = "all"
    }

    handleSelectChange("job_type", filtersObj.job_type)
    handleSelectChange("company.industry", filtersObj.industry)
    handleSelectChange("company.city", city)
    onClose()
  };

  const resetAllFilters = (onClose) => {
    props.setFilters({})
    onClose()
  }

  useEffect(() => {
    let init = {
      job_type: "all",
      city: "all",
      industry: "all"
    }
    if (props.filters.hasOwnProperty("job_type"))
      init.job_type = props.filters.job_type
    if (props.filters.hasOwnProperty("industry"))
      init.industry = props.filters.industry
    if(props.filters.hasOwnProperty("company.city")) {
      init.city = props.filters["company.city"]
    }

    setFiltersObj(init)
  }, [])

  return (
    <>
      <button onClick={onOpen}><RiListSettingsLine size={25} className="cursor-pointer hover:text-default-500 duration-300" /></button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior={"inside"}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-[20px]">Filter Jobs</ModalHeader>
              <ModalBody className="popupModel">

                <div className="flex flex-col gap-2">
                  <h1>Jobs Type</h1>
                  <select
                    className="bg-[#27272A] px-2 py-3 rounded-md"
                    // onChange={(e) => handleSelectChange("job_type", e.target.value)}
                    onChange={(e) => setFiltersObj(prev => { return { ...prev, "job_type": e.target.value } })}
                  >
                    <option value="all">
                      all
                    </option>
                    {jobTypes.map((jobType, index) => (
                      <option value={jobType} textValue={jobType} selected={jobType == filtersObj.job_type}>
                        {jobType}
                      </option>
                    ))}

                  </select>
                </div>


                <Divider />


                <div className="flex flex-col gap-2">
                  <h1>City</h1>
                  <input
                    className="bg-[#27272A] px-2 py-3 rounded-md"
                    onChange={(e) => setSearchCity(e.target.value)}
                    list="cities"
                    defaultValue={filtersObj.city == "all" ? "" : filtersObj.city}
                  />
                  <datalist id="cities">
                    {cities?.map((city, index) => <option key={index} value={city} />)}
                  </datalist>
                </div>


                <Divider />


                <div className="flex flex-col gap-2">
                  <h1>Industry</h1>
                  <select
                    className="bg-[#27272A] px-2 py-3 rounded-md"
                    onChange={(e) => setFiltersObj(prev => { return { ...prev, "industry": e.target.value } })}
                  >
                    <option value="all" selected>all</option>
                    {industries?.map((industry, index) => (
                      <option key={index} value={industry.industry_name} selected={industry.industry_name == filtersObj.industry}>
                        {industry.industry_name}
                      </option>
                    ))}

                  </select>
                </div>



              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={() => resetAllFilters(onClose)}>
                  reset
                </Button>
                <Button color="primary" onPress={() => confirmFilters(onClose)}>
                  save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default FilterPopUp