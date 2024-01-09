import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../utils/config';
import { useAuth } from '../../auth/AuthContext';
import { useNavigate } from 'react-router-dom';


const AddComplaint: React.FC = () => {
    const { user } = useAuth();

    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    // const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSendComplaint = async (e: React.FormEvent) => {
        e.preventDefault();

        // Trim and validate input fields
        const trimmedSubject = subject.trim();
        const trimmedDescription = description.trim();

        // Check for non-empty fields
        if (!trimmedSubject || !trimmedDescription) {
            setError('All fields are required');
            return;
        }

        try {
            await axios.post(`${API_BASE_URL}/api/complaints`, {
                subject: trimmedSubject,
                description: trimmedDescription,
                createdBy: user._id // Ensure that createdBy is correctly populated
            });

            // const { complaint } = response.data;

            // Reset error state and show success message
            setError(null);

            // Assume that you have a successful registration message to display
            setMessage("Complaint launched successfully");
            // console.log('Complaint launched successfully:', complaint);
            navigate('/launch_complaint');
        } catch (error: any) {
            console.error('Error sending complaint:', error);
            if (error.response) {
                console.error('Response:', error.response.data);
            }
            setError('An error occurred while sending the complaint');
        }
    };


    return (
        <>
            <section className="bg-gray-100">
                <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
                        <div className="lg:col-span-2 lg:py-12">
                            <p className="max-w-xl text-lg">
                                If you have any concerns or feedback, we value your input! Please feel free to reach out to us.
                                Your satisfaction is our priority, and we are here to assist you. You can contact us via phone or email.
                            </p>

                            <div className="mt-8">
                                <p className="text-xl font-bold text-pink-600">
                                    For complaints, please contact us at: {' '}
                                    <a href="tel:+1234567890">+123 456 7890</a> or {' '}
                                    <a href="mailto:complaints@example.com">complaints@clarekholdings.com</a>
                                </p>

                                <address className="mt-2 not-italic">
                                    Our office addresses:
                                    <br />
                                    B200 Stanley Sarova, Kimathi Street, Nairobi - Kenya
                                    <br />
                                    J12 Hotel Clarons, Abuja, Nigeria
                                </address>
                            </div>
                        </div>


                        <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
                            <form onSubmit={handleSendComplaint} className="space-y-4">
                                <div className="col-span-6 sm:col-span-3">
                                    {error && <div className="text-red-500">{error}</div>}
                                    {message && <div className="text-green-500">{message}</div>}
                                </div>
                                <div>
                                    <label className="sr-only" htmlFor="subject">Subject</label>
                                    <input
                                        className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                        placeholder="Subject"
                                        type="text"
                                        id="subject"
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label className="sr-only" htmlFor="message">Message</label>

                                    <textarea
                                        className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                        placeholder="Message"
                                        rows={8}
                                        id="message"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    ></textarea>
                                </div>

                                <div className="mt-4">
                                    <button
                                        type="submit"
                                        className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
                                    >
                                        Send Complaint
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>        </>
    );
}

export default AddComplaint;
