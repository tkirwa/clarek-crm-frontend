import React from 'react';
import { useAuth } from '../auth/AuthContext'; // Adjust the path based on your project structure
import logoSm from '../assets/logo192.png';
import { Link, useNavigate } from 'react-router-dom';


const Header: React.FC = () => {

    const { token, user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        // Call the logout function to clear the token
        logout();

        // Redirect to the login page after logout
        navigate('/login');
    };

    return (
        <header className="bg-white">
            <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">

                {!token ? (
                    <Link
                        to="/"
                        className="block text-teal-600"
                    >
                        <span className="sr-only">Home</span>
                        <svg className="h-8" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <image href={logoSm} width="28" height="24" />
                        </svg>
                    </Link>
                ) : (
                    <Link
                        to="/dashboard"
                        className="block text-teal-600"
                    >
                        <span className="sr-only">Home</span>
                        <svg className="h-8" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <image href={logoSm} width="28" height="24" />
                        </svg>
                    </Link>
                )}

                <div className="flex flex-1 items-center justify-end md:justify-between">

                    {!token ? (
                        <nav aria-label="Global" className="hidden md:block">
                            <ul className="flex items-center gap-6 text-sm">
                                <li>
                                    <Link className="text-gray-500 transition hover:text-gray-500/75" to="/about"> About </Link>
                                </li>
                                <li>
                                    <Link className="text-gray-500 transition hover:text-gray-500/75" to="/"> Projects </Link>
                                </li>

                                <li>
                                    <Link className="text-gray-500 transition hover:text-gray-500/75" to="/"> Blog </Link>
                                </li>
                            </ul>
                        </nav>
                    ) : (
                        <nav aria-label="Global" className="hidden md:block">
                            <ul className="flex items-center gap-6 text-sm">
                                <li>
                                    <Link className="text-gray-500 transition hover:text-gray-500/75" to="/about"> Analytics </Link>
                                </li>
                            </ul>
                        </nav>
                    )}


                    <div className="flex items-center gap-4">

                        {!token ? (
                            // If logged in, show logout button
                            <div className="sm:flex sm:gap-4">
                                {/* Use Link for navigation */}
                                <Link
                                    to="/login"
                                    className="block rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 transition hover:text-teal-600/75 sm:block"
                                >
                                    Get started
                                </Link>
                            </div>
                        ) : (
                            // If not logged in, show login and signup buttons
                            <div className="sm:flex sm:gap-4">
                                {/* Use Link for navigation */}
                                <Link
                                    to="/dashboard/profile"
                                    className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 transition hover:text-teal-600/75 sm:block"
                                >
                                    {user ? `Welcome, ${user.lastName}` : 'Profile'}
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="block rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
                                >
                                    Logout
                                </button>
                            </div>
                        )}

                        <button
                            className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden"
                        >
                            <span className="sr-only">Toggle menu</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </header >
    );
}

export default Header;