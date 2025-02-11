import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BoardMember = () => {
  const { memberId } = useParams();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!memberId) {
      setError("Invalid member ID.");
      setLoading(false);
      return;
    }

    const fetchMemberData = async () => {
      try {
        console.log("Fetching data for memberId:", memberId); // Debugging
        const response = await axios.get(`https://api4.promittoltd.com/board-members/${memberId}`);
        console.log("Fetched member data:", response.data);
        setMember(response.data);
      } catch (err) {
        setError("Failed to fetch member data. Please try again later.");
        console.error("Error fetching member data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMemberData();
  }, [memberId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;


  return (
    <div className="max-w-6xl mx-auto p-6  ">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* First Column: Image, Name, Role */}
      <div className="flex flex-col items-center bg-gray-50 border shadow rounded-xl space-y-4">
        <img
          src={member.image_url}
          alt={member.name}
          className="w-full h-auto object-cover "
        />
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800">{member.name}</h2>
          <p className="text-lg text-yellow-400">{member.role}</p>
        </div>
      </div>
  
      {/* Second Column: About, Career History */}
      <div className="flex flex-col space-y-3 md:space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">About</h3>
          <p className="text-sm text-gray-600 mt-2">{member.about}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800">Career History</h3>
          <p className="text-sm text-gray-600 mt-2">{member.career_history}</p>
        </div>
      </div>
  
      {/* Third Column: Achievements, Expertise */}
      <div className="flex flex-col  md:space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">Achievements</h3>
          <p className="text-sm text-gray-600 mt-2">{member.achievements}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800">Expertise</h3>
          <p className="text-sm text-gray-600 mt-2">{member.expertise}</p>
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default BoardMember;
