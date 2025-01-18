import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useSelector } from 'react-redux'; 

const AddUser = () => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const navigate = useNavigate();

  // Get the token from the Redux store
  const token = useSelector((state) => state.auth.token);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !role || !email) {
      setResponseMessage('All fields are required.');
      return;
    }

    try {
      const response = await axios.post(
        'https://api4.promittoltd.com/users/create',
        {
          name,
          role,
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );

      if (response.data.status === 'success') {
        setResponseMessage('User created successfully!');
        setName('');
        setRole('');
        setEmail('');
      } else {
        setResponseMessage(response.data.message);
      }
    } catch (error) {
      setResponseMessage('An error occurred while creating the user.');
      console.error(error);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto mt-10 bg-white rounded-xl shadow space-y-4">
  <div className='flex'>
      <h2 className="text-xl font-semibold font-poppins text-yellow-500 mb-4">Add User</h2>
      <button
          onClick={() => navigate("/admin")}
          className="bg-yellow-700 hover:bg-yelow-600 font-poppins text-white md:px-4 px-2 md:py-2 ml-auto mb-1 rounded-lg shadow-md"
        >
          Dashboard
        </button>
        </div>      {responseMessage && (
        <div className={`p-4 rounded text-center ${responseMessage.includes('success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {responseMessage}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Input */}
        <div>
          <label className="block font-medium font-poppins mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border font-poppins border-gray-300 rounded focus:outline-none focus:ring focus:ring-yellow-300"
            placeholder="Enter user name"
          />
        </div>
        {/* Role Dropdown */}
        <div>
          <label className="block font-medium font-poppins mb-2">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2 border border-gray-300 font-poppins rounded focus:outline-none focus:ring focus:ring-yellow-300"
          >
            <option value="">Select Role</option>
            <option value="Account Manager">Account Manager</option>
            <option value="Business Administrator">Business Administrator</option>
            <option value="Product Manager">Product Manager</option>
          </select>
        </div>
        {/* Email Input */}
        <div>
          <label className="block font-medium font-poppins mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border font-poppins border-gray-300 rounded focus:outline-none focus:ring focus:ring-yellow-300"
            placeholder="Enter email address"
          />
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-yellow-500 font-poppins font-semibold text-white py-2 rounded hover:bg-yellow-700 transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddUser;
