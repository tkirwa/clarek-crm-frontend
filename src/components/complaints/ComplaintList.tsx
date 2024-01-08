import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../auth/AuthContext';
import { API_BASE_URL } from '../../utils/config';
import Pagination from '../../utils/Pagination';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


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

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);


    useEffect(() => {
        axios
            .get<Complaint[]>(`${API_BASE_URL}/api/complaints/`, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            })
            .then((response) => {
                setComplaints(response.data);

                // Update total pages based on the response, adjust as needed
                setTotalPages(Math.ceil(response.data.length / 10));
            })
            .catch((error) => {
                console.error("Error fetching expenses:", error);
                setError('Error fetching expenses');
                // setIsLoading(false);
            });
    }, [token, currentPage]);

    const truncateDescription = (description: any, maxWords: any) => {
        const words = description.split(' ');
        const truncatedWords = words.slice(0, maxWords);
        return truncatedWords.join(' ');
    };


    // Handle current page change - Pa
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };


    const generatePDF = () => {
        const doc = new jsPDF();

        // Define table header
        const tableHeader = [['#SN', 'Subject', 'Status', 'Created By', 'Created At']];

        // Map complaints data to table rows
        const tableRows = complaints.map((complaint, index) => [
            index + 1,
            complaint.subject,
            complaint.status,
            complaint.createdBy,
            complaint.createdAt,
        ]);

        // Add table to the PDF
        autoTable(doc, {
            head: tableHeader,
            body: tableRows,
        });

        // Save the PDF
        doc.save('complaints_list.pdf');
    };

    return (
        <div>
            {error && <div className="text-red-500">{error}</div>}

            <button
                className="group relative inline-flex items-center overflow-hidden rounded bg-indigo-600 px-8 py-3 text-white focus:outline-none focus:ring active:bg-indigo-500"
                onClick={generatePDF}
            >
                <span className="absolute -start-full transition-all group-hover:start-4">
                    <svg className="h-8 w-8 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">  <polyline points="6 9 6 2 18 2 18 9" />  <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />  <rect x="6" y="14" width="12" height="8" /></svg>
                </span>

                <span className="text-sm font-medium transition-all group-hover:ms-4"> Download PDF </span>
            </button>
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
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">  {truncateDescription(complaint.description, 5)}</td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">{complaint.status}</td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">{complaint.createdBy}</td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                {new Date(complaint.createdAt).toLocaleString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />

            {/* Pagination or other components can be added here */}
        </div>
    );
};

export default ComplaintList;
