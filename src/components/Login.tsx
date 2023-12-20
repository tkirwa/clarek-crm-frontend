import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { API_BASE_URL } from '../config';
import { useAuth } from '../utils/AuthContext';


const Login: React.FC = () => {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { setToken } = useAuth();
  
    const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault();
  
      try {
        const response = await axios.post(
          `${API_BASE_URL}/api/auth/login`,
          { phone, password }
        );
  
        const token = response.data.token;
  
        // Store token securely (e.g., in local storage)
        localStorage.setItem('token', token);
  
        // Set token in the context
        setToken(token);
  
        // Redirect to the dashboard
        navigate('/dashboard');
  
        // Console log the token
        console.log('Token:', token);
      } catch (error: any) {
        // Use type assertion to specify the type of 'error'
        setError((error.response?.data?.error as string) || 'An error occurred');
      }
    };
  

    return (
        <>
            <section className="relative flex flex-wrap lg:h-screen lg:items-center">
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
                                    placeholder="Enter phone"
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
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    placeholder="Enter password"
                                />

                                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
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
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-500">
                                No account?
                                <Link
                                    to="/signup"
                                    className="underline"
                                >
                                    Sign up
                                </Link>
                            </p>

                            <button
                                type="submit"
                                className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>

                <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
                    <img
                        alt="Welcome"
                        src="https://images.unsplash.com/photo-1630450202872-e0829c9d6172?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                </div>
            </section>
        </>
    );
}

export default Login;
