import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const AddRegistrationRequirements = () => {
  const [requirements, setRequirements] = useState(['']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); // ✅ Success message state
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  const handleRequirementChange = (index, value) => {
    const updatedRequirements = [...requirements];
    updatedRequirements[index] = value;
    setRequirements(updatedRequirements);
  };

  const addRequirementField = () => {
    setRequirements([...requirements, '']);
  };

  const removeRequirementField = (index) => {
    const updatedRequirements = requirements.filter((_, idx) => idx !== index);
    setRequirements(updatedRequirements);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!requirements || requirements.length === 0) {
      setError('Please enter at least one registration requirement.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        'https://api4.promittoltd.com/registration-requirements/add',
        {
          requirements: requirements.filter((req) => req.trim() !== ''),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status === 'success') {
        setSuccess('Registration requirements added successfully!'); // ✅ Set success message
        setRequirements(['']); // Clear form
      } else {
        setError(response.data.message || 'Failed to add registration requirements');
      }
    } catch (err) {
      setError('An error occurred while submitting the form.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex">
        <h2 className="text-xl font-semibold font-poppins text-yellow-500 mb-4">
          Add Registration Details
        </h2>
        <button
          onClick={() => navigate("/admin")}
          className="bg-yellow-700 hover:bg-yellow-600 font-poppins text-white md:px-4 px-2 md:py-2 ml-auto mb-1 rounded-lg shadow-md"
        >
          Dashboard
        </button>
      </div>

      {/* ✅ Show success message */}
      {success && <div className="text-green-500 text-sm mb-4">{success}</div>}

      {/* ✅ Show error message */}
      {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

      <form onSubmit={handleSubmit}>
        {requirements.map((requirement, index) => (
          <div key={index} className="mb-4">
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={requirement}
              onChange={(e) => handleRequirementChange(index, e.target.value)}
              placeholder={`Requirement #${index + 1}`}
            />
            <button
              type="button"
              className="text-red-500 mt-2"
              onClick={() => removeRequirementField(index)}
            >
              Remove
            </button>
          </div>
        ))}

        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={addRequirementField}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add Another Requirement
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Submit Requirements'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRegistrationRequirements;
