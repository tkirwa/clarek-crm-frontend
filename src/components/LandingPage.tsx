import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../auth/AuthContext'; // Adjust the path based on your project structure


const LandingPage: React.FC = () => {

    // const { token } = useAuth();
    // const [loggedIn, setLoggedIn] = useState<boolean>(false); // Updated to boolean
    const navigate = useNavigate();


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
            <section
                className="relative bg-[url(https://images.unsplash.com/photo-1604014237800-1c9102c219da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80)] bg-cover bg-center bg-no-repeat"
            >
                <div
                    className="absolute inset-0 bg-white/75 sm:bg-transparent sm:from-white/95 sm:to-white/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"
                ></div>

                <div
                    className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8"
                >
                    <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
                        <h1 className="text-3xl font-extrabold sm:text-5xl">
                            Let us find your

                            <strong className="block font-extrabold text-rose-700"> Forever Home. </strong>
                        </h1>

                        <p className="mt-4 max-w-lg sm:text-xl/relaxed">
                            A comprehensive system designed to manage and optimize interactions with customers and other stakeholders in the business!
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4 text-center">
                            <Link
                                to="/signup"
                                className="block w-full rounded bg-rose-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto"
                            >
                                Get Started
                            </Link>

                            <Link
                                to="/about"
                                className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-rose-600 shadow hover:text-rose-700 focus:outline-none focus:ring active:text-rose-500 sm:w-auto"
                            >
                                About Us
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default LandingPage;
