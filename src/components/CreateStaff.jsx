import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateStaff = () => {
  const token = useSelector((state) => state.auth.token);  // Get token from Redux store
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);  // Loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);  // Set loading to true before submission

    const formData = new FormData();
    formData.append('name', name);
    formData.append('role', role);
    formData.append('email', email);
    if (image) formData.append('image', image);

    try {
      const response = await axios.post(
        'https://api4.promittoltd.com/staff/create',
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,  // Use token from Redux store
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      if (response.data.status === 'success') {
        setMessage('Staff member created successfully!');
        setName('');
        setRole('');
        setEmail('');
        setImage(null);  // Reset the image after submission
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);  // Set loading to false after submission
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <div className='flex'>
        <h2 className="text-xl font-semibold font-poppins text-yellow-500 mb-4">Create Staff</h2>
        <button
          onClick={() => navigate("/admin")}
          className="bg-yellow-700 hover:bg-yellow-600 font-poppins text-white md:px-4 px-2 md:py-2 ml-auto mb-1 rounded-lg shadow-md"
        >
          Dashboard
        </button>
      </div>
      
      {message && <div className="mb-4 text-green-600">{message}</div>}
      {error && <div className="mb-4 text-red-600">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-gray-700 font-medium">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter staff name"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="role" className="block text-gray-700 font-medium">Role</label>
          <input
            type="text"
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Enter staff role"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-gray-700 font-medium">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter staff email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="image" className="block text-gray-700 font-medium">Profile Picture</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full text-sm text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-200"
          >
            {loading ? (
              <span>Creating Staff...</span> // Show loading message when submitting
            ) : (
              'Create Staff'
            )}
            {loading && <span className="ml-2">...</span>}  {/* Show dots */}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateStaff;
