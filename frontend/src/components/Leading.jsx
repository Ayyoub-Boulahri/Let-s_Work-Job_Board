import React from 'react'
import work_boy from "../assets/work_boy.png"
import styles from '../style';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import { Provider } from 'react-redux';
import { signUpStore } from '../stores/signUpStore';

function Leading() {
    return (
        <div id='home' className={`${styles.flexStart} pt-20 xl:pb-4 slider`}>
            <div className={`${styles.boxWidth} z-[1100]`}>
                <section className={`flex md:flex-row flex-col`}>

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
                            <Provider store={signUpStore}>
                                <SignUpForm buttonTxt={"Get Started"}/>
                            </Provider>

                            <SignInForm />

                        </div>
                    </div>

                    {/* image section */}
                    <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>
                        <div className='landingImage'>
                            <img src={work_boy} alt="" />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Leading