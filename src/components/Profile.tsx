import React from 'react';
import { useAuth } from '../auth/AuthContext';


const Profile: React.FC = () => {
    const { user } = useAuth();

    return (
        <>
        <h2>Profile</h2>
        {user && (
          <div>
            <p>Username: {user.username}</p>
            {/* Add other user details as needed */}
          </div>
        )}
      </>
    );
}

export default Profile;
