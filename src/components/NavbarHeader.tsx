import React, { useEffect, useRef, useState, RefObject } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavbarHeader.css'
import { useAuth } from '../auth/AuthContext';


const NavbarHeader: React.FC = () => {

    const [state, setState] = useState(false)

    const { token, user, logout } = useAuth();
    const navigate = useNavigate();

    // Explicitly define the type for the ref
    const navRef: RefObject<HTMLDivElement> = useRef(null);


    // Logo

    const logo = {
        url: "/images/assets/logo192.png",
    };




    // Replace  path with your path
    const publicLinks = [
        { title: "About", path: "/about" },
        { title: "Blog", path: "/blog" },
    ]


    const privateLinks = [
        // { title: "Analytics : : Stats", path: "/analytics" },
        { title: "Launch Complaint", path: "/launch_complaint" },
        // { title: "CRM : : Reports", path: "/reports" },
    ]

    const handleLogout = () => {
        // Call the logout function to clear the token
        logout();

        // Redirect to the login page after logout
        navigate('/login');
    };



    useEffect(() => {

        const body = document.body

        // Disable scrolling
        const customBodyStyle = ["overflow-hidden", "lg:overflow-visible"]
        if (state) body.classList.add(...customBodyStyle)
        // Enable scrolling
        else body.classList.remove(...customBodyStyle)

        // Sticky strick
        const customStyle = ["sticky-nav", "fixed", "border-b"]
        window.onscroll = () => {
            if (window.scrollY > 80) navRef.current?.classList.add(...customStyle);
            else navRef.current?.classList.remove(...customStyle);
        }
    }, [state])


    return (
        <>
            <nav ref={navRef} className="bg-white w-full top-0 z-20">
                <div className="items-center px-4 max-w-screen-xl mx-auto md:px-8 lg:flex">
                    <div className="flex items-center justify-between py-3 lg:py-4 lg:block">
                        {!token ? (
                            <Link
                                to="/"
                                className="block text-teal-600"
                            >
                                <span className="sr-only">Home</span>
                                <svg className="h-8" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <image href={logo.url} width="28" height="24" />
                                </svg>
                            </Link>
                        ) : (
                            <Link
                                to="/dashboard"
                                className="block text-teal-600"
                            >
                                <span className="sr-only">Home</span>
                                <svg className="h-8" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <image href={logo.url} width="28" height="24" />
                                </svg>
                            </Link>
                        )}

                        <div className="lg:hidden">
                            <button className="text-gray-700 outline-none p-2 rounded-md focus:border-gray-400 focus:border"
                                onClick={() => setState(!state)}
                            >
                                {
                                    state ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                                        </svg>
                                    )
                                }
                            </button>
                        </div>
                    </div>
                    <div className={`flex-1 justify-between flex-row-reverse lg:overflow-visible lg:flex lg:pb-0 lg:pr-0 lg:h-auto ${state ? 'h-screen pb-20 overflow-auto pr-4' : 'hidden'}`}>
                        <div>
                            {!token ? (
                                <>
                                    <ul className="flex flex-col-reverse space-x-0 lg:space-x-6 lg:flex-row">
                                        <li className="mt-4 lg:mt-0">
                                            <Link
                                                to="/login"
                                                className="block rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
                                            >
                                                Login
                                            </Link>
                                        </li>
                                        <li className="mt-8 lg:mt-0">
                                            <Link
                                                to="/signup"
                                                className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 transition hover:text-teal-600/75 sm:block"
                                            >
                                                Get started
                                            </Link>
                                        </li>
                                    </ul>
                                </>

                            ) : (
                                <>
                                    <ul className="flex flex-col-reverse space-x-0 lg:space-x-6 lg:flex-row">
                                        <li className="mt-4 lg:mt-0">
                                            <Link
                                                to="/dashboard/profile"
                                                className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 transition hover:text-teal-600/75 sm:block"
                                            >
                                                {user ? `Welcome, ${user.lastName}` : 'Profile'}
                                            </Link>
                                        </li>
                                        <li className="mt-8 lg:mt-0">
                                            <button
                                                onClick={handleLogout}
                                                className="block rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
                                            >
                                                Logout
                                            </button>
                                        </li>
                                    </ul>
                                </>
                            )}

                        </div>
                        <div className="flex-1">
                            {!token ? (
                                <>
                                    <ul className="justify-center items-center space-y-8 lg:flex lg:space-x-6 lg:space-y-0">
                                        {
                                            publicLinks.map((item, idx) => {
                                                return (
                                                    <li key={idx} className="text-gray-600 hover:text-indigo-600">
                                                        <Link to={item.path}>
                                                            {item.title}
                                                        </Link>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </>

                            ) : (
                                <>
                                    <ul className="justify-center items-center space-y-8 lg:flex lg:space-x-6 lg:space-y-0">
                                        {
                                            privateLinks.map((item, idx) => {
                                                return (
                                                    <>
                                                        <li key={idx}
                                                            className="block rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
                                                        >
                                                            <Link to={item.path}>
                                                                {item.title}
                                                            </Link>
                                                        </li>
                                                    </>
                                                )
                                            })
                                        }
                                    </ul>
                                </>
                            )}

                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default NavbarHeader;
