import React from 'react'
import styles from '../style';
import close from '../assets/close.svg';
import menu from '../assets/menu.svg';
import { useState } from 'react';
import "../css/button.css";
import "../css/navbar.css";
import { useEffect } from 'react';
import SignUpForm from './SignUpForm';
import { Provider } from 'react-redux';
import { signUpStore } from '../stores/signUpStore';
import NotificationDropdown from './navbarComponents/notificationDropdown';
import AvatarDropdown from './navbarComponents/AvatarDropdown';
import { Link, useNavigate } from 'react-router-dom';
import checkAuthentication from '../services/checkAuthentication';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

function NavBar() {
  const [toggle, setToggle] = useState(false)

  const [navLinkId, setNavLinkId] = useState(() => {
    return parseInt(localStorage.getItem('activeNavLink')) || 1;
  });

  const [navLinks, setNavLinks] = useState([])
  const navigate = useNavigate()
  const authInfo = useSelector((state) => state.isAuthenticated.value);

  useEffect(() => {

    const fetchAuthInfo = async () => {
      const authInfo = await checkAuthentication();
    };

    fetchAuthInfo();

    if (authInfo?.typeUser == "employee" && authInfo?.auth)
      setNavLinks(employeeNavLinks)
    else if (authInfo?.typeUser == "company" && authInfo?.auth)
      setNavLinks(companyNavLinks);
    else
      setNavLinks(acceuilNavLinks)

    window.addEventListener('scroll', () => {
      const navbar = document.getElementById('navbar');
      if (window.scrollY > 0)
        navbar.classList.add('bg-opacity-80')
      else
        navbar.classList.remove('bg-opacity-80')
    }),
      localStorage.setItem('activeNavLink', navLinkId.toString());
  }, [authInfo, navLinkId])

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const acceuilNavLinks = [
    {
      id: "home",
      title: "Home",
    },
    {
      id: "about",
      title: "About",
    },
    {
      id: "contact",
      title: "Contact",
    },
  ];

  const employeeNavLinks = [
    {
      id: "jobs",
      title: "Jobs",
    },
    {
      id: "companies",
      title: "Companies",
    },
    {
      id: "requests",
      title: "job requests",
    },
  ];

  const companyNavLinks = [
    {
      id: "profiles",
      title: "Profiles",
    },
    {
      id: "jobListings",
      title: "Job Listings",
    },
    {
      id: "newOffer",
      title: "New Offer",
    },
  ];


  return (
    <div className="w-full shadow-xl overflow-hidden z-[1110] bg-background bg-opacity-50 mb-20 fixed duration-200" id='navbar'>
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <nav className="w-full flex justify-between items-center navbar">
            <h1 className="text-primary-600 text-[30px] font-poppins font-extrabold py-5">Let's Work</h1>

            {/* computer size items */}
            {
              !authInfo?.auth ? <ul className='list-none sm:flex hidden justify-center items-center flex-1'>
                {navLinks.map((nav, index) => (
                  <a href={`#${nav.id}`} className={`font-poppins cursor-pointer nav-link ${index === navLinks.length - 1 ? 'mr-0' : 'mr-14'} ${index + 1 === navLinkId ? 'isActive' : 'text-[18px]'}  py-2`}>
                    <li key={nav.id} onClick={() => setNavLinkId(index + 1)} >
                      {nav.title}
                    </li>
                  </a>
                ))}
              </ul>
                :
                <ul className='list-none sm:flex hidden justify-center items-center flex-1'>
                  {navLinks.map((nav, index) => (
                    <Link to={"/" + nav.id} className={`font-poppins cursor-pointer nav-link ${index === navLinks.length - 1 ? 'mr-0' : 'mr-14'} ${index + 1 === navLinkId ? 'isActive' : 'text-[18px]'}  py-2`} >

                      <li key={nav.id} onClick={() => { setNavLinkId(index + 1); scrollToTop(); }}>
                        {nav.title}
                      </li>
                    </Link>
                  ))}
                </ul>
            }
            {/* notification Dropdown */}

            {authInfo?.auth && <NotificationDropdown />}

            {/* Profile Avatar Bar */}

            {authInfo?.auth && <AvatarDropdown />}


            {/* Sign Up Button */}

            {
              !authInfo?.auth &&
              <Provider store={signUpStore}>
                <SignUpForm buttonTxt="Sign Up" />
              </Provider>
            }


            {/* mobile size items */}
            <div className='flex flex-row items-center gap-4'>
              <div className='sm:hidden flex justify-end items-center'>
                <img
                  src={toggle ? close : menu}
                  alt="menu"
                  className='w-[28px] h-[28px] object-contain cursor-pointer'
                  onClick={() => setToggle((prev) => !prev)}
                />
                <div className={`${toggle ? 'flex' : 'hidden'} p-6 bg-black-gradient fixed top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}>
                  <ul className='list-none flex flex-col justify-center items-center flex-1'>
                    {navLinks.map((nav, index) => (
                      <li key={nav.id}
                        className={`font-poppins font-normal cursor-pointer text-[16px] ${index === navLinks.length - 1 ? 'mb-0' : 'mb-4'} text-white`} onClick={() => setNavLinkId(index + 1)}>
                        {
                          !authInfo?.auth
                            ? <a href={`#${nav.id}`}>
                              {nav.title}
                            </a>
                            : <Link to={"/" + nav.id}>
                              {nav.title}
                            </Link>
                        }

                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default NavBar