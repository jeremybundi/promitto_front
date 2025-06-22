import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const CreateBoardMember = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token); // Assuming token is in the auth slice of the Redux store
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [about, setAbout] = useState('');
  const [careerHistory, setCareerHistory] = useState('');
  const [achievements, setAchievements] = useState('');
  const [expertise, setExpertise] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('name', name);
    formData.append('role', role);
    formData.append('about', about);
    formData.append('career_history', careerHistory);
    formData.append('achievements', achievements);
    formData.append('expertise', expertise);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await axios.post(
        'https://api4.promittoltd.com/board-members',
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      if (response.data.status === 'success') {
        setMessage('Board member created successfully!');
        // Optionally reset form fields after successful submission
        setName('');
        setRole('');
        setAbout('');
        setCareerHistory('');
        setAchievements('');
        setExpertise('');
        setImage(null);
      } else {
        setError('Error: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error creating board member:', error);
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <div className='flex'>
        <h2 className="text-xl font-semibold font-poppins text-yellow-500 mb-4">Create Board Member</h2>
        <button
          onClick={() => navigate("/admin")}
          className="bg-yellow-700 hover:bg-yellow-600 font-poppins text-white md:px-4 px-2 md:py-2 ml-auto mb-1 rounded-lg shadow-md"
        >
          Dashboard
        </button>
      </div>
      
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {message && <p className="text-green-500 text-center mb-4">{message}</p>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
            required
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold">Role</label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Enter role"
            required
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold">About</label>
          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="Tell us about the board member"
            required
            rows="4"
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold">Career History</label>
          <textarea
            value={careerHistory}
            onChange={(e) => setCareerHistory(e.target.value)}
            placeholder="Enter career history"
            required
            rows="4"
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold">Achievements</label>
          <textarea
            value={achievements}
            onChange={(e) => setAchievements(e.target.value)}
            placeholder="Enter achievements"
            required
            rows="4"
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold">Expertise</label>
          <textarea
            value={expertise}
            onChange={(e) => setExpertise(e.target.value)}
            placeholder="Enter expertise"
            required
            rows="4"
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold">Upload Image</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            accept="image/*"
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-500 transition duration-200"
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Create Board Member'}
        </button>
      </form>
    </div>
  );
};

export default CreateBoardMember;
