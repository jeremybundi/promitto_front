import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ManageStaff = () => {
  const token = useSelector((state) => state.auth.token);  // Get token from Redux store
  const [staff, setStaff] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await axios.get('https://api4.promittoltd.com/staff');
        console.log("API Response:", response);  
        if (response.data && Array.isArray(response.data)) {  
          setStaff(response.data);  
        } else {
          setError('Failed to fetch staff data');
        }
      } catch (error) {
        console.log("Error fetching staff data:", error);  
        setError('An error occurred while fetching staff data');
      }
    };
  
    fetchStaff();
  }, []);  

  // Handle delete operation (Token required here)
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `https://api4.promittoltd.com/staff/${id}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,  // Use token from Redux store for DELETE request
          },
        }
      );
      if (response.data.status === 'success') {
        setStaff(staff.filter((staffMember) => staffMember.id !== id));
      } else {
        setError('Failed to delete staff member');
      }
    } catch (error) {
      setError('An error occurred while deleting staff member');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex mt-8 mb-6">
        <h2 className="text-xl font-semibold font-poppins text-yellow-500 mb-4">Manage Staff</h2>
        <button
          onClick={() => navigate("/admin")}
          className="bg-yellow-700 hover:bg-yellow-600 font-poppins text-white md:px-4 px-2 md:py-2 ml-auto mb-1 rounded-lg shadow-md"
        >
          Dashboard
        </button>
      </div>

      {error && <div className="text-red-600">{error}</div>}

      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-500 text-white">
          <tr>
            <th className="px-6 py-4 text-left">#</th>
            <th className="px-6 py-4 text-left">Name</th>
            <th className="px-6 py-4 text-left">Image</th>
            <th className="px-6 py-4 text-left">Role</th>
            <th className="px-6 py-4 text-left">Email</th>
            <th className="px-6 py-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {staff.map((member, index) => (
            <tr key={member.id} className="border-b hover:bg-gray-100">
              <td className="px-6 py-4">{index + 1}</td>
              <td className="px-6 py-4 flex items-center">
                {member.name}
              </td>
              <td className="px-6 py-4"> <img src={member.image_url} alt={member.name} className="w-12 h-12 rounded-full mr-4" />
              </td>

              <td className="px-6 py-4">{member.role}</td>
              <td className="px-6 py-4">{member.email}</td>
              <td className="px-6 py-4">
                <button 
                  onClick={() => handleDelete(member.id)}
                  className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded-lg transition duration-200"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageStaff;
