import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../auth/AuthContext';
import { API_BASE_URL } from '../../utils/config';

interface Complaint {
    _id: string;
    subject: string;
    description: string;
    status: string;
    createdBy: string;
    createdAt: string;
}

const ComplaintList: React.FC = () => {
    const { token } = useAuth();

    const [complaints, setComplaints] = useState<Complaint[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {    
        axios
          .get<Complaint[]>(`${API_BASE_URL}/api/complaints/`, {
            headers: {
              Authorization: `Token ${token}`,
            },
          })
          .then((response) => {
            setComplaints(response.data);
          })
          .catch((error) => {
            console.error("Error fetching expenses:", error);
            setError('Error fetching expenses');
            // setIsLoading(false);
          });
      }, [token]);

    return (
        <div>
            {error && <div className="text-red-500">{error}</div>}
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                <thead className="ltr:text-left rtl:text-right">
                    <tr>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Subject</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Description</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Status</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Created By</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Created At</th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                    {complaints.map((complaint) => (
                        <tr key={complaint._id}>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">{complaint.subject}</td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">{complaint.description}</td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">{complaint.status}</td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">{complaint.createdBy}</td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                {new Date(complaint.createdAt).toLocaleString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination or other components can be added here */}
        </div>
    );
};

export default ComplaintList;
