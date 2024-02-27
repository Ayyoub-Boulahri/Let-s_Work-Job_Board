import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import '../css/navBar.css';
import styles from '../style'

function Navbar() {
    const location = useLocation();

    const navList = [
        {
            id: 'Requests',
            title: 'Requests',
            path: '/Requests'
        },
        {
            id: "Users",
            title: 'Users',
            path: '/Users'
        },
        {
            id: 'JobOffers',
            title: 'Job Offers',
            path: '/JobOffers'
        }
    ];

    const scrollToTop = () => {
        window.scrollTo(0, 0);
      };

    return (
        <div className="w-full shadow-xl overflow-hidden z-[1110] fixed left-0 top-0 bg-background bg-opacity-50 mb-20 duration-200" id='navbar'>
            <div className={`${styles.paddingX} ${styles.flexCenter}`}>
                <div className={`${styles.boxWidth}`}>
                    <nav className="w-full flex justify-between items-center navbar">
                        <h1 className="text-primary-600 text-[30px] font-poppins font-extrabold py-5">Let's Work</h1>
                        <ul className='list-none sm:flex hidden justify-center items-center flex-1'>
                            {navList.map((nav, index) => (
                                <Link to={"/" + nav.id} className={`font-poppins cursor-pointer nav-link ${index === navList.length - 1 ? 'mr-0' : 'mr-14'} ${location.pathname === nav.path ? 'isActive' : 'text-[18px]'}  py-2`} onClick={scrollToTop}>
                                    <li key={nav.id}>
                                        {nav.title}
                                    </li>
                                </Link>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
