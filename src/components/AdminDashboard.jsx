import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 max-w-lg mx-auto mt-2 bg-white rounded-xl md:mb-12 shadow space-y-4">
      <h2 className="text-2xl font-semibold font-lufga text-center">Admin Dashboard</h2>
      <div className="space-y-4 mb-6 font-semibold">
        {/* First Row */}
        <div className="flex space-x-5 mb-6 mt-8">
          <button
            onClick={() => navigate('/house/done')}
            className="w-full md:py-4 md:px-4 p-2 text-xs md:text-lg bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
          >
            Add Product
          </button>
          <button
            onClick={() => navigate('/delete/done')}
            className="w-full md:py-2 md:px-4 p-2 text-xs md:text-lg bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
          >
            View Products
          </button>
        </div>
        {/* Second Row */}
        <div className="flex space-x-5 mb-6">
          <button
            onClick={() => navigate('/house/ongoing')}
            className="w-full md:py-2 md:px-4 p-2 text-xs md:text-lg bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-300"
          >
            Add Ongoing Products
          </button>
          <button
            onClick={() => navigate('/delete/ongoing')}
            className="w-full md:py-2 md:px-4 p-2 text-xs md:text-lg bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition duration-300"
          >
            View Ongoing Projects
          </button>
        </div>
        {/* Third Row */}
        <div className="flex space-x-5 mt-3 ">
          <button
            onClick={() => navigate('/add/user')}
            className="w-full md:py-3 md:px-4 p-2 text-xs md:text-lg bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition duration-300"
          >
            Add Users
          </button>
          <button
            onClick={() => navigate('/user/data')}
            className="w-full md:py-3 md:px-4 p-2 text-xs md:text-lg bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
          >
            Manage Users
          </button>
        </div>
      </div>
      {/* Add View Registered Members Button */}
      <div className="mt-6 text-center">
        <button
          onClick={() => navigate('/view/members')}
          className="w-full py-3 px-6 text-lg bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition duration-300"
        >
          View Registered Members
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
