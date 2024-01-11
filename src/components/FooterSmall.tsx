import React from 'react';

const FooterSmall: React.FC = () => {

    const currentYear = new Date().getFullYear();

    return (
        <>

            <footer className="bg-white">
                <div className="mx-auto max-w-screen-xl px-4 pb-8 pt-16 sm:px-6 lg:px-8">
                    <div className="mt-16 border-t border-gray-100 pt-8">
                        <p className="text-center text-xs/relaxed text-gray-500">
                            © Clarek Holding limited {currentYear}. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </>

    );
}

export default FooterSmall;
