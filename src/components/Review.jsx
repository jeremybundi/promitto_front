import React, { useState } from 'react';  
import { useSelector, useDispatch } from 'react-redux'; 
import axios from 'axios';
import { clearFormData } from '../formSlice'; 
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook


const Review = ({ onEditClick }) => {
  const dispatch = useDispatch();
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate(); 
  const personalDetails = useSelector((state) => state.form.personalDetails);
  const nextOfKin = useSelector((state) => state.form.nextOfKin);
  const remittanceDetails = useSelector((state) => state.form.remittanceDetails);
  const employmentDetails = useSelector((state) => state.form.employmentDetails) || {};
  const businessDetails = useSelector((state) => state.form.businessDetails) || {}; 
  const propertyDetails = useSelector((state) => state.form.propertyDetails) || {}; 

  // Function to handle submission
  const handleSubmit = async () => {
    const formData = {
      personalDetails,
      nextOfKin,
      remittanceDetails,
      employmentDetails,
      businessDetails,
      propertyDetails,
    };

    try {
      const response = await axios.post('https://api3.promittoltd.com/all-details', formData, {
        headers: {
            'Content-Type': 'application/json', 
        }
      });
      
      console.log('The data to be saved:', formData);
      console.log('Data submitted successfully:', response.data);

     
      dispatch(clearFormData());  

      // Show a success message
      setSuccessMessage('Data submitted successfully!');

      setTimeout(() => {
        navigate("https://account.promittoltd.com/");
      }, 2000); 
    


    } catch (error) {
      console.error('Error submitting data:', error);
      console.log('The data to be saved:', formData);

      // Check if the error has a response property (to get more information from the server)
      if (error.response) {
        console.error('Server responded with status:', error.response.status);
        console.error('Server response data:', error.response.data);
      } else if (error.request) {
        // The request was made, but no response was received
        console.error('No response received:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error setting up request:', error.message);
      }

      // Optional: Display a user-friendly error message
      alert('An error occurred while submitting the data. Please try again.');
    }
  };

  return (
    <div className="flex flex-col md:mx-24 text-xs items-center">
      <div className="bg-white rounded-xl p-8 w-full shadow-lg">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Review Your Details</h2>

        {/* Personal Details Section */}
        <div className="p-6 bg-gray-50 rounded-lg shadow-lg mb-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Personal Details</h3>
          <div className="mb-2">
            <strong className="text-[#F2B807]">First Name:</strong> <span>{personalDetails.firstName || 'N/A'}</span>
          </div>
          <div className="mb-2">
            <strong className="text-[#F2B807]">Middle Name:</strong> <span>{personalDetails.middleName  || 'N/A'}</span>
          </div>
          <div className="mb-2">
            <strong className="text-[#F2B807]">Last Name:</strong> <span>{personalDetails.lastName || 'N/A'}</span>
          </div>
          <div className="mb-2">
            <strong className="text-[#F2B807]">Gender:</strong> <span>{personalDetails.gender || 'N/A'}</span>
          </div>
          <div className="mb-2">
            <strong className="text-[#F2B807]">Marital Status:</strong> <span>{personalDetails.marital || 'N/A'}</span>
          </div>
          <div className="mb-2">
            <strong className="text-[#F2B807]">Date of Birth:</strong> <span>{personalDetails.dob|| 'N/A'}</span>
          </div>
          <div className="mb-2">
            <strong className="text-[#F2B807]">ID Number:</strong> <span>{personalDetails.idNumber || 'N/A'}</span>
          </div>
          <div className="mb-2">
            <strong className="text-[#F2B807]">KRA PIN:</strong> <span>{personalDetails.kraPin || 'N/A'}</span>
          </div>
          <div className="mb-2">
            <strong className="text-[#F2B807]">Valid Address:</strong> <span>{personalDetails.validAddress || 'N/A'}</span>
          </div>
          <div className="mb-2">
            <strong className="text-[#F2B807]">Postal Code:</strong> <span>{personalDetails.postalCode || 'N/A'}</span>
          </div>
          <div className="mb-2">
            <strong className="text-[#F2B807]">City:</strong> <span>{personalDetails.city || 'N/A'}</span>
          </div>
          <div className="mb-2">
            <strong className="text-[#F2B807]">County:</strong> <span>{personalDetails.county || 'N/A'}</span>
          </div>
          <div className="mb-2">
            <strong className="text-[#F2B807]">Country:</strong> <span>{personalDetails.country || 'N/A'}</span>
          </div>
          <div className="mb-2">
            <strong className="text-[#F2B807]">Phone Number:</strong> <span>{personalDetails.phoneNumber || 'N/A'}</span>
          </div>
          <div className="mb-2">
            <strong className="text-[#F2B807]">Email Address:</strong> <span>{personalDetails.emailAddress || 'N/A'}</span>
          </div>
          <div className="mb-2">
            <strong className="text-[#F2B807]">Housing Details:</strong> <span>{personalDetails.housingDetails || 'N/A'}</span>
          </div>
          <div className="mt-4 flex items-center justify-end">
            <p className="font-semibold text-sm cursor-pointer" onClick={() => onEditClick('Personal Details')}>
              Edit Personal Details
            </p>
          </div>
        </div>

        {/* Next of Kin Section */}
        {nextOfKin && (
          <div className="p-6 bg-gray-50 rounded-lg shadow-lg mb-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Next of Kin Details</h3>
            <div className="mb-2">
            <strong className="text-[#F2B807]">First Name:</strong> <span>{nextOfKin.firstName || 'N/A'}</span>
          </div>
          <div className="mb-2">
            <strong className="text-[#F2B807]">Middle Name:</strong> <span>{nextOfKin.middleName  || 'N/A'}</span>
          </div>
          <div className="mb-2">
            <strong className="text-[#F2B807]">Last Name:</strong> <span>{nextOfKin.lastName || 'N/A'}</span>
          </div>
            <div className="mb-2">
              <strong className="text-[#F2B807]">Relationship:</strong> <span>{nextOfKin.relationship || 'N/A'}</span>
            </div>
            <div className="mb-2">
              <strong className="text-[#F2B807]">Phone Number:</strong> <span>{nextOfKin.phone || 'N/A'}</span>
            </div>
            <div className="mb-2">
              <strong className="text-[#F2B807]">National Id No:</strong> <span>{nextOfKin.nationalId || 'N/A'}</span>
            </div>
            <div className="mb-2">
              <strong className="text-[#F2B807]">Date of Birth:</strong> <span>{nextOfKin.dob || 'N/A'}</span>
            </div>
            <div className="mt-4 flex items-center justify-end">
            <p className="font-semibold text-sm cursor-pointer" onClick={() => onEditClick('Next Of Kin')}>
              Edit Next Of Kin
            </p>
          </div>
          </div>
        )}

        {/* Employment Details Section */}
        <div className="p-6 bg-gray-50 rounded-lg shadow-lg mb-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Employment Details</h3>
          <div className="mb-2">
            <strong className="text-[#F2B807]">Employer Name:</strong> <span>{employmentDetails.employerName || 'N/A'}</span>
          </div>
          <div className="mb-2">
            <strong className="text-[#F2B807]">Postal Address:</strong> <span>{employmentDetails.postalAddress || 'N/A'}</span>
          </div>
          <div className="mb-2">
            <strong className="text-[#F2B807]">Postal Code:</strong> <span>{employmentDetails.postalCode || 'N/A'}</span>
          </div>
          <div className="mb-2">
            <strong className="text-[#F2B807]">Location:</strong> <span>{employmentDetails.location || 'N/A'}</span>
          </div>
          <div className="mb-2">
            <strong className="text-[#F2B807]">Email:</strong> <span>{employmentDetails.email || 'N/A'}</span>
          </div>
          <div className="mb-2">
            <strong className="text-[#F2B807]">Telephone:</strong> <span>{employmentDetails.telephone || 'N/A'}</span>
          </div>
          <div className="mb-2">
            <strong className="text-[#F2B807]">Job Title:</strong> <span>{employmentDetails.jobTitle || 'N/A'}</span>
          </div>
          <div className="mb-2">
            <strong className="text-[#F2B807]">Length of Service:</strong> <span>{employmentDetails.lengthOfService || 'N/A'}</span>
          </div>
          <div className="mb-2">
            <strong className="text-[#F2B807]">Terms of Employment:</strong> <span>{employmentDetails.termsOfEmployment || 'N/A'}</span>
          </div>
          <div className="mb-2">
            <strong className="text-[#F2B807]">Contract Period:</strong> <span>{employmentDetails.contractPeriod || 'N/A'}</span>
          </div>
          <div className="mt-4 flex items-center justify-end">
            <p className="font-semibold text-sm cursor-pointer" onClick={() => onEditClick('Employment Details')}>
              Edit Employment Details
            </p>
          </div>
        </div>
          {/* Business Details Section */}
          <div className="p-6 bg-gray-50 rounded-lg shadow-lg mb-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Business Details</h3>
          <div className="mb-2">
            <strong className="text-[#F2B807]">Business Name:</strong> <span>{businessDetails.businessName || 'N/A'}</span>
          </div>
          <div className="mb-2">
            <strong className="text-[#F2B807]">Nature of Business:</strong> <span>{businessDetails.natureOfBusiness || 'N/A'}</span>
          </div>
          <div className="mb-2">
            <strong className="text-[#F2B807]">Date of Registration:</strong> <span>{businessDetails.dateOfRegistration || 'N/A'}</span>
          </div>
          <div className="mb-2">
            <strong className="text-[#F2B807]">Postal Address:</strong> <span>{businessDetails.postalAddress || 'N/A'}</span>
          </div>
          <div className="mb-2">
            <strong className="text-[#F2B807]">Postal Code:</strong> <span>{businessDetails.postalCode || 'N/A'}</span>
          </div>
          <div className="mb-2">
            <strong className="text-[#F2B807]">City:</strong> <span>{businessDetails.city || 'N/A'}</span>
          </div>
          <div className="mb-2">
            <strong className="text-[#F2B807]">Email:</strong> <span>{businessDetails.email || 'N/A'}</span>
          </div>
          <div className="mb-2">
            <strong className="text-[#F2B807]">Telephone:</strong> <span>{businessDetails.telephone || 'N/A'}</span>
          </div>
             <div className="mt-4 flex items-center justify-end">
            <p className="font-semibold text-sm cursor-pointer" onClick={() => onEditClick('Business Details')}>
              Edit Business Details
            </p>
          </div>
        </div>
        
           {/* Property Details Section */}
           <div className="p-6 bg-gray-50 rounded-lg shadow-lg mb-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Property Details</h3>
          <div className="mb-2">
            <strong className="text-[#F2B807]">Location:</strong> <span>{propertyDetails.location || 'N/A'}</span>
          </div>
          <div className="mb-2">
            <strong className="text-[#F2B807]">Title Number:</strong> <span>{propertyDetails.titleNumber || 'N/A'}</span>
          </div>
          <div className="mb-2">
            <strong className="text-[#F2B807]">Land Reference No:</strong> <span>{propertyDetails.landReferenceNo || 'N/A'}</span>
          </div>
          <div className="mb-2">
            <strong className="text-[#F2B807]">Size of Project:</strong> <span>{propertyDetails.sizeOfProject || 'N/A'}</span>
          </div>
          <div className="mb-2">
            <strong className="text-[#F2B807]">Type of Project:</strong> <span>{propertyDetails.typeOfProject || 'Residential'}</span> {/* Default value */}
          </div>
          <div className="mb-2">
            <strong className="text-[#F2B807]">County:</strong> <span>{propertyDetails.county || 'N/A'}</span>
          </div>
          <div className="mb-2">
            <strong className="text-[#F2B807]">Ward:</strong> <span>{propertyDetails.ward || 'N/A'}</span>
          </div>
             <div className="mt-4 flex items-center justify-end">
            <p className="font-semibold text-sm cursor-pointer" onClick={() => onEditClick('Property Details')}>
              Edit Property Details
            </p>
          </div>
        </div>

         {/* Remittance Details Section */}
         <div className="p-6 bg-gray-50 rounded-lg shadow-lg mb-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Remittance Details</h3>
          <div className="mb-2">
            <strong className="text-[#F2B807]">Phone Number:</strong> <span>{remittanceDetails.phoneNumber || 'N/A'}</span>
          </div>
          <div className="mb-2">
            <strong className="text-[#F2B807]">Transaction Code:</strong> <span>{remittanceDetails.transactionCode || 'N/A'}</span>
          </div>
        </div>
    
         {/* Submit Button */}
       
         <div className="mt-4 flex-col ml-auto  items-center justify-end">
            {/* Success Message */}
            {successMessage && (
              <div className="my-4 text-green-500 italic">
                {successMessage}
              </div>
            )}
          <button
            className="bg-yellow-500 text-white md:px-6 px-3 md:py-2 py-1 font-poppins rounded-md hover:bg-yellow-700"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Review;
