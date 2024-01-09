import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../utils/config';


const ForgotPassword: React.FC = () => {
    const [phone, setPhone] = useState('');
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    // const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [codeFieldVisible, setCodeFieldVisible] = useState(false);
    const [sendCodeButtonVisible, setSendCodeButtonVisible] = useState(true);
    const [verifyCodeButtonVisible, setVerifyCodeButtonVisible] = useState(false);
    const [visiblePasswordFields, setVisiblePasswordFields] = useState(false);
    const navigate = useNavigate();

    const handleSendCode = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setLoading(true);
            await axios.post(
                `${API_BASE_URL}/api/sms/send-code`,
                { phone }
            );

            // console.log('Verification code sent via SMS:', response);
            setMessage("");
            setMessage("Verification code sent via SMS");
            setCodeFieldVisible(true);
            setVerifyCodeButtonVisible(true);
            setSendCodeButtonVisible(false);

        } catch (error: any) {
            setError((error.response?.data?.error as string) || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyCode = async () => {
        try {
            setLoading(true);
            const response = await axios.post(
                `${API_BASE_URL}/api/sms/verify-code`,
                { phone, code }
            );
            console.log('Verification API Response:', response);


            // Handle verification success
            setMessage("");
            setMessage(response.data.message || 'Verification successful');
            setSendCodeButtonVisible(!verifyCodeButtonVisible);
            setVerifyCodeButtonVisible(sendCodeButtonVisible);
            setVisiblePasswordFields(true);
            setCodeFieldVisible(false);
            // Perform any additional actions after successful verification
            // For example, redirect the user to the password reset page
            // navigate('/reset-password');
        } catch (error: any) {
            setError((error.response?.data?.error as string) || 'Verification failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();

        // Trim and validate input fields
        const trimmedPhone = phone.trim();
        const trimmedPassword = password.trim();
        const trimmedPasswordConfirmation = passwordConfirmation.trim();

        // Check for non-empty fields
        if (
            !trimmedPhone ||
            !trimmedPassword ||
            !trimmedPasswordConfirmation
        ) {
            setError('All fields are required');
            return;
        }

        // Remove spaces from the phone number
        const formattedPhone = trimmedPhone.replace(/\s/g, '');

        // Password confirmation validation
        if (trimmedPassword !== trimmedPasswordConfirmation) {
            setError('Password and password confirmation do not match');
            return;
        }

        setLoading(true);

        try {
            const response = await axios.put(
                `${API_BASE_URL}/api/auth/reset-password`,
                {
                    phone: formattedPhone,
                    password: trimmedPassword,
                    confirmPassword: trimmedPasswordConfirmation,
                });
            setMessage("");

            // Password reset successful
            setMessage(response.data.message || 'Password reset successful');

            // Redirect to login page after successful password reset
            navigate('/login');
        } catch (error: any) {
            setError((error.response?.data?.error as string) || 'Password reset failed. Please try again.');
        } finally {
            setLoading(false);
        }

    }



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
                <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
                    <div className="mx-auto max-w-lg text-center">
                        <h1 className="text-2xl font-normal sm:text-3xl"><strong>Clarek CRM</strong> : : Reset Password</h1>
                    </div>
                    <form onSubmit={handleSendCode} className="mx-auto mb-0 mt-8 max-w-md space-y-4">
                        {loading && <div className="text-gray-500">Loading...</div>}

                        {error && <div className="text-red-500">{error}</div>}
                        {message && <div className="text-green-500">{message}</div>}



                        <div>
                            <label htmlFor="phone" className="sr-only">Phone</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    disabled={!sendCodeButtonVisible}
                                    required
                                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    placeholder="+234XXXXXXXX..."
                                />
                                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
                                    </svg>

                                </span>
                            </div>
                        </div>

                        {codeFieldVisible && (
                            <div>
                                <label htmlFor="code" className="sr-only"></label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={code}
                                        onChange={(e) => setCode(e.target.value)}
                                        className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                        placeholder="Verifcation code"
                                        disabled={!verifyCodeButtonVisible}

                                    />

                                </div>
                            </div>

                        )}

                        <div className="flex items-center justify-between">

                            {sendCodeButtonVisible && (
                                <button
                                    type="submit"
                                    className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
                                    disabled={loading}
                                >
                                    Send Code
                                    <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24" fill="currentColor"
                                            className="w-6 h-6">
                                            <path
                                                d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                                        </svg>

                                    </span>
                                </button>
                            )}
                            {verifyCodeButtonVisible && (
                                <button
                                    type="button"
                                    onClick={handleVerifyCode}
                                    className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
                                >
                                    Verify Code
                                </button>

                            )}

                        </div>

                        {visiblePasswordFields && (
                            <>
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

                                <button
                                    type="button"
                                    onClick={handleResetPassword}
                                    className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
                                >
                                    Reset Password
                                </button>

                            </>

                        )}
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

export default ForgotPassword;
