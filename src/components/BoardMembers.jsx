import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BoardMembers = () => {
  const [boardMembers, setBoardMembers] = useState([]);

  useEffect(() => {
    const fetchBoardMembers = async () => {
      try {
        const response = await axios.get('/api/board-members'); // Replace with your API endpoint
        setBoardMembers(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching board members:', error);
      }
    };

    fetchBoardMembers();
  }, []);

  return (
    <div className="container mx-auto py-6 ">
      <h1 className="text-2xl text-center font-medium mt-2 mb-4 font-sans">Our Board Members</h1>
      <p className='bg-[#F2B807] rounded-tr-lg rounded-br-lg text-white md:w-[25%] w-[80%] ml-2 p-3 text-xs italic'>
        ‘The key to successful leadership today is influence, not authority.’
      </p>

      {/* Small Screen Layout */}
      <div className="block md:hidden">
        {boardMembers.map((member) => (
          <div
            key={member.id}
            className="flex flex-col bg-white mb-4 p-4 rounded-lg shadow-lg"
          >
            {/* Name and Role Section */}
            <div className="bg-white mb-4 p-4 rounded-lg">
              <h2 className="text-xl text-[#F2B807] font-semibold">{member.name}</h2>
              <p className="text-gray-600 font-bold">{member.role}</p>
            </div>

            {/* Image Section */}
            {member.image_url && (
              <div className="w-full mb-4 flex justify-center">
                <img
                  src={member.image_url}
                  alt={member.name}
                  className="w-2/3 h-auto rounded-md object-cover"
                />
              </div>
            )}

            {/* About Section */}
            <div className="bg-gray-100 h-auto rounded-xl p-4">
              <div className="mb-2">
                <strong className="block text-gray-700 text-sm font-lufga">About</strong>
                <p className="text-gray-700 text-xs font-poppins">{member.about}</p>
              </div>
              <div className="mb-2">
                <strong className="block text-gray-700 text-sm font-lufga">Career History</strong>
                <p className="text-gray-700 text-xs font-poppins">{member.career_history}</p>
              </div>
              <div className="mb-2">
                <strong className="block text-gray-700 text-sm font-lufga">Achievements</strong>
                <p className="text-gray-700 text-xs font-poppins">{member.achievements}</p>
              </div>
              <div className="mb-2">
                <strong className="block text-gray-700 text-sm font-lufga">Expertise</strong>
                <p className="text-gray-700 text-xs font-poppins">{member.expertise}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Large Screen Layout */}
      <div className="hidden md:block">
        {boardMembers.map((member, index) => (
          <div
            key={member.id}
            className={`flex ${index % 2 === 0 ? 'flex-row-reverse' : 'flex-row'} bg-white mb-4 p-4 rounded-lg shadow-lg`}
          >
            {/* Image Section */}
            {member.image_url && (
              <div className={`md:w-[30%] flex justify-center`}>
                <img
                  src={member.image_url}
                  alt={member.name}
                  className="w-full h-[95%] rounded-md object-cover"
                />
              </div>
            )}

            {/* Name, Role, and About Section */}
            <div className={`w-full md:w-[70%] ${index % 2 === 1 ? 'pl-8' : 'pr-8'}`}>
              {/* Name and Role Section */}
              <div className="bg-white mb-4 p-4 rounded-lg">
                <h2 className="text-xl text-[#F2B807] font-semibold">{member.name}</h2>
                <p className="text-gray-600 font-bold">{member.role}</p>
              </div>

              {/* About Section */}
              <div className="bg-gray-100 h-auto rounded-xl pr-24 py-4 pl-3">
                <div className="mb-2">
                  <strong className="block text-gray-700 font-lufga">About</strong>
                  <p className="text-gray-700 text-xs font-poppins">{member.about}</p>
                </div>
                <div className="mb-2">
                  <strong className="block text-gray-700 font-lufga">Career History</strong>
                  <p className="text-gray-700 text-xs font-poppins">{member.career_history}</p>
                </div>
                <div className="mb-2">
                  <strong className="block text-gray-700 font-lufga">Achievements</strong>
                  <p className="text-gray-700 text-xs font-poppins">{member.achievements}</p>
                </div>
                <div className="mb-2">
                  <strong className="block text-gray-700 font-lufga">Expertise</strong>
                  <p className="text-gray-700 text-xs font-poppins">{member.expertise}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoardMembers;
