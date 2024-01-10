import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../auth/AuthContext';
import { API_BASE_URL } from '../../utils/config';
import Pagination from '../../utils/Pagination';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Link } from 'react-router-dom';
import FooterSmall from '../FooterSmall';


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
        const itemsPerPage = 10;
        const startIndex = (currentPage - 1) * itemsPerPage;

        axios
            .get<Complaint[]>(`${API_BASE_URL}/api/complaints/`, {
                headers: {
                    Authorization: `Token ${token}`,
                },
                params: {
                    // Adjust the API to support pagination
                    _start: startIndex,
                    _limit: itemsPerPage,
                },
            })
            .then((response) => {
                setComplaints(response.data);

                // Update total pages based on the response headers
                const totalCount = parseInt(response.headers['x-total-count'], 10);
                setTotalPages(Math.ceil(totalCount / itemsPerPage));
            })
            .catch((error) => {
                console.error("Error fetching complaints:", error);
                setError('Error fetching complaints');
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
        <>
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

            </div>

            <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
                <table className="w-full table-auto text-sm text-left">
                    <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                        <tr>
                            <th className="py-3 px-6">Subject</th>
                            <th className="py-3 px-6">Description</th>
                            <th className="py-3 px-6">Status</th>
                            <th className="py-3 px-6">Created By</th>
                            <th className="py-3 px-6"></th>

                        </tr>
                    </thead>
                    <tbody className="text-gray-600 divide-y">
                        {
                            complaints.map((complaint) => (
                                <tr key={complaint._id}>

                                    <td className="px-6 py-4 whitespace-nowrap">{complaint.subject}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{truncateDescription(complaint.description, 5)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{complaint.status}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{complaint.createdBy}</td>
                                    <td className="text-right px-6 whitespace-nowrap">
                                        <Link to="" className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg">
                                            Edit
                                        </Link>
                                        <button className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />

            </div>

            <FooterSmall />
        </>

    );
};

export default ComplaintList;
