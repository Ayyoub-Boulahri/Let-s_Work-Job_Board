import React from 'react'
import styles from '../style'
import "../css/contactForm.css"

function Contact() {
    return (
        <div id="contact" className={`${styles.flexStart} bg-[#191E22] py-20 ${styles.paddingX} pt-10 xl:pb-6`}>
            <div className={`${styles.boxWidth}`}>
                <div className='flex gap-20 sm:flex-row flex-col'>
                    <div className='sm:w-[50%]'>
                        <h1 className='text-[24px] font-bold text-gray-300 mb-4'>Contact Us</h1>
                        <p className={`${styles.paragraph} text-justify mb-8 text-gray-400 text-[16px]`}>
                            Have a question or need assistance? We're here to help!
                            Feel free to reach out to us using the contact form below for general inquiries,
                            or connect with us through our dedicated customer support channels.
                            If you prefer more direct communication, you can reach us by phone during our business hours,
                            or drop us an email. Our team is committed to providing prompt and helpful responses
                            to ensure your experience with Let's Work is seamless. Thank you for choosing us as your
                            career partner. We look forward to hearing from you!
                        </p>
                        <h2 className='text-gray-400 text-[16px]'><span className='font-bold text-[18px] mr-4'>Email &nbsp;:</span> LetsWork@gmail.com</h2>
                        <h2 className='text-gray-400 text-[16px]'><span className='font-bold text-[18px] mr-4'>Phone :</span> +212 0531254489</h2>
                    </div>
                    <div className='flex flex-col flex-1 w-full justify-center sm:pt-10'>
                        <form className="flex flex-col gap-4 form">
                            <input type="text" placeholder='Your Name' />
                            <input type="text" placeholder='Your Email' />
                            <input type="text" placeholder='Your Phone' />
                            <textarea rows="8" placeholder='Tell us about your needs'></textarea>
                            <div className='flex justify-center'>
                                <button className='w-fit bg-green-600 hover:bg-green-800 duration-300 px-4 py-2 text-[16px] rounded-sm'>Send</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact