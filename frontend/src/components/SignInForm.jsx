import React from 'react'
import { Dialog, Button } from '@radix-ui/themes';
import { IoLogInOutline } from "react-icons/io5";
import "../css/signInForm.css";

function SignInForm() {
    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <Button className="inline-flex items-center px-4 py-6 border border-transparent text-base leading-6 font-poppins rounded-md text-white bg-primary-400 hover:bg-primary-500 focus:border-primary-500 active:bg-primary-500 transition ease-in-out duration-150 cursor-pointer font-bold">Sign In <IoLogInOutline className='text-[18px]' /></Button>
            </Dialog.Trigger>

            <Dialog.Content style={{ maxWidth: 450, backgroundColor: "#0D1117" }}>

                <div className="form-container">
                    <p className="title">Login</p>
                    <form className="form">
                        <div className="input-group">
                            <label htmlFor="username">Email</label>
                            <input type="text" name="username" id="username" placeholder="Enter your Email" />
                        </div>
                        <div className="input-group">
                            <label htmlFor="password" className='mt-2'>Password</label>
                            <input type="password" name="password" id="password" placeholder="Enter your Password" />
                            <div className="forgot">
                                <a rel="noopener noreferrer" href="#">Forgot Password ?</a>
                            </div>
                        </div>
                        <div className='flex flex-row justify-between gap-6'>
                            <button className="sign">As Employee</button>
                            <button className="sign">As Company</button>
                        </div>
                    </form>
                    <div className="social-message">
                        <div className="line"></div>
                        <p className="message">Login with social accounts</p>
                        <div className="line"></div>
                    </div>
                    <div className="social-icons">
                        <button className="w-full px-4 py-2 border flex justify-center my-3 gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150">
                            <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />
                                <span className='text-center'>Login with Google</span>
                        </button>
                    </div>
                    <p className="signup">Don't have an account?
                        <a rel="noopener noreferrer" href="#" className=""> Sign up</a>
                    </p>
                </div>

            </Dialog.Content>
        </Dialog.Root>
    )
}

export default SignInForm