import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { FaTrashAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux'; // Import useSelector to get the token

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Get the token from the Redux store
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api3.promittoltd.com/users', {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        });
        if (response.data.status === 'success') {
          setUsers(response.data.users);
          console.log(response.data.users);
        } else {
          setError('Failed to fetch users.');
        }
      } catch (err) {
        setError('An error occurred while fetching users.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]); // Add token as a dependency to refetch if it changes

  const handleDelete = async () => {
    try {
      await axios.delete(`https://api3.promittoltd.com/users/${userIdToDelete}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the headers
        },
      });
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userIdToDelete));
      setShowModal(false);
      setMessage('User deleted successfully!');
    } catch (error) {
      setMessage('Failed to delete the user.');
      console.error(error);
    }
  };

  const handleDeleteClick = (id) => {
    setUserIdToDelete(id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="p-6 mb-4">
        <div className='flex'>
      <h1 className="text-xl text-yellow-500 font-semibold mb-4">Users List</h1>
      <button
          onClick={() => navigate("/admin")}
          className="bg-yellow-700 hover:bg-yelow-600 font-semibold text-white md:px-4 px-2 text-xs md:text-sm py-2 ml-auto mb-4 rounded-lg shadow-md"
        >
          Go to Dashboard
        </button>
        </div>
      
      {/* Displaying success or error message */}
      {message && (
        <div
          className={`p-4 mb-4 rounded-md ${
            message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {message}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded border-gray-200">
          <thead>
            <tr>
              <th className="py-3 px-4 border-b border-gray-200 bg-gray-50 text-left text-yellow-700 text-sm font-semibold">
                ID
              </th>
              <th className="py-3 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-semibold text-yellow-700">
                Name
              </th>
              <th className="py-3 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-semibold text-yellow-700">
                Role
              </th>
              <th className="py-3 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-semibold text-yellow-700">
                Email
              </th>
              <th className="py-3 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-semibold text-yellow-700">
                Created At
              </th>
              <th className="py-3 px-4 border-b border-gray-200 bg-gray-50 text-center text-sm font-semibold text-yellow-700">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.id}
                className={`hover:bg-gray-50 ${
                  index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                }`}
              >
                <td className="py-2 px-4 border-b text-sm border-gray-200 text-gray-700">{user.id}</td>
                <td className="py-2 px-4 border-b text-sm border-gray-200 text-gray-700">{user.name}</td>
                <td className="py-2 px-4 border-b text-sm border-gray-200 text-gray-700">{user.role}</td>
                <td className="py-2 px-4 border-b text-sm border-gray-200 text-gray-900">{user.email}</td>
                <td className="py-2 px-4 border-b text-sm border-gray-200 text-gray-700">{user.created_at}</td>
                <td className="py-2 px-4 border-b text-sm border-gray-200 text-center">
                  <button
                    onClick={() => handleDeleteClick(user.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrashAlt className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold text-gray-700">Are you sure you want to delete this user?</h2>
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleCloseModal}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTable;
