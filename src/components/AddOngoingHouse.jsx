import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux'; // Import useSelector to access the Redux store

const AddOngoingHouse = () => {
  const [formData, setFormData] = useState({
    description: '',
    location: '',
    image: null,
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Get the token from the Redux store
  const token = useSelector((state) => state.auth.token);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('description', formData.description);
    form.append('location', formData.location);
    form.append('image', formData.image);

    try {
      const response = await axios.post(
        'https://api3.promittoltd.com/house-ongoing/create', 
        form,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`, 
          },
        }
      );

      if (response.data.status === 'success') {
        setMessage(response.data.message);
       // console.log(formData);
        //console.log('Project added successfully', response.data.message);
        setError('');
        // Reset form fields
        setFormData({
          description: '',
          location: '',
          image: null,
        });
      } else {
        setError(response.data.message);
        setMessage('');
      }
    } catch (error) {
      setError('Something went wrong');
      setMessage('');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md">
        <div className='flex'>
      <h2 className="text-xl font-semibold text-yellow-500 mb-4">Add Ongoing Projects</h2>
      <button
          onClick={() => navigate("/admin")}
          className="bg-yellow-700 hover:bg-yelow-600 text-white px-4 py-2 ml-auto mb-1 rounded-lg shadow-md"
        >
          Go to Dashboard
        </button>
        </div>

      {message && <div className="text-green-500 mb-4">{message}</div>}
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-300"
          />
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-300"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleFileChange}
            className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-300"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-400 transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddOngoingHouse;
