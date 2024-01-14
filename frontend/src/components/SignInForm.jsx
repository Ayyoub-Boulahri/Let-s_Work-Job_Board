import React from 'react'
import { Dialog, Button } from '@radix-ui/themes';
import "../css/signInForm.css";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoLogInOutline, IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5'; // Import eye icons
import axios from 'axios';
import { useDispatch } from 'react-redux';
import checkAuthentication from '../services/checkAuthentication';
import { setAuthenticated } from '../stores/authStore';

function SignInForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const [loginInfos, setLoginInfos] = useState(
        {
            email: "",
            password: "",
        }
    )

    const [errorLogin, setErrorLogin] = useState(false)

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginInfos(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleLogin = async (type) => {
        const { email, password } = loginInfos;
        try {
            const response = await axios.post('http://localhost:5000/api/login/' + type, { email, password }, { withCredentials: true });
            if (response.status === 200) {
                const authInfo = await checkAuthentication();
                dispatch(setAuthenticated(authInfo))
                if(type == "employee")
                    navigate("/jobs")
                if(type == "company")
                    console.log("success company log in");
                
            } else {
                setErrorLogin(true)
            }
        } catch (error) {
            console.error('Error during login:', error);
            setErrorLogin(true)
        }
    }

    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <Button className="inline-flex items-center px-4 py-6 border border-transparent text-base leading-6 font-poppins rounded-md text-white bg-primary-400 hover:bg-primary-500 focus:border-primary-500 active:bg-primary-500 transition ease-in-out duration-150 cursor-pointer font-bold">Sign In <IoLogInOutline className='text-[18px]' /></Button>
            </Dialog.Trigger>

            <Dialog.Content style={{ maxWidth: 450, backgroundColor: "#0D1117" }}>

                <div className="form-container">
                    <p className='title'>Login</p>
                        <div className="input-group">
                            <label>Email</label>
                            <input
                                type="text"
                                placeholder="Enter your Email"
                                name="email"
                                onChange={handleChange}
                                className={`${errorLogin && "erreur"}`}
                            />
                        </div>
                        <div className="input-group">
                            <label className='mt-2'>Password</label>
                            <div className={`password-input-container flex ${errorLogin && "erreur"}`}>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your Password"
                                    className='input-password'
                                    name="password"
                                    onChange={handleChange}
                                />
                                <button
                                    type="button"
                                    className="toggle-password"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? <IoEyeOutline size={16} /> : <IoEyeOffOutline size={16} />}
                                </button>
                            </div>
                            <div className="forgot">
                                <a rel="noopener noreferrer" href="#">Forgot Password ?</a>
                            </div>
                        </div>
                        <div className='flex flex-row justify-between gap-6'>
                            <button className="sign" onClick={() => handleLogin("employee")}>As Employee</button>
                            <button className="sign" onClick={() => handleLogin("company")}>As Company</button>
                        </div>
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
                    {/* <p className="signup">Don't have an account?
                        <a rel="noopener noreferrer" href="#" className=""> Sign up</a>
                    </p> */}
                </div>

            </Dialog.Content>
        </Dialog.Root>
    )
}

export default SignInForm