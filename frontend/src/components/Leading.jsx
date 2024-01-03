import React from 'react'
import work_boy from "../assets/work_boy.png"
import { IoArrowForwardOutline, IoLogInOutline  } from "react-icons/io5";
import styles from '../style';

function Leading() {
    return (
        <section id='home' className={`flex md:flex-row flex-col`}>

            {/* the title and desctription section */}

            <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>
                <div>
                    <h1 className="flex-1 font-poppins font-bold ss:text-[48px] text-[28px] text-white ss:leading-[80px] leading-[50px]">
                        Your Gateway to <br /> <span className="text-primary-500"> Professional </span> Careers
                    </h1>
                    <p className={`${styles.paragraph} max-w-[470px] mt-5 text-gray-400`}>
                        Explore limitless opportunities at Let's Work.
                        Connect with top jobs and talent effortlessly.
                        Whether you're a job seeker or employer, we bridge ambitions to opportunities.
                        Join us to fuel your career journey!
                    </p>
                </div>
                <div className='flex flex-row mt-4'>
                    <button type="button" className="inline-flex mr-6 items-center px-4 py-2 border border-transparent text-base leading-6 font-medium font-poppins rounded-md text-white bg-rose-600 hover:bg-rose-500 focus:border-rose-700 active:bg-rose-700 transition ease-in-out duration-150 cursor-pointer">
                        Get Started <IoArrowForwardOutline className='ml-2 text-[18px] font-bold' />
                    </button>

                    <button type="button" className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium font-poppins rounded-md text-white bg-primary-400 hover:bg-primary-500 focus:border-primary-500 active:bg-primary-500 transition ease-in-out duration-150 cursor-pointer">
                        Sign In <IoLogInOutline className='ml-2 text-[18px]' />
                    </button>

                </div>
            </div>

            {/* image section */}
            <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>
                <div className='landingImage'>
                    <img src={work_boy} alt="" />
                </div>
            </div>
        </section>
    )
}

export default Leading