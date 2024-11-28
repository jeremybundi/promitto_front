import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const EditMemberForm = ({ member, onUpdate, onClose }) => {
  const [formData, setFormData] = useState({
    personalDetails: {},
    nextOfKin: [],
    employmentDetails: [],
    businessDetails: [],
    propertyDetails: [],
    remittanceDetails: [],
  });
  const [statusMessage, setStatusMessage] = useState(null); // State for success or error message
  const [isError, setIsError] = useState(false); // State to track if the message is an error

  useEffect(() => {
    if (member) {
      setFormData({
        personalDetails: { ...member.personal_details },
        nextOfKin: [...member.next_of_kin],
        employmentDetails: [...member.employment_details],
        businessDetails: [...member.business_details],
        propertyDetails: [...member.property_details],
        remittanceDetails: [...member.remittance_details],
      });
    }
  }, [member]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      personalDetails: { ...prev.personalDetails, [name]: value },
    }));
  };

  const handleNextOfKinChange = (index, e) => {
    const { name, value } = e.target;
    const updatedKin = formData.nextOfKin.map((kin, idx) =>
      idx === index ? { ...kin, [name]: value } : kin
    );
    setFormData((prev) => ({ ...prev, nextOfKin: updatedKin }));
  };

  const handleEmploymentChange = (index, e) => {
    const { name, value } = e.target;
    const updatedEmployment = formData.employmentDetails.map((employment, idx) =>
      idx === index ? { ...employment, [name]: value } : employment
    );
    setFormData((prev) => ({ ...prev, employmentDetails: updatedEmployment }));
  };

  const handleBusinessChange = (index, e) => {
    const { name, value } = e.target;
    const updatedBusiness = formData.businessDetails.map((business, idx) =>
      idx === index ? { ...business, [name]: value } : business
    );
    setFormData((prev) => ({ ...prev, businessDetails: updatedBusiness }));
  };

  const handlePropertyChange = (index, e) => {
    const { name, value } = e.target;
    const updatedProperty = formData.propertyDetails.map((property, idx) =>
      idx === index ? { ...property, [name]: value } : property
    );
    setFormData((prev) => ({ ...prev, propertyDetails: updatedProperty }));
  };

  const handleRemittanceChange = (index, e) => {
    const { name, value } = e.target;
    const updatedRemittance = formData.remittanceDetails.map((remittance, idx) =>
      idx === index ? { ...remittance, [name]: value } : remittance
    );
    setFormData((prev) => ({ ...prev, remittanceDetails: updatedRemittance }));
  };

  const token = useSelector((state) => state.auth.token);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://api3.promittoltd.com/update/${formData.personalDetails.id}`,
        {
          personal_details: formData.personalDetails,
          next_of_kin: formData.nextOfKin,
          employment_details: formData.employmentDetails,
          business_details: formData.businessDetails,
          property_details: formData.propertyDetails,
          remittance_details: formData.remittanceDetails,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Member Updated');
      setStatusMessage('Member updated successfully!');
      setIsError(false);
      setTimeout(() => {
        onUpdate(response.data);
        onClose();
      }, 3000);
    } catch (error) {
      setStatusMessage('Failed to update member. Please try again.');
      setIsError(true);
      console.error('Error updating member:', error);
    }
  };

  return (
    <div className="modal bg-white p-5 rounded shadow-w-full mx-auto">
      <form onSubmit={handleSubmit}>
        {/* Personal Details */}
        <h3 className="text-lg text-[#F2B807] font-bold mb-2">Personal Details</h3>
        <div className="grid md:grid-cols-5 grid-cols-2  border p-4 rounded text-xs gap-4 mb-4">
          {[
            { name: 'first_name', label: 'First Name' },
            { name: 'middle_name', label: 'Middle Name' },
            { name: 'last_name', label: 'Last Name' },
            { name: 'gender', label: 'Gender' },
            { name: 'marital_status', label: 'Marital Status' },
            { name: 'dob', label: 'Date of Birth', type: 'date' },
            { name: 'id_number', label: 'ID Number' },
            { name: 'kra_pin', label: 'KRA PIN' },
            { name: 'valid_address', label: 'Valid Address' },
            { name: 'postal_code', label: 'Postal Code' },
            { name: 'city', label: 'City' },
            { name: 'county', label: 'County' },
            { name: 'country', label: 'Country' },
            { name: 'phone_number', label: 'Phone Number' },
            { name: 'email_address', label: 'Email Address', type: 'email' }
          ].map(({ name, label, type = 'text' }) => (
            <div key={name}>
              <label className="block font-poppins gray-600 font-semibold mb-1">{label}</label>
              <input
                type={type}
                name={name}
                value={formData.personalDetails[name] || ''}
                onChange={handleChange}
                className="border p-2 rounded mb-2 w-auto"
              />
            </div>
          ))}
        </div>

        {/* Next of Kin */}
        <h3 className="text-xs text-[#F2B807] font-bold mb-2">Next of Kin</h3>
        {formData.nextOfKin.map((kin, index) => (
          <div key={index} className="grid grid-cols-2 ml-2 md:mb-4 md:flex md:space-x-24 border md:p-4 rounded">
            {[
              { name: 'first_name', label: 'First Name' },
              { name: 'middle_name', label: 'Middle Name' },
              { name: 'last_name', label: 'Last Name' },
              { name: 'national_id', label: 'National ID' },
              { name: 'dob', label: 'Date of Birth', type: 'date' },
              { name: 'relationship', label: 'Relationship' },

              { name: 'phone', label: 'Phone' }
            ].map(({ name, label }) => (
              <div key={name}>
                <label className="block font-poppins gray-600 font-semibold text-xs mb-1">{label}</label>
                <input
                  type="text"
                  name={name}
                  value={kin[name] || ''}
                  onChange={(e) => handleNextOfKinChange(index, e)}
                  className="border p-2 rounded mb-2  text-xs w-auto"
                />
              </div>
            ))}
          </div>
        ))}

        {/* Employment Details */}
        <h3 className="text-xs font-bold text-[#F2B807] mb-2">Employment Details</h3>
        {formData.employmentDetails.map((employment, index) => (
          <div key={index} className="grid md:grid-cols-5 grid-cols-2  border p-4 text-xs gap-4 mb-4 rounded">
            {[
              { name: 'employer_name', label: 'Employer Name' },
              { name: 'postal_address', label: 'Postal Address' },
              { name: 'postal_code', label: 'Postal Code' },
              { name: 'location', label: 'Location' },
              { name: 'job_title', label: 'Position' },
              { name: 'email', label: 'Job Email' },
              { name: 'telephone', label: 'Employer Phone' },
              { name: 'length_of_service', label: 'Length of Service' },
              { name: 'terms_of_employment', label: 'Terms of Employment' },
              { name: 'contract_period', label: 'Contract Period' }
            ].map(({ name, label }) => (
              <div key={name}>
                <label className="block font-poppins gray-600 font-semibold mb-1">{label}</label>
                <input
                  type="text"
                  name={name}
                  value={employment[name] || ''}
                  onChange={(e) => handleEmploymentChange(index, e)}
                  className="border p-2 rounded mb-2 w-auto"
                />
              </div>
            ))}
          </div>
        ))}

        {/* Business Details */}
        <h3 className="text-xs font-bold text-[#F2B807] mb-2">Business Details</h3>
        {formData.businessDetails.map((business, index) => (
          <div key={index} className="grid md:grid-cols-5 grid-cols-2 border p-4 rounded text-xs gap-4 mb-4">
            {[
              { name: 'business_name', label: 'Business Name' },
              { name: 'telephone', label: 'Business Phone' },
              { name: 'postal_address', label: 'Business Address' },
              { name: 'postal_code', label: 'Postal Code' },
              { name: 'city', label: 'Business Location' },
              { name: 'email', label: 'Business Email' },


              {name:'date_of_registration', label: 'Date of Registration'},


              { name: 'nature_of_business', label: 'Business Type' }

            ].map(({ name, label }) => (
              <div key={name}>
                <label className="block font-poppins gray-600 font-semibold mb-1">{label}</label>
                <input
                  type="text"
                  name={name}
                  value={business[name] || ''}
                  onChange={(e) => handleBusinessChange(index, e)}
                  className="border p-2 rounded mb-2 w-auto"
                />
              </div>
            ))}
          </div>
        ))}

        {/* Property Details */}
        <h3 className="text-xs fontbold text-[#F2B807] mb-2">Property Details</h3>
        {formData.propertyDetails.map((property, index) => (
          <div key={index} className="mb-4 border text-xs p-4 rounded grid md:grid-cols-5 grid-cols-2 md:gap-4 gap-2 ">
            {[
              { name: 'location', label: 'Property Location' },
              { name: 'title_number', label: 'Title Number' },
              { name: 'land_reference_no', label: 'Reference Number' },
              { name: 'size_of_project', label: 'Size of Project' },
              { name: 'type_of_project', label: 'Type of Project' },
              { name: 'county', label: 'County' },
              { name: 'ward', label: 'Ward' }
            ].map(({ name, label }) => (
              <div key={name}>
                <label className="block font-poppins gray-600 font-semibold mb-1">{label}</label>
                <input
                  type="text"
                  name={name}
                  value={property[name] || ''}
                  onChange={(e) => handlePropertyChange(index, e)}
                  className="border p-2 rounded mb-2 w-auto"
                />
              </div>
            ))}
          </div>
        ))}

        {/* Remittance Details */}
        <h3 className="text-sm text-[#F2B807] font-bold mb-2">Remittance Details</h3>
        {formData.remittanceDetails.map((remittance, index) => (
          <div key={index} className="mb-4 border flex md:space-x-24 space-xl-1 p-4 rounded">
            {[
              { name: 'phone_number', label: 'Phone Number' },
              { name: 'transaction_code', label: 'Transaction Code' }
            ].map(({ name, label }) => (
              <div key={name}>
                <label className="block text-xs font-poppins gray-600 font-semibold mb-1">{label}</label>
                <input
                  type="text"
                  name={name}
                  value={remittance[name] || ''}
                  onChange={(e) => handleRemittanceChange(index, e)}
                  className="border p-2  text-xs rounded mb-2 w-auto"
                />
              </div>
            ))}
          </div>
        ))}

          {/* Submit and Cancel Buttons */}
        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Cancel
          </button>
         <div className='flex flex-col'>
          {statusMessage && (
        <div
            className={`mb-1   ${
              isError ? 'text-[9px] text-red-700' : ' text-[9px] text-green-700'
            }`}
          >
            {statusMessage}
          </div>
        )}
          <button
            type="submit"
            className="bg-[#F2B807] text-white px-4 py-2 rounded-xl hover:bg-yellow-300"
          >
            Update Member
          </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditMemberForm;
