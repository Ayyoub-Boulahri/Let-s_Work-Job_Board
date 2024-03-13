import React, { useEffect, useState } from 'react'
import styles from '../style'
import { useNavigate } from 'react-router-dom';
import ProfileList from '../components/profilesComponents/ProfileList';
import handleLogout from '../services/handleLogout';
import { useDispatch } from 'react-redux';
import { setLoginOut } from '../stores/authStore';
import "../css/height.css"
import { useQuery } from '@tanstack/react-query';
import { Input } from '@nextui-org/react';
import { getCities } from "../services/countriesServices";
import searchSkills from '../services/skillsServices';
import { getDegreesNames } from '../services/employeeServices';

function Profiles() {
    const [selectedFilters, setSelectedFilters] = useState([]);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [filters, setFilters] = useState({});
    const [searchCity, setSearchCity] = useState("")
    const [searchSkill, setSearchSkill] = useState("")
    const [searchDegree, setSearchDegree] = useState("")

    useEffect(() => {
        const typeUser = localStorage.getItem('typeUser');
        if (typeUser != "company") {
            handleLogout();
            dispatch(setLoginOut());
            navigate("/");
        }
    }, [])

    const { data: cities, isLoading: isLoadingCities } = useQuery({
        queryKey: ["cities", searchCity],
        queryFn: () => getCities(searchCity)
    })

    const { data: skills, isLoading: isLoadingSkills } = useQuery({
        queryKey: ["skills", searchSkill],
        queryFn: () => searchSkills(searchSkill)
    });

    const { data: educations, isLoading: isLoadingEducations } = useQuery({
        queryKey: ["educations", searchDegree],
        queryFn: () => getDegreesNames(searchDegree)
    });


    const toggleFilter = (filter) => {
        if (selectedFilters.includes(filter)) {
            setSelectedFilters(selectedFilters.filter((item) => item !== filter));
        } else {
            setSelectedFilters([...selectedFilters, filter]);
        }
    };

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

    const handleSkillChange = (skillValue) => {
        setSearchSkill(skillValue)
        let skill = "all"
        if (skills?.some(obj => obj.skill == skillValue))
            skill = skillValue
        handleValueChange("skills", skill)
    }

    const handleEducationChange = (educationValue) => {
        setSearchDegree(educationValue)
        let education = "all"
        if (educations.includes(educationValue))
            education = {
                "$elemMatch": {
                    "degreeName": educationValue
                }
            }
        handleValueChange("educations", education)

    }

    return (
        <div className={`${styles.flexStart} ${styles.paddingX} bg-section-dark-bg pt-20 xl:pb-4`}>
            {console.log(filters)}
            <div className={`${styles.boxWidth} HeightTall`}>
                <div>
                    <div className='flex mt-8 gap-4 items-center'>
                        <div className='flex gap-4 overflow-x-auto max-w-full'>


                            <Input variant="bordered" size='xs' label="city" list="cities"
                                onChange={(e) => handleCityChange(e.target.value)}
                            />
                            <datalist id="cities">
                                {cities?.map((city, index) => <option key={index} value={city} />)}
                            </datalist>



                            <Input variant="bordered" size='xs' label="Education Degree" list="educations"
                                onChange={(e) => handleEducationChange(e.target.value)}
                            />
                            <datalist id="educations">
                                {educations?.map((education, index) => <option key={index} value={education} />)}
                            </datalist>


                            <Input size="xs" variant='bordered' label="skill" list="skills"
                                onChange={(e) => handleSkillChange(e.target.value)}
                            />
                            <datalist id="skills">
                                {skills?.map((sk, index) => <option key={index} value={sk.skill} />)}
                            </datalist>
                        </div>

                    </div>
                </div>
                <ProfileList filters={filters} />
            </div>
        </div>
    )
}

export default Profiles