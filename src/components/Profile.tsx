import React, { useEffect } from 'react';
// import React, { useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthContext';

const Profile: React.FC = () => {
  const { token, user } = useAuth();
  // const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        console.log(user);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    if (token) {
      fetchUserProfile();
    }
  }, [token, user]);

  return (
    <div>
      {user ? (
        <>
          <h1>Welcome, {user.firstName} {user.lastName}!</h1>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
          <p>Role: {user.role}</p>
          <p>Dark Mode: {`${user.settings.darkMode}`}</p>
          <p>Dark Mode: {user.settings.language}</p>
          {/* Add more details as needed */}
        </>
      ) : (
        <p>Loading user profile...</p>
      )}
    </div>
  );
};

export default Profile;
