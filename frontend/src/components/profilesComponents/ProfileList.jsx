import React from 'react'
import { Pagination } from '@nextui-org/react';
import { useState } from 'react';
import ProfileCard from './ProfileCard';
import profile from '../../assets/profileExample.jpg'

function ProfileList() {
    

    const Profiles = [
        {
          id:1,
          img: profile,
          name: 'John Doe',
          city: 'New York',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam condimentum enim vel massa tincidunt, ac convallis dolor ultrices. Fusce nec elit eu orci elementum facilisis. Aliquam erat volutpat. Nulla facilisi. Sed congue elit ut lacus feugiat bibendum. Fusce nec elit eu orci elementum facilisis. Aliquam erat volutpat. Nulla facilisi. Sed congue elit ut lacus feugiat bibendum.',
          email: 'john.doe@example.com'
        },
        {
          id:2,
          img: profile,
          name: 'Jane Smith',
          city: 'Los Angeles',
          description: 'Sed dignissim, lectus vitae accumsan posuere, enim odio lacinia tortor, ac sagittis ex justo vitae urna. Fusce nec elit eu orci elementum facilisis. Aliquam erat volutpat. Nulla facilisi. Sed congue elit ut lacus feugiat bibendum. Fusce nec elit eu orci elementum facilisis. Aliquam erat volutpat. Nulla facilisi. Sed congue elit ut lacus feugiat bibendum.',
          email: 'jane.smith@example.com'
        },
        {
          id:3,
          img: profile,
          name: 'Bob Johnson',
          city: 'Chicago',
          description: 'Fusce nec elit eu orci elementum facilisis. Aliquam erat volutpat. Nulla facilisi. Sed congue elit ut lacus feugiat bibendum Fusce nec elit eu orci elementum facilisis. Aliquam erat volutpat. Nulla facilisi. Sed congue elit ut lacus feugiat bibendum. Fusce nec elit eu orci elementum facilisis. Aliquam erat volutpat. Nulla facilisi. Sed congue elit ut lacus feugiat bibendum.',
          email: 'bob.johnson@example.com'
        },
        {
          id:4,
          img: profile,
          name: 'Bob Johnson',
          city: 'Chicago',
          description: 'Fusce nec elit eu orci elementum facilisis. Aliquam erat volutpat. Nulla facilisi. Sed congue elit ut lacus feugiat bibendum Fusce nec elit eu orci elementum facilisis. Aliquam erat volutpat. Nulla facilisi. Sed congue elit ut lacus feugiat bibendum. Fusce nec elit eu orci elementum facilisis. Aliquam erat volutpat. Nulla facilisi. Sed congue elit ut lacus feugiat bibendum.',
          email: 'bob.johnson@example.com'
        }
      ];
      
      const ProfilesPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const totalProfiles = Profiles.length;
    const totalPages = Math.ceil(totalProfiles / ProfilesPerPage);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        const arrayProfiles = Profiles.slice(
            (newPage - 1) * ProfilesPerPage,
            newPage * ProfilesPerPage
        );
        setVisibleProfiles(arrayProfiles)
        window.scrollTo({ top: 400 });
    };

    const defaultProfiles = Profiles.slice(
        (currentPage - 1) * ProfilesPerPage,
        currentPage * ProfilesPerPage
    );

    const [visibleProfiles, setVisibleProfiles] = useState(defaultProfiles);
  return (
    <div>
        
            <div className='flex items-center flex-col'>
                <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 gap-y-8 my-6'>
                    {visibleProfiles.map((profile) => (
                        <div key={profile.id}>
                            <ProfileCard 
                            img={profile.img}
                            name={profile.name}
                            city={profile.city}
                            description={profile.description}
                            email={profile.email} />
                        </div>
                    ))}
                </div>
                <Pagination
                    total={totalPages}
                    current={currentPage}
                    onChange={handlePageChange}
                />
            </div>
    </div>
  )
}

export default ProfileList