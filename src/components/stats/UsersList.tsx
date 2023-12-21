import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../auth/AuthContext';
import { API_BASE_URL } from '../../utils/config';

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  role: string;
}

const UsersList: React.FC = () => {
  const { token } = useAuth();

  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<{ users: User[] }>(`${API_BASE_URL}/api/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError('Error fetching users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div>
      <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
        <thead className="ltr:text-center rtl:text-center">
          <tr>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">First Name</th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Last Name</th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Phone</th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Email</th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Role</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user._id}>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">{user.firstName}</td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">{user.lastName}</td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">{user.phone}</td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">{user.email}</td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination or other components can be added here */}
    </div>
  );
};

export default UsersList;
