import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrashAlt, FaDownload } from 'react-icons/fa';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { useNavigate } from "react-router-dom";
//import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx'; // Import the xlsx library
import EditMemberForm from './EditMemberForm'; // Import the form component
import { useSelector } from 'react-redux'; // Import useSelector


const ViewMembers = () => {
  const [members, setMembers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
    const navigate = useNavigate();

  const recordsPerPage = 10;
  // Get the token from the Redux store
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
          // Clear the state before setting the new data
          setMembers([]);
          setMembers(response.data.data);
          console.log("Members fetched:", response.data.data);
        } else {
          console.error("Failed to fetch members:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    if (token) {
      fetchData();
    } else {
      console.warn("No token found. Fetching data aborted.");
    }
  }, [token]);
  

  const handleUpdate = async (id, updatedData) => {
    try {
      const response = await axios.put(`https://api3.promittoltd.com/update/${id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.data.status === 'success') {
        console.log('Data updated');
        setMembers((prev) =>
          prev.map((member) =>
            member.personal_details.id === id ? { ...member, ...updatedData } : member
          )
        );
      } else {
        console.error("Update failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating member:", error);
    }
  };
  

  const handleEditClick = (member) => {
    setSelectedMember(member);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`https://api4.promittoltd.com/data/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token here
        },
      });
      if (response.data.status === 'success') {
        setMembers(members.filter(member => member.personal_details.id !== id));
      }
    } catch (error) {
      console.error("Error deleting member:", error);
    }
  };

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

  const closeEditForm = () => {
    setIsEditing(false);
    setSelectedMember(null);
  };

  const downloadExcel = (member) => {
    const {
      personal_details,
      next_of_kin,
      employment_details,
      business_details,
      property_details,
      remittance_details
    } = member;
  
    // Flatten the data into a single object for the Excel sheet
    const dataToExport = {
      ID: personal_details.id,
      FirstName: personal_details.first_name,
      MiddleName: personal_details.middle_name,
      LastName: personal_details.last_name,
      Gender: personal_details.gender,
      MaritalStatus: personal_details.marital_status,
      DOB: personal_details.dob,
      IDNumber: personal_details.id_number,
      KRA_PIN: personal_details.kra_pin,
      ValidAddress: personal_details.valid_address,
      PostalCode: personal_details.postal_code,
      City: personal_details.city,
      County: personal_details.county,
      Country: personal_details.country,
      PhoneNumber: personal_details.phone_number,
      EmailAddress: personal_details.email_address,
      CreatedAt: personal_details.created_at,
      UpdatedAt: personal_details.updated_at,
    };
  
    // Add Next of Kin details - Make sure to append a unique index to each key
    if (next_of_kin.length > 0) {
      next_of_kin.forEach((kin, index) => {
        dataToExport[`NextOfKin_${index + 1}_ID`] = kin.id;
        dataToExport[`NextOfKin_${index + 1}_FirstName`] = kin.first_name;
        dataToExport[`NextOfKin_${index + 1}_MiddleName`] = kin.middle_name;
        dataToExport[`NextOfKin_${index + 1}_LastName`] = kin.last_name;
        dataToExport[`NextOfKin_${index + 1}_Relationship`] = kin.relationship;
        dataToExport[`NextOfKin_${index + 1}_Phone`] = kin.phone;
        dataToExport[`NextOfKin_${index + 1}_NationalID`] = kin.national_id;
        dataToExport[`NextOfKin_${index + 1}_DOB`] = kin.dob;
      });
    }
  
    // Add Employment details
    if (employment_details.length > 0) {
      employment_details.forEach((employment, index) => {
        dataToExport[`Employment_${index + 1}_ID`] = employment.id;
        dataToExport[`Employment_${index + 1}_EmployerName`] = employment.employer_name;
        dataToExport[`Employment_${index + 1}_PostalAddress`] = employment.postal_address;
        dataToExport[`Employment_${index + 1}_PostalCode`] = employment.postal_code;
        dataToExport[`Employment_${index + 1}_Location`] = employment.location;
        dataToExport[`Employment_${index + 1}_Email`] = employment.email;
        dataToExport[`Employment_${index + 1}_Telephone`] = employment.telephone;
        dataToExport[`Employment_${index + 1}_JobTitle`] = employment.job_title;
        dataToExport[`Employment_${index + 1}_LengthOfService`] = employment.length_of_service;
        dataToExport[`Employment_${index + 1}_TermsOfEmployment`] = employment.terms_of_employment;
        dataToExport[`Employment_${index + 1}_ContractPeriod`] = employment.contract_period;
      });
    }
  
    // Add Business details
    if (business_details.length > 0) {
      business_details.forEach((business, index) => {
        dataToExport[`Business_${index + 1}_ID`] = business.id;
        dataToExport[`Business_${index + 1}_Name`] = business.business_name;
        dataToExport[`Business_${index + 1}_NatureOfBusiness`] = business.nature_of_business;
        dataToExport[`Business_${index + 1}_DateOfRegistration`] = business.date_of_registration;
        dataToExport[`Business_${index + 1}_PostalAddress`] = business.postal_address;
        dataToExport[`Business_${index + 1}_PostalCode`] = business.postal_code;
        dataToExport[`Business_${index + 1}_City`] = business.city;
        dataToExport[`Business_${index + 1}_Email`] = business.email;
        dataToExport[`Business_${index + 1}_Telephone`] = business.telephone;
      });
    }
  
    // Add Property details
    if (property_details.length > 0) {
      property_details.forEach((property, index) => {
        dataToExport[`Property_${index + 1}_ID`] = property.id;
        dataToExport[`Property_${index + 1}_Location`] = property.location;
        dataToExport[`Property_${index + 1}_TitleNumber`] = property.title_number;
        dataToExport[`Property_${index + 1}_LandReferenceNo`] = property.land_reference_no;
        dataToExport[`Property_${index + 1}_SizeOfProject`] = property.size_of_project;
        dataToExport[`Property_${index + 1}_TypeOfProject`] = property.type_of_project;
        dataToExport[`Property_${index + 1}_County`] = property.county;
        dataToExport[`Property_${index + 1}_Ward`] = property.ward;
      });
    }
  
    // Add Remittance details
    if (remittance_details.length > 0) {
      remittance_details.forEach((remittance, index) => {
        dataToExport[`Remittance_${index + 1}_ID`] = remittance.id;
        dataToExport[`Remittance_${index + 1}_PhoneNumber`] = remittance.phone_number;
        dataToExport[`Remittance_${index + 1}_TransactionCode`] = remittance.transaction_code;
      });
    }
  
    // Convert the object to a worksheet
    const worksheet = XLSX.utils.json_to_sheet([dataToExport]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Member Data');
  
    // Generate buffer and trigger download
    XLSX.writeFile(workbook, `${personal_details.first_name}_${personal_details.last_name}_Data.xlsx`);
  };
  
  

  return (
    <div className="p-4  relative"> {/* Set relative position on the parent */}
    <div className='flex'>
      <h1 className=" md:text-xl text-lg font-semibold text-yellow-500 font-poppins text-center  mb-4">Membership Information</h1>
      <button
          onClick={() => navigate("/admin")}
          className="bg-yellow-700 hover:bg-yelow-600 font-lufga text-white md:px-4 px-2 md:py-2 ml-auto mb-1 text-xs md:text-sm py-0 rounded-lg shadow-md"
        >
          Dashboard
        </button>
        </div>
     
      <div className="overflow-auto">
        <table className="md:min-w-full w-auto  bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-[#FFFCF2]">
              <th className="md:px-6 px-1 md:py-3 py-1 ml-1 text-left text-xs font-lufga font-bold text-gray-500 uppercase tracking-wider">No.</th>
              <th className="md:px-6 px-1 md:py-3 py-1  ml-1 text-left text-xs font-lufga font-bold text-gray-500 uppercase tracking-wider">Full Name</th>
              <th className="md:px-6 px-1 md:py-3 py-1  ml-1 text-left text-xs font-lufga font-bold text-gray-500 uppercase tracking-wider">DOB</th>
              <th className="md:px-6 px-1 md:py-3 py-1 ml-1  text-left text-xs font-lufga font-bold text-gray-500 uppercase tracking-wider">ID / Passport No.</th>
              <th className="md:px-6 px-1 md:py-3 py-1 ml-1 text-left text-xs font-lufga font-bold text-gray-500 uppercase tracking-wider">KRA PIN No.</th>
              <th className="md:px-6 px-1 md:py-3 py-1 ml-1 text-left text-xs font-lufga font-bold text-gray-500 uppercase tracking-wider">County</th>
              <th className="md:px-6 px-1 md:py-3 py-1 ml-1 text-left text-xs font-lufga font-bold text-gray-500 uppercase tracking-wider">Phone Number</th>
              <th className="md:px-6 px-1 md:py-3 py-1 ml-1 text-left text-xs font-lufga font-bold text-gray-500 uppercase tracking-wider">Project Type</th>
              <th className="md:px-6 px-1 md:py-3 py-1 ml-1 text-center text-xs font-lufga font-bold text-[#F2B807] uppercase tracking-wider">Update</th>
              <th className="md:px-6 px-1 md:py-3 py-1 ml-1 text-center text-xs font-lufga font-bold text-red-600 uppercase tracking-wider">Delete</th>
              <th className="md:px-6 px-1 md:py-3 py-1 ml-1 text-center text-xs font-lufga font-bold text-green-600 uppercase tracking-wider">Download</th>
            </tr>      
          </thead>
          <tbody>
            {currentRecords.map((member, index) => {
              const { personal_details, property_details } = member;
              const fullName = `${personal_details.first_name} ${personal_details.middle_name} ${personal_details.last_name}`;
              const projectType = property_details[0]?.type_of_project || "N/A";

              return (
                <tr
                  key={personal_details.id}
                  className={index % 2 === 0 ? 'bg-white' : 'bg-[#FFFCF2]'}
                >
                  <td className="md:px-6 text-center md:py-4 whitespace-nowrap md:text-sm text-xs font-medium text-gray-900">
                    {(currentPage - 1) * recordsPerPage + index + 1}
                  </td>
                  <td className="md:px-6 md:py-4  ml-2 whitespace-nowrap font-poppins md:text-sm text-xs font-medium text-gray-900">
                    {fullName}
                  </td>
                  <td className="md:px-6 md:py-4 ml-2 whitespace-nowrap font-poppins md:text-sm text-xs text-gray-500">
                    {personal_details.dob}
                  </td>
                  <td className="md:px-6 md:py-4 ml-2 whitespace-nowrap font-poppins md:text-sm text-xs text-gray-500">
                    {personal_details.id_number}
                  </td>
                  <td className="md:px-6 md:py-4 ml-2 whitespace-nowrap font-poppins md:text-sm text-xs text-gray-500">
                    {personal_details.kra_pin}
                  </td>
                  <td className="md:px-6 md:py-4 ml-2 whitespace-nowrap font-poppins md:text-sm text-xs text-gray-500">
                    {personal_details.county}
                  </td>
                  <td className="md:px-6 md:py-4 ml-2 whitespace-nowrap font-poppins md:text-sm text-xs text-gray-500">
                    {personal_details.phone_number}
                  </td>
                  <td className="md:px-6 md:py-4 ml-2 whitespace-nowrap font-poppins md:text-sm text-xs text-gray-500">
                    {projectType}
                  </td>
                  <td className="md:px-6 md:py-4 ml-2 whitespace-nowrap font-poppins text-center md:text-sm  text-xs font-medium">
                    <button
                      onClick={() => handleEditClick(member)}
                      className="text-[#F2B807] hover:text-[#F2B807]"
                    >
                      <FaEdit />
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                    <button
                      onClick={() => handleDelete(personal_details.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                    <button
                      onClick={() => downloadExcel(member)} // Call the download function with the member data
                      className="text-green-600 hover:text-green-800"
                    >
                      <FaDownload/> {/* You can use any icon here */}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between mt-4">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          <MdChevronLeft className="text-2xl" />
        </button>
        <span>{currentPage} / {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          <MdChevronRight className="text-2xl" />
        </button>
      </div>
      {isEditing && (
        <EditMemberForm
          member={selectedMember}
          onUpdate={handleUpdate}
          onClose={closeEditForm}
        />
      )}
    </div>
  );
};

export default ViewMembers;
