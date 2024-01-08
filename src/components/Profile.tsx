import React, { useEffect } from 'react';
// import React, { useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthContext';

const Profile: React.FC = () => {
  // const { token, user } = useAuth();
  const { token, user, setUser } = useAuth();

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
  }, [token, user, setUser]);

  return (
    <div>
      {user ? (
        <>

          <div className="flow-root rounded-lg border border-gray-100 py-3 shadow-sm">
            <dl className="-my-3 divide-y divide-gray-100 text-sm">
              <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Full name</dt>
                <dd className="text-gray-700 sm:col-span-2">{user.firstName} {user.lastName}</dd>
              </div>

              <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Email</dt>
                <dd className="text-gray-700 sm:col-span-2">{user.email}</dd>
              </div>

              <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Phone</dt>
                <dd className="text-gray-700 sm:col-span-2">+{user.phone}</dd>
              </div>

              <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Role</dt>
                <dd className="text-gray-700 sm:col-span-2">{user.role}</dd>
              </div>

              {/* <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">User ID</dt>
                <dd className="text-gray-700 sm:col-span-2">{user._id}</dd>
              </div> */}

              <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900"><label htmlFor="darkMode" className="flex items-center">Dark Mode</label></dt>
                <dd className="text-gray-700 sm:col-span-2">
                  <div className="relative h-8 w-14 cursor-pointer">
                    <span className="absolute inset-0 rounded-full bg-gray-300 transition peer-checked:bg-green-500"></span>
                    <input
                      type="checkbox"
                      id="darkMode"
                      className="peer sr-only"
                      defaultChecked={user.settings.darkMode}
                      disabled
                    />
                    <span className="absolute inset-y-0 start-0 m-1 h-6 w-6 rounded-full bg-white transition-all peer-checked:start-6"></span>
              </div>
            </dd>
          </div>

          <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Language</dt>
            <dd className="text-gray-700 sm:col-span-2">{user.settings.language}</dd>
          </div>

        </dl>
    </div>

        </>
      ) : (
  <p>Loading user profile...</p>
)}
    </div >
  );
};

export default Profile;
