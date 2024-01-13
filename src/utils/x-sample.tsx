import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext'; // Adjust the path based on your project structure
// import logoSm from '../assets/logo192.png';

const Header: React.FC = () => {
    const { token } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        // Implement your logout logic here, e.g., clear the token
        // ...

        // Redirect to the login page after logout
        navigate('/login');
    };

    return (
        <header className="bg-white">
            <div className="flex items-center gap-4">

                {token ? (
                    // If logged in, show logout button
                    <></>
                ) : (
                    // If not logged in, show login and signup buttons
                    <></>
                )}
                
            </div>
        </header >
    );
};

export default Header;
