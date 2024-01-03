import React from 'react'
import styles from '../style';
import close from '../assets/close.svg';
import menu from '../assets/menu.svg';
import { useState } from 'react';
import "../css/button.css";
import { Button } from '@radix-ui/themes'

function NavBar() {
  const [toggle, setToggle] = useState(false)
  const navLinks = [
    {
      id: "home",
      title: "Home",
    },
    {
      id: "features",
      title: "Features",
    },
    {
      id: "product",
      title: "Product",
    },
    {
      id: "clients",
      title: "Clients",
    },
  ];

  return (
    <div className="bg-background w-full overflow-hidden">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <nav className="w-full flex py-6 justify-between items-center navbar">
            <h1 className="text-primary-600 text-[24px] font-poppins font-bold">Let's Work</h1>

            {/* computer size items */}
            <ul className='list-none sm:flex hidden justify-center items-center flex-1'>
              {navLinks.map((nav, index) => (
                <li key={nav.id}
                  className={`font-poppins font-normal cursor-pointer text-[16px] ${index === navLinks.length - 1 ? 'mr-0' : 'mr-10'} text-white`}>
                  <a href={`#${nav.id}`}>
                    {nav.title}
                  </a>
                </li>
              ))}
            </ul>
            {/* mobile size items */}
            <div className='flex flex-row'>

              <button className="bn632-hover bn26 mr-10 font-poppins">Sing IN</button>
              <div className='sm:hidden flex justify-end items-center'>
                <img
                  src={toggle ? close : menu}
                  alt="menu"
                  className='w-[28px] h-[28px] object-contain cursor-pointer'
                  onClick={() => setToggle((prev) => !prev)}
                />
                <div className={`${toggle ? 'flex' : 'hidden'} p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}>
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