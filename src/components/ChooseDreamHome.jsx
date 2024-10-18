import React from 'react';

const ChooseDreamHome = () => {
  return (
    <div className="flex items-center justify-center bg-white">
      <div className=" p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">
          Choose Your Dream Home
        </h1>
        <p className="text-gray-600 mb-6">
          Explore our exclusive list of beautiful homes and make your dream come true.
        </p>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
          Start Exploring
        </button>
      </div>
    </div>
  );
};

export default ChooseDreamHome;
