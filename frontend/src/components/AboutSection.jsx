import React from 'react'
import { Image } from "@nextui-org/react";
import about from '../assets/about.png'
import styles from '../style';

function AboutSection() {
    return (
        <div className='w-full flex gap-10 p-5 sm:flex-row flex-col'>
            <div className='w-[22%]'>
                <Image
                    isZoomed
                    alt="NextUI Fruit Image with Zoom"
                    src={about}
                />
            </div>
            <div className='flex flex-1 flex-col'>
                <p className={`text-justify text-gray-400 text-[16px] ${styles.paragraph}`}>
                    Welcome to <span className='text-primary-500 font-bold'>Let's Work</span>, where innovation meets opportunity and careers take flight.
                    Our passion for connecting talented individuals with thriving job opportunities drives
                    our commitment to creating a dynamic and inclusive job board experience. As a tight-knit
                    team of two dedicated professionals, we founded <span className='text-primary-500 font-bold'>Let's Work</span> with the vision of revolutionizing
                    the way people discover and secure meaningful employment.
                </p>
                <h2 className='my-6 text-[18px] font-bold text-gray-300'>Future Vision</h2>
                <p className={`text-justify ${styles.paragraph} text-gray-400 text-[16px]`}>
                    Looking ahead, we envision <span className='text-primary-500 font-bold'>Let's Work</span> as the go-to destination for anyone seeking career
                    advancement or talent acquisition. We are committed to continuous improvement, expanding
                    our offerings, and enhancing the value we deliver to our community.
                </p>
            </div>
        </div>
    )
}

export default AboutSection