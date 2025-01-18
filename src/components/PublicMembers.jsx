import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { useSelector } from 'react-redux'; 
import { useNavigate } from "react-router-dom";

const ViewMembers = () => {
  const [members, setMembers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const recordsPerPage = 10;
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api4.promittoltd.com/data', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.status === 'success') {
          setMembers(response.data.data);
        } else {
          console.error("Failed to fetch members:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    if (token) fetchData();
  }, [token]);

  const totalRecords = members.length;
  const totalPages = Math.ceil(totalRecords / recordsPerPage);
  const currentRecords = members.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="p-4 relative">
      <div className="flex">
        <h1 className="text-xl text-yellow-500 text-center mb-4">
          View Membership Information
        </h1>
        <button
          onClick={() => navigate("/admin")}
          className="bg-yellow-700 hover:bg-yellow-600 text-white px-4 py-2 ml-auto mb-1 rounded-lg shadow-md"
        >
          Go to Dashboard
        </button>
      </div>

      <div className="overflow-auto">
        <table className="md:min-w-full w-auto bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-[#FFFCF2]">
              <th className="md:px-6 px-1 md:py-3 py-1 ml-1 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                No.
              </th>
              <th className="md:px-6 px-1 md:py-3 py-1 ml-1 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                Full Name
              </th>
              <th className="md:px-6 px-1 md:py-3 py-1 ml-1 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                DOB
              </th>
              <th className="md:px-6 px-1 md:py-3 py-1 ml-1 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                ID / Passport No.
              </th>
              <th className="md:px-6 px-1 md:py-3 py-1 ml-1 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                KRA PIN No.
              </th>
              <th className="md:px-6 px-1 md:py-3 py-1 ml-1 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                County
              </th>
              <th className="md:px-6 px-1 md:py-3 py-1 ml-1 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                Phone Number
              </th>
              <th className="md:px-6 px-1 md:py-3 py-1 ml-1 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                Project Type
              </th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((member, index) => {
              const { personal_details, property_details } = member;
              return (
                <tr key={personal_details.id}>
                  <td className="md:px-6 px-1 md:py-3 py-1 text-sm font-medium text-gray-900">
                    {(currentPage - 1) * recordsPerPage + index + 1}
                  </td>
                  <td className="md:px-6 px-1 md:py-3 py-1 text-sm text-gray-500">
                    {`${personal_details.first_name} ${personal_details.last_name}`}
                  </td>
                  <td className="md:px-6 px-1 md:py-3 py-1 text-sm text-gray-500">
                    {personal_details.dob}
                  </td>
                  <td className="md:px-6 px-1 md:py-3 py-1 text-sm text-gray-500">
                    {personal_details.id_number}
                  </td>
                  <td className="md:px-6 px-1 md:py-3 py-1 text-sm text-gray-500">
                    {personal_details.kra_pin}
                  </td>
                  <td className="md:px-6 px-1 md:py-3 py-1 text-sm text-gray-500">
                    {personal_details.county}
                  </td>
                  <td className="md:px-6 px-1 md:py-3 py-1 text-sm text-gray-500">
                    {personal_details.phone_number}
                  </td>
                  <td className="md:px-6 px-1 md:py-3 py-1 text-sm text-gray-500">
                    {property_details[0]?.type_of_project || "N/A"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between mt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="flex items-center px-3 py-1 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50"
        >
          <MdChevronLeft className="mr-1" /> Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="flex items-center px-3 py-1 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50"
        >
          Next <MdChevronRight className="ml-1" />
        </button>
      </div>
    </div>
  );
};

export default ViewMembers;
