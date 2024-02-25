import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom'; // Import useLocation hook
import '../css/navBar.css';

function Navbar() {
    const location = useLocation(); // Access current location using useLocation hook

    const navList = [
        {
            id: 'Requests',
            name: 'Requests',
            path: '/Requests'
        },
        {
            id: "Users",
            name: 'Users',
            path: '/Users'
        },
        {
            id: 'JobOffers',
            name: 'Job Offers',
            path: '/JobOffers'
        }
    ];

    return (
        <div className=''>
            <div className='w-full flex justify-between items-center navbar '>
                <div >
                    <h1 className='text-green-700 text-[30px] font-poppins font-extrabold py-5'>
                        Let's Work
                    </h1>
                </div>
                <div>
                    <ul className='flex'>
                        {navList.map(ligne => (
                            <Link to={ligne.path} key={ligne.id}>
                                <li className={`font-poppins cursor-pointer px-3 element  ${location.pathname === ligne.path ? 'isActive' : 'text-[16px]'}`}>
                                    {ligne.name}
                                </li>
                            </Link>
                        ))}
                    </ul>
                </div>
                <div>
                    Answer clients
                </div>
            </div>
        </div>
    );
}

export default Navbar;
