import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ManageBoardMembers = () => {
  const [boardMembers, setBoardMembers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token); // For delete operation

  useEffect(() => {
    const fetchBoardMembers = async () => {
      try {
        const response = await axios.get(
          'https://api4.promittoltd.com/board-members'
        );
        setBoardMembers(response.data);
      } catch (err) {
        setError('Failed to fetch board members');
      }
    };

    fetchBoardMembers();
  }, []);

  const handleDelete = async () => {
    if (!deleteId) return;

    setLoading(true);
    try {
      await axios.delete(`https://api4.promittoltd.com/board-members/${deleteId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBoardMembers(boardMembers.filter((member) => member.id !== deleteId));
      setSuccessMessage('Board member deleted successfully!');
      setShowConfirmDelete(false);
    } catch (err) {
      setError('Failed to delete board member');
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowConfirmDelete(true);
  };

  const cancelDelete = () => {
    setShowConfirmDelete(false);
    setDeleteId(null);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto mt-4 bg-white rounded-xl shadow space-y-4">
      <div className="flex mt-8 mb-6">
        <h2 className="text-xl font-semibold font-poppins text-yellow-500 mb-4">
          Manage Board Members
        </h2>
        <button
          onClick={() => navigate('/admin')}
          className="bg-yellow-700 hover:bg-yellow-600 font-poppins text-white md:px-4 px-2 md:py-2 ml-auto mb-1 rounded-lg shadow-md"
        >
          Dashboard
        </button>
      </div>

      {error && <p className="text-red-500 text-center">{error}</p>}
      {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}

      <table className="min-w-full table-auto mt-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left border-b">#</th>
            <th className="px-4 py-2 text-left border-b">Name</th>
            <th className="px-4 py-2 text-left border-b">Role</th>
            <th className="px-4 py-2 text-left border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {boardMembers.map((member, index) => (
            <tr key={member.id} className="border-b">
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">{member.name}</td>
              <td className="px-4 py-2">{member.role}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => confirmDelete(member.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Confirmation Popup */}
      {showConfirmDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs">
            <h3 className="text-lg font-semibold mb-4">Are you sure you want to delete this member?</h3>
            <div className="flex justify-end space-x-4">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
              >
                {loading ? 'Deleting...' : 'Confirm Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageBoardMembers;
