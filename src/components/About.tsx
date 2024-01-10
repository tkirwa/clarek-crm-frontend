import React from 'react';
import { Link } from 'react-router-dom';
// import { useAuth } from '../utils/AuthContext';


const About: React.FC = () => {
    const team = [
        {
            avatar: "/images/tk_photo.jpeg",
            name: "Tonny Kirwa",
            title: "Software Engineer",
            linkedin: "https://www.linkedin.com/in/tonny-kirwa-957ba0104/",
            twitter: "https://twitter.com/tonnykirwa",
        },
        {
            avatar: "/images/co_photo.jpeg",
            name: "Micheal colorand",
            title: "Software Engineer",
            linkedin: "",
            twitter: "",
        },
        {
            avatar: "/images/bm_photo.jpeg",
            name: "Basmath Kaku",
            title: "Marketing Co-ordinator",
            linkedin: "",
            twitter: "",

        },
    ]

    return (
        <>
            <section className="py-14">
                <div className="max-w-screen-xl mx-auto px-4 md:px-8">
                    <div className="max-w-xl mx-auto sm:text-center">
                        <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
                            Our team
                        </h3>
                        <p className="text-gray-600 mt-3">
                            Meet the talented individuals who contribute to our success
                        </p>
                    </div>
                    <div className="mt-12">
                        <ul className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
                            {
                                team.map((item, idx) => (
                                    <li key={idx}>
                                        <div className="w-full h-60 sm:h-52 md:h-56">
                                            <img
                                                src={process.env.PUBLIC_URL + item.avatar} // Updated path
                                                className="w-full h-full object-cover object-center shadow-md rounded-xl"
                                                alt=""
                                            />
                                        </div>
                                        <div className="mt-4">
                                            <h4 className="text-lg text-gray-700 font-semibold">{item.name}</h4>
                                            <p className="text-indigo-600">{item.title}</p>
                                            <div className="mt-3 flex gap-4 text-gray-400">
                                                <Link to={item.twitter}>
                                                    <svg className="w-5 h-5 duration-150 hover:text-gray-500" fill="currentColor" viewBox="0 0 48 48"><g clip-path="url(#clip0_17_80)"><path fill="currentColor" d="M15.1 43.5c18.11 0 28.017-15.006 28.017-28.016 0-.422-.01-.853-.029-1.275A19.998 19.998 0 0048 9.11c-1.795.798-3.7 1.32-5.652 1.546a9.9 9.9 0 004.33-5.445 19.794 19.794 0 01-6.251 2.39 9.86 9.86 0 00-16.788 8.979A27.97 27.97 0 013.346 6.299 9.859 9.859 0 006.393 19.44a9.86 9.86 0 01-4.462-1.228v.122a9.844 9.844 0 007.901 9.656 9.788 9.788 0 01-4.442.169 9.867 9.867 0 009.195 6.843A19.75 19.75 0 010 39.078 27.937 27.937 0 0015.1 43.5z" /></g><defs><clipPath id="clip0_17_80"><path fill="currentColor" d="M0 0h48v48H0z" /></clipPath></defs></svg>
                                                </Link>
                                                <Link to={item.linkedin}>
                                                    <svg className="w-5 h-5 duration-150 hover:text-gray-500" fill="none" viewBox="0 0 48 48"><g clip-path="url(#clip0_17_68)"><path fill="currentColor" d="M44.447 0H3.544C1.584 0 0 1.547 0 3.46V44.53C0 46.444 1.584 48 3.544 48h40.903C46.407 48 48 46.444 48 44.54V3.46C48 1.546 46.406 0 44.447 0zM14.24 40.903H7.116V17.991h7.125v22.912zM10.678 14.87a4.127 4.127 0 01-4.134-4.125 4.127 4.127 0 014.134-4.125 4.125 4.125 0 010 8.25zm30.225 26.034h-7.115V29.766c0-2.653-.047-6.075-3.704-6.075-3.703 0-4.265 2.896-4.265 5.887v11.325h-7.107V17.991h6.826v3.13h.093c.947-1.8 3.272-3.702 6.731-3.702 7.21 0 8.541 4.744 8.541 10.912v12.572z" /></g><defs><clipPath id="clip0_17_68"><path fill="currentColor" d="M0 0h48v48H0z" /></clipPath></defs></svg>
                                                </Link>
                                            </div>

                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </section>

        </>
    );
}

export default About;
