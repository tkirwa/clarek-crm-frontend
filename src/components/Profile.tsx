import React, { useEffect } from 'react';
// import React, { useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { Link } from 'react-router-dom';

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
          <p>User ID: {user._id}</p>
          <p>Dark Mode: {`${user.settings.darkMode}`}</p>
          <p>Dark Mode: {user.settings.language}</p>

          <div>
            <div className="sm:hidden">
              <label htmlFor="Tab" className="sr-only">Tab</label>

              <select id="Tab" className="w-full rounded-md border-gray-200">
                <option>Settings</option>
                <option>Messages</option>
                <option>Archive</option>
                <option selected>Notifications</option>
              </select>
            </div>

            <div className="hidden sm:block">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex gap-6" aria-label="Tabs">
                  <Link
                    to="#"
                    className="shrink-0 border-b-2 border-transparent px-1 pb-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  >
                    Settings
                  </Link>

                  <Link
                    to="#"
                    className="shrink-0 border-b-2 border-transparent px-1 pb-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  >
                    Messages
                  </Link>

                  <Link
                    to="#"
                    className="shrink-0 border-b-2 border-transparent px-1 pb-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  >
                    Archive
                  </Link>

                  <Link
                    to="#"
                    className="shrink-0 border-b-2 border-sky-500 px-1 pb-4 text-sm font-medium text-sky-600"
                    aria-current="page"
                  >
                    Notifications
                  </Link>
                </nav>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Loading user profile...</p>
      )}
    </div>
  );
};

export default Profile;
