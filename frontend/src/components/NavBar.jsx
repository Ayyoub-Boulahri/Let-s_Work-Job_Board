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
import { useSelector, useDispatch } from 'react-redux';
import { setAuthenticated } from '../stores/authStore';

function NavBar() {
  const [toggle, setToggle] = useState(false)

  const navigate = useNavigate()
  const authInfo = useSelector((state) => state.isAuthenticated.value);
  const dispatch = useDispatch();

  useEffect(() => {
    const email = localStorage.getItem('email');
    const auth = localStorage.getItem('auth');
    const userId = localStorage.getItem('userId');
    const typeUser = localStorage.getItem('typeUser');

    const authObj = {
      userId,
      email,
      auth,
      typeUser
    }

    dispatch(setAuthenticated(authObj));

    window.addEventListener('scroll', () => {
      const navbar = document.getElementById('navbar');
      if (window.scrollY > 0)
        navbar.classList.add('bg-opacity-80')
      else
        navbar.classList.remove('bg-opacity-80')
    })

  }, [])

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const acceuilNavLinks = [
    {
      id: "home",
      title: "Home",
      path: "#home"
    },
    {
      id: "about",
      title: "About",
      path: "#about"
    },
    {
      id: "contact",
      title: "Contact",
      path: "#contact"
    },
  ];


  const employeeNavLinks = [
    {
      id: "jobs",
      title: "Jobs",
      path: "/jobs"
    },
    {
      id: "companies",
      title: "Companies",
      path: "/companies"
    },
    {
      id: "jobRequests",
      title: "job requests",
      path: "/jobRequests"
    },
  ];

  const companyNavLinks = [
    {
      id: "profiles",
      title: "Profiles",
      path: "/profiles"
    },
    {
      id: "jobListings",
      title: "Job Listings",
      path: "/jobListings"
    },
    {
      id: "newOffer",
      title: "New Offer",
      path: "/newOffer"
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
                {acceuilNavLinks.map((nav, index) => (
                  <a href={`#${nav.id}`} className={`font-poppins cursor-pointer nav-link ${index === acceuilNavLinks.length - 1 ? 'mr-0' : 'mr-14'} ${location.hash === nav.path ? 'isActive' : 'text-[18px]'} py-2`}>
                    <li key={nav.id} >
                      {nav.title}
                    </li>
                  </a>
                ))}
              </ul>
                :
                authInfo?.typeUser == "employee"
                  ? <ul className='list-none sm:flex hidden justify-center items-center flex-1'>
                    {employeeNavLinks.map((nav, index) => (
                      <Link to={"/" + nav.id} className={`font-poppins cursor-pointer nav-link ${index === employeeNavLinks.length - 1 ? 'mr-0' : 'mr-14'} ${location.pathname === nav.path ? 'isActive' : 'text-[18px]'}  py-2`} onClick={scrollToTop}>
                        <li key={nav.id}>
                          {nav.title}
                        </li>
                      </Link>
                    ))}
                  </ul>
                  : <ul className='list-none sm:flex hidden justify-center items-center flex-1'>
                  {companyNavLinks.map((nav, index) => (
                    <Link to={"/" + nav.id} className={`font-poppins cursor-pointer nav-link ${index === companyNavLinks.length - 1 ? 'mr-0' : 'mr-14'} ${location.pathname === nav.path ? 'isActive' : 'text-[18px]'}  py-2`} onClick={scrollToTop}>
                      <li key={nav.id}>
                        {nav.title}
                      </li>
                    </Link>
                  ))}
                </ul>
            }
            {/* notification Dropdown */}

            {authInfo?.auth && <NotificationDropdown />}

            {/* Profile Avatar Bar */}

            {authInfo?.auth && <AvatarDropdown authInfo={authInfo} />}


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
                    {(!authInfo?.auth ? acceuilNavLinks : authInfo?.typeUser =="employee" ? employeeNavLinks : companyNavLinks).map((nav, index) => (
                      <li key={nav.id}
                        className={`font-poppins font-normal cursor-pointer text-[16px] ${index === companyNavLinks.length - 1 ? 'mb-0' : 'mb-4'} text-white`} onClick={() => setToggle((prev) => !prev)}>
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