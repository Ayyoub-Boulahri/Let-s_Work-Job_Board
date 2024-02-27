import React, { useEffect } from 'react'
import { Pagination } from '@nextui-org/react';
import { useState } from 'react';
import ProfileCard from './ProfileCard';
import profile from '../../assets/profile.png'
import { getSomeEmployees, getTotalEmployees } from '../../services/employeeServices';
import { Spinner } from '@nextui-org/react';

function ProfileList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1)
  const [profiles, setProfiles] = useState([]);
  const [isLoadingProfiles, setIsLoadingProfiles] = useState(true)

  const profilesPerPage = 6;

  useEffect(() => {
    const getEmployees = async () => {
      try {
        getSomeEmployees({
          "_id": 1,
          "first_name": 1,
          "last_name": 1,
          "profilePhoto": 1,
          "city": 1,
          "country": 1,
          "about": 1,
          "email": 1,
        }, (currentPage - 1) * profilesPerPage, profilesPerPage).then(response => {
          setProfiles(response)
          setIsLoadingProfiles(false)
        }).catch(error => {
          console.error(error);
        });
      } catch (error) {
        console.error(error)
      }
    }

    const getEmployeesCount = async () => {
      try {
        getTotalEmployees().then(response => {
          setTotalPages(Math.ceil(response / profilesPerPage))
        }).catch(error => {
          console.error(error);
        });
      } catch (error) {
        console.error(error)
      }
    }

    getEmployeesCount()
    getEmployees()

  }, [currentPage])



  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 400 });
  };

  return (
    <div>
      {isLoadingProfiles
        ? <div className='h-[200px] flex justify-center items-start mt-10'>
          <Spinner size='lg' />
        </div>
        : <div className='flex items-center flex-col'>
          <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 gap-y-8 my-6'>
            {profiles.map((profile) => (
              <div key={profile.id}>
                <ProfileCard
                  profile={profile} />
              </div>
            ))}
          </div>
          <Pagination
            total={totalPages}
            current={currentPage}
            onChange={handlePageChange}
          />
        </div>
      }
    </div>
  )
}

export default ProfileList