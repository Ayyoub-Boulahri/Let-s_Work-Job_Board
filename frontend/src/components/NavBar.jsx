import React from 'react'
import styles from '../style';
import close from '../assets/close.svg';
import menu from '../assets/menu.svg';
import { useState } from 'react';
import "../css/button.css";
import "../css/navbar.css";
import { Button } from '@radix-ui/themes'
import { useEffect } from 'react';

function NavBar() {
  
  const [toggle, setToggle] = useState(false)
  const [navLinkId, setNavLinkId] = useState(0)
  const navLinks = [
    {
      id: "home",
      title: "Home",
    },
    {
      id: "about",
      title: "About",
    },
    {
      id: "conatact",
      title: "Contact",
    },
  ];

  useEffect(() => {
    window.addEventListener('scroll', () => {
      const navbar = document.getElementById('navbar');
      if(window.scrollY > 0)
        navbar.classList.add('bg-opacity-80')
      else
      navbar.classList.remove('bg-opacity-80')
    })
  }, [])

  const handleActiveLink = (id) => {
    setNavLinkId(id)
  }

  return (
    <div className="w-full shadow-xl overflow-hidden z-[1110] bg-background bg-opacity-50 mb-20 fixed duration-200" id='navbar'>
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <nav className="w-full flex justify-between items-center navbar">
            <h1 className="text-primary-600 text-[30px] font-poppins font-extrabold">Let's Work</h1>

            {/* computer size items */}
            <ul className='list-none sm:flex hidden justify-center items-center flex-1'>
              {navLinks.map((nav, index) => (
                <li key={nav.id} onClick={() => handleActiveLink(nav.id)}
                  className={`font-poppins cursor-pointer text-[18px] nav-link ${index === navLinks.length - 1 ? 'mr-0' : 'mr-10'} ${nav.id === navLinkId ? 'isActive' : 'font-normal'} px-3 py-2`}>
                  <a href={`#${nav.id}`}>
                    {nav.title}
                  </a>
                </li>
              ))}
            </ul>
            {/* mobile size items */}
            <div className='flex flex-row'>
              <button className="bn632-hover bn26 mr-10 font-poppins">Sing Up</button>
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
                        className={`font-poppins font-normal cursor-pointer text-[16px] ${index === navLinks.length - 1 ? 'mb-0' : 'mb-4'} text-white`}>
                        <a href={`#${nav.id}`}>
                          {nav.title}
                        </a>
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