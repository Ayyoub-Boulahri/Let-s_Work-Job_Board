import React from 'react'
import AboutSection from '../components/AboutSection';
import MissionSection from '../components/MissionSection';
import WhoWeAre from '../components/WhoWeAre';
import styles from '../style';

function About() {
    return (
        <div id='about' className={`${styles.flexStart} bg-section-dark-bg pt-20 ${styles.paddingX} pt-10 xl:pb-6`}>
            <div className={`${styles.boxWidth} flex flex-col gap-6 items-center`}>
                <h1 className="text-[24px] font-bold text-gray-300">About Us</h1>

                {/* About Section */}

                <AboutSection />

                {/* Mession and why choose us section */}

                <MissionSection />

                {/* How we are Section */}

                <WhoWeAre />

            </div>
        </div>
    )
}

export default About