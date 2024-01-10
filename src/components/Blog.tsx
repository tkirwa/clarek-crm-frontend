import React from 'react';
import { Link } from 'react-router-dom';
import FooterSmall from './FooterSmall';


const Blog: React.FC = () => {

    const posts = [
        {
            title: "What is SaaS? Software as Link Service Explained",
            desc: "Discover the intricacies of Software as a Service (SaaS) by exploring its fundamental concepts, benefits, and applications, providing a comprehensive understanding of this innovative service model.",
            img: "https://images.unsplash.com/photo-1556155092-490a1ba16284?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
            date: "Jan 7 2024",
            to: ""
        },
        {
            title: "A Quick Guide to WordPress Hosting",
            desc: "Navigate the world of WordPress hosting with this quick guide, offering insights into choosing the right hosting provider, optimizing performance, and ensuring a seamless website experience.",
            img: "https://images.unsplash.com/photo-1620287341056-49a2f1ab2fdc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
            date: "Dec 11 2023",
            to: ""
        },
        {
            title: "7 Promising VS Code Extensions Introduced in 2023",
            desc: "Explore seven promising Visual Studio Code extensions introduced in 2023, enhancing your coding experience with new features, tools, and functionalities for increased productivity and efficiency.",
            img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
            date: "Nov 4 2023",
            to: ""
        },
        {
            title: "How to Use Root C++ Interpreter Shell to Write C++ Programs",
            desc: "Learn the process of utilizing the Root C++ Interpreter Shell to write and execute C++ programs interactively, fostering a dynamic and efficient coding experience.",
            img: "https://images.unsplash.com/photo-1617529497471-9218633199c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
            date: "Jan 4 2022",
            to: ""
        }
    ]
    return (
        <>
            <section className="py-32">
                <div className="max-w-screen-xl mx-auto px-4 md:px-8">
                    <div className="space-y-5 sm:text-center sm:max-w-md sm:mx-auto">
                        <h1 className="text-gray-800 text-3xl font-extrabold sm:text-4xl">Latest blog posts</h1>
                        <p className="text-gray-600">Blogs that are loved by the community. Updated every hour.</p>
                        <form onSubmit={(e) => e.preventDefault()} className="items-center justify-center gap-3 sm:flex">
                            <div className="relative">
                                <svg className="w-6 h-6 text-gray-400 absolute left-3 inset-y-0 my-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Enter your email"
                                    className="w-full pl-12 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg sm:max-w-xs"
                                />
                            </div>
                            <button className="block w-full mt-3 py-3 px-4 font-medium text-sm text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 active:shadow-none rounded-lg shadow sm:mt-0 sm:w-auto">
                                Subscribe
                            </button>
                        </form>
                    </div>
                    <ul className="grid gap-x-8 gap-y-10 mt-16 sm:grid-cols-2 lg:grid-cols-3">
                        {
                            posts.map((items, key) => (
                                <li className="w-full mx-auto group sm:max-w-sm" key={key}>
                                    <Link to={items.to}>
                                        <img src={items.img} loading="lazy" alt={items.title} className="w-full rounded-lg" />
                                        <div className="mt-3 space-y-2">
                                            <span className="block text-indigo-600 text-sm">{items.date}</span>
                                            <h3 className="text-lg text-gray-800 duration-150 group-hover:text-indigo-600 font-semibold">
                                                {items.title}
                                            </h3>
                                            <p className="text-gray-600 text-sm duration-150 group-hover:text-gray-800">{items.desc}</p>
                                        </div>
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </section>

            <FooterSmall />
        </>
    )
}

export default Blog;
