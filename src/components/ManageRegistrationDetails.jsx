import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ManageRegistrationDetails = () => {
    const [requirements, setRequirements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState(null); // State for success/error message
    const token = useSelector((state) => state.auth.token); 
    const navigate = useNavigate();

    // Fetch registration requirements
    useEffect(() => {
        const fetchRequirements = async () => {
            try {
                const response = await axios.get('https://api4.promittoltd.com/registration-requirements');
                if (response.data.status === 'success') {
                    setRequirements(response.data.data);
                }
            } catch (error) {
                console.error("Error fetching registration requirements", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRequirements();
    }, []);

    // Handle delete requirement
    const handleDelete = async (id) => {
        if (!token) {
            setMessage({ type: 'error', text: 'Token not found' });
            return;
        }

        try {
            const response = await axios.delete(`https://api4.promittoltd.com/registration-requirements/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data.status === 'success') {
                setRequirements(requirements.filter(req => req.id !== id)); 
                setMessage({ type: 'success', text: 'Requirement deleted successfully' });
            } else {
                setMessage({ type: 'error', text: 'Failed to delete requirement' });
            }
        } catch (error) {
            console.error("Error deleting requirement:", error);
            setMessage({ type: 'error', text: 'Error deleting requirement' });
        }

        // Hide message after 3 seconds
        setTimeout(() => setMessage(null), 3000);
    };

    return (
        <div className="flex justify-center items-center mb-48">
            <div className="max-w-3xl w-full bg-white p-6 rounded-lg shadow-lg">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold font-poppins text-yellow-500">
                        Manage Registration Details
                    </h2>
                    <button
                        onClick={() => navigate("/admin")}
                        className="bg-yellow-700 hover:bg-yellow-600 font-poppins text-white px-4 py-2 rounded-lg shadow-md"
                    >
                        Dashboard
                    </button>
                </div>

                {/* Display Message */}
                {message && (
                    <div
                        className={`p-3 mb-4 text-center rounded-md ${
                            message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}
                    >
                        {message.text}
                    </div>
                )}

                {/* Table or Loading State */}
                {loading ? (
                    <p className="text-center text-gray-600">Loading...</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border border-gray-300 px-4 py-2">#</th>
                                    <th className="border border-gray-300 px-4 py-2">Requirement Name</th>
                                    <th className="border border-gray-300 px-4 py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {requirements.map((requirement, index) => (
                                    <tr key={requirement.id} className="hover:bg-gray-100">
                                        <td className="border border-gray-300 px-4 py-2 text-center">
                                            {index + 1} {/* Numbering starts from 1 */}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {requirement.requirement_name}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">
                                            <button
                                                onClick={() => handleDelete(requirement.id)}
                                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageRegistrationDetails;
