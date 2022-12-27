import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/authcontext';
// import { useNavigate } from 'react-router-dom';
// import { Button, input, label } from 'flowbite-react';
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import Router from 'next/router';
import { label, input } from '@chakra-ui/react';
import swal from 'sweetalert';
import { useSession, signIn } from 'next-auth/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaGoogle } from 'react-icons/fa';
import ggl from '../assets/images/google.svg';
import Image from 'next/image';



export default function Register() {
    // const { user, setUser, setCookie } = useContext(AuthContext);
    // const navigate = useNavigate();
    const [registerInput, setRegister] = useState({
        name: '',
        email: '',
        password: '',
        error_list: [],
    });
    const handleInput = (e) => {
        // e.persist();
        setRegister({ ...registerInput, [e.target.name]: e.target.value });

    }

    // const handleInput = (e) => {
    //     e.persist();
    //     setRegister({ ...register, [e.target.name]: e.target.value });
    // }
    const registerSubmit = (e) => {
        e.preventDefault();
        const data = {
            name: registerInput.name,
            email: registerInput.email,
            password: registerInput.password
        }
        axios.get("/sanctum/csrf-cookie").then((response) => {
            axios.post(`/api/register`, data,).then(res => {
                if (res.data.status === 200) {
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.username);
                    swal("Success", res.data.message, "success");

                    Router.push('/');
                } else {
                    setRegister({ ...registerInput, error_list: res.data.validation_errors });
                }

            })
        })
    }

    return (
        <>
            <section className="w-screen flex flex-wrap lg:h-screen lg:items-center">
                <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
                    <div className="mx-auto max-w-lg text-center">
                        <h1 className="text-2xl font-bold sm:text-3xl">Get started today!</h1>

                        <p className="mt-4 text-gray-500">
                            Look through thousands of properties that are for sale, rent, or vacation homes with the most competitive pricing and the most diverse selection
                        </p>
                    </div>

                    <form onSubmit={registerSubmit} className="mx-auto mt-8 mb-0 max-w-md space-y-4">
                        <div>
                            <label htmlFor="name" className="sr-only" value='Name' />

                            <div className="relative">
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    required={true}
                                    value={registerInput?.name}
                                    onChange={handleInput}
                                    className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                                    placeholder="Your Name"
                                />

                                <span>
                                    {registerInput.error_list.name}
                                </span>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email2" className="sr-only" value='Email' />

                            <div className="relative">
                                <input
                                    type="email"
                                    name="email"
                                    id="email2"
                                    required={true}
                                    value={registerInput?.email}
                                    onChange={handleInput}
                                    className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                                    placeholder="Youremail@mail.com"
                                />

                                <span>
                                    {registerInput.error_list.email}
                                </span>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password2" className="sr-only" value='Password' />
                            <div className="relative">
                                <input
                                    type="password"
                                    name="password"
                                    id="password2"
                                    required={true}
                                    value={registerInput?.password}
                                    onChange={handleInput}
                                    className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                                    placeholder="Enter password"
                                />

                                <span>
                                    {registerInput.error_list.password}
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-5 items-center justify-between">

                            {/* <p className="text-sm text-gray-500">
                                No account?
                                <a href="#" className="underline">Sign up</a>
                            </p> */}

                            <button
                                type="submit"
                                className="mx-auto inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
                            >
                                Create Account
                            </button>
                        </div>
                        <div>
                        </div>
                        <div className='flex flex-row'>
                            <button className='mx-auto w-54 flex h-15 px-3 py-3 rounded-lg  text-white bg-blue-400' onClick={() => signIn()}><Image src={ggl} className='h-6' />Sign in With Google</button>
                        </div>
                        <div className="flex mx-auto w-1/2 my-2 text-sm font-semibold items-center text-gray-800">
                            <div className="flex-grow border-t h-px mr-3"></div>
                            OR
                            <div className="flex-grow border-t h-px ml-3"></div>
                        </div>
                        <div className='flex mx-auto  w-1/2 my-2 items-center'>

                            <p className="text-sm pt-3">
                                Already have an account?
                                <button className="text-blue-500 underline">
                                    Login
                                </button>
                            </p>
                        </div>

                    </form>

                </div>

                <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
                    <img
                        alt="Welcome"
                        src="https://raw.githubusercontent.com/sunil9813/Real-estate-website/master/src/components/images/about.jpg"
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                </div>
            </section>
        </>
    )
}