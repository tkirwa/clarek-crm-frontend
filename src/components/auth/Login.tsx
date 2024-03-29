import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { API_BASE_URL } from '../../utils/config';
import { useAuth } from '../../auth/AuthContext';


const Login: React.FC = () => {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false); // Added loading state
    const navigate = useNavigate();
    const { setToken, setUser } = useAuth();

    const [showPassword, setShowPassword] = useState(false);


    // Function to toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };



    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setLoading(true);
            const response = await axios.post(
                `${API_BASE_URL}/api/auth/login`,
                { phone, password }
            );

            const { token, user } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            setToken(token);
            setUser(user);

            navigate('/dashboard');

            //   console.log('Token:', token);
            //   console.log('User:', user);
        } catch (error: any) {
            setError((error.response?.data?.error as string) || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    // Use useEffect to check if the user is logged in and redirect
    useEffect(() => {
        // Check if the user is logged in (you can replace this with your actual authentication logic)
        const storedToken = localStorage.getItem('token');
        const isLoggedIn = !!storedToken; // Check if the token exists

        // If the user is logged in, set loggedIn to true
        if (isLoggedIn) {
            // setLoggedIn(true);
            navigate('/dashboard');
        }
    }, [navigate]);


    return (
        <>
            <section className="relative flex flex-wrap lg:h-screen lg:items-center">

                <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
                    <img
                        alt="Welcome"
                        src="https://images.unsplash.com/photo-1543599538-a6c4f6cc5c05"
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                </div>
                <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
                    <div className="mx-auto max-w-lg text-center">
                        <h1 className="text-2xl font-bold sm:text-3xl">Clarek CRM :: Log In!</h1>

                        <p className="mt-4 text-gray-500">
                            A comprehensive system designed to manage and optimize interactions with customers and other stakeholders in the business!
                        </p>
                    </div>
                    <form onSubmit={handleLogin} className="mx-auto mb-0 mt-8 max-w-md space-y-4">
                        {error && <div className="text-red-500">{error}</div>}



                        <div>
                            <label htmlFor="phone" className="sr-only">Phone</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    placeholder="234XXXXXXXX..."
                                />
                                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                                    <FontAwesomeIcon icon={faPhone} />
                                </span>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    placeholder="Enter password"
                                    required
                                />

                                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                                    <label
                                        onClick={togglePasswordVisibility}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 text-gray-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                            />
                                        </svg>
                                    </label>

                                </span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">

                            <button
                                type="submit"
                                className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
                                disabled={loading} // Disable button when loading
                            >
                                Sign in
                            </button>

                            <Link className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                                to="/forgot-password"
                            >
                                Forgot Password?
                            </Link>
                        </div>
                        <div className="flex items-center justify-between">

                            <p className="text-sm text-gray-500">
                                <label>No account? </label>
                                <Link
                                    to="/signup"
                                    className="text-blue-500"
                                >
                                    Get started
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>

            </section>
        </>
    );
}

export default Login;
