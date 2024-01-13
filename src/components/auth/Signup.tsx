import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../utils/config';


const Signup: React.FC = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();


    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();

        // Trim and validate input fields
        const trimmedFirstName = firstName.trim();
        const trimmedLastName = lastName.trim();
        const trimmedEmail = email.trim();
        const trimmedPhone = phone.trim();
        const trimmedPassword = password.trim();
        const trimmedPasswordConfirmation = passwordConfirmation.trim();

        // Check for non-empty fields
        if (
            !trimmedFirstName ||
            !trimmedLastName ||
            !trimmedPhone ||
            !trimmedEmail ||
            !trimmedPassword ||
            !trimmedPasswordConfirmation
        ) {
            setError('All fields are required');
            return;
        }
        // Remove spaces from the phone number
        const formattedPhone = trimmedPhone.replace(/\s/g, '');


        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(trimmedEmail)) {
            setError('Invalid email format');
            return;
        }

        // Password confirmation validation
        if (trimmedPassword !== trimmedPasswordConfirmation) {
            setError('Password and password confirmation do not match');
            return;
        }

        setLoading(true);

        try {
            await axios.post(`${API_BASE_URL}/api/users`, {
                firstName: trimmedFirstName,
                lastName: trimmedLastName,
                phone: formattedPhone,
                email: trimmedEmail,
                password: trimmedPassword,
                password_confirmation: trimmedPasswordConfirmation,
            });

            // const { user } = response.data;

            // Assume that you have a successful registration message to display
            setMessage("User registered successfully");
            // console.log('User registered successfully:', user);
            navigate('/login');
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.errors) {
                setError((error.response.data.errors[0]?.msg as string) || 'An error occurred');
            } else {
                setError('An error occurred');
            }
        } finally {
            setLoading(false);
        }
    };


    const logo = {
        url: "/images/assets/logo192.png",
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
            <section className="bg-white">
                <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
                    <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
                        <img
                            alt="Night"
                            src="https://images.unsplash.com/photo-1617195737496-bc30194e3a19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                            className="absolute inset-0 h-full w-full object-cover opacity-80"
                        />
                    </section>

                    <main
                        className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
                    >
                        <div className="max-w-xl lg:max-w-3xl">
                            <div className="relative -mt-16 block lg:hidden">
                                <a
                                    className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white text-blue-600 sm:h-20 sm:w-20"
                                    href="/"
                                >
                                    <span className="sr-only">Home</span>
                                    <svg className="h-8" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <image href={logo.url} width="28" height="24" />
                                    </svg>
                                </a>


                            </div>

                            <form onSubmit={handleSignup} className="mt-8 grid grid-cols-6 gap-6">
                                {loading && <div className="text-gray-500">Loading...</div>}
                                {error && <div className="text-red-500">{error}</div>}
                                {message && <div className="text-green-500">{message}</div>}

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="FirstName" className="block text-sm font-medium text-gray-700">
                                        First Name
                                    </label>

                                    <input
                                        type="text"
                                        id="FirstName"
                                        name="first_name"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="LastName" className="block text-sm font-medium text-gray-700">
                                        Last Name
                                    </label>

                                    <input
                                        type="text"
                                        id="LastName"
                                        name="last_name"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    />
                                </div>

                                <div className="col-span-6">
                                    <label htmlFor="phone" className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"> Phone </label>

                                    <input
                                        type="text"
                                        id="phone"
                                        placeholder="Format 234XXXXXXXX"
                                        name="phone"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    />
                                </div>

                                <div className="col-span-6">
                                    <label htmlFor="Email" className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"> Email </label>

                                    <input
                                        type="email"
                                        id="Email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    />
                                </div>


                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="Password" className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"> Password </label>

                                    <input
                                        type="password"
                                        id="Password"
                                        name="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="PasswordConfirmation" className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm">
                                        Password Confirmation
                                    </label>

                                    <input
                                        type="password"
                                        id="PasswordConfirmation"
                                        name="password_confirmation"
                                        value={passwordConfirmation}
                                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                                        className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    />
                                </div>

                                <div className="col-span-6">
                                    <label htmlFor="MarketingAccept" className="flex gap-4">
                                        <input
                                            type="checkbox"
                                            id="MarketingAccept"
                                            name="marketing_accept"
                                            className="h-5 w-5 rounded-md border-gray-200 bg-white shadow-sm"
                                        />

                                        <span className="text-sm text-gray-700">
                                            I want to receive emails about events, product updates and company announcements.
                                        </span>
                                    </label>
                                </div>

                                <div className="col-span-6">
                                    <p className="text-sm text-gray-500">
                                        By creating an account, you agree to our
                                        <a href="/terms_and_conditions" className="text-gray-700 underline"> terms and conditions </a>
                                        and
                                        <a href="/privacy" className="text-gray-700 underline">privacy policy</a>.
                                    </p>
                                </div>

                                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                                    <button
                                        type="submit"
                                        className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                                    >
                                        Create an account
                                    </button>

                                    <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                                        Already have an account?
                                        <Link
                                            to="/login"
                                            className="text-gray-700 underline"
                                        >
                                            Log in
                                        </Link>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </main>
                </div>
            </section>

        </>
    );
}

export default Signup;
