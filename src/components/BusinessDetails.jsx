import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveBusinessDetails } from '../formSlice';

const BusinessDetails = ({ onNext, onPrevious }) => {
  const dispatch = useDispatch();
  const storedBusinessDetails = useSelector((state) => state.form.businessDetails); // Adjust the selector based on your state structure

  const [formData, setFormData] = useState({
    businessName: '',
    natureOfBusiness: '',
    dateOfRegistration: '',
    postalAddress: '',
    postalCode: '',
    city: '',
    email: '',
    telephone: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Set formData from stored business details when the component mounts
    if (storedBusinessDetails) {
      setFormData(storedBusinessDetails);
    }
  }, [storedBusinessDetails]); // Only run when storedBusinessDetails changes

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Clear the error for the current field
  };

  const validateForm = () => {
    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) {
        newErrors[key] = 'This field is required';
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) {
      return; // Stop if there are validation errors
    }

    dispatch(saveBusinessDetails(formData));
    console.log('Saved Data:', formData);
    onNext();
  };

  const handleBack = () => {
    // Handle back navigation logic here
    if (!validateForm()) {
      return; 
    }
    dispatch(saveBusinessDetails(formData));
    console.log('Saved Data:', formData);
    onPrevious();
  };

  return (
    <div className=" md:mx-36 p-6 bg-white rounded-lg ">
      <form className="grid  md:mx-4 grid-cols-2 gap-6">
        
        {/* Name of Business */}
        <div className='flex flex-col'>
          <label className="relative text-sm text-gray-700 mb-1">
            Name of Business
            <span className="text-[#F2B807] absolute top-[-4px] right-[5px] md:right-[190px]">*</span>
          </label>
          <input
            type="text"
            name="businessName"
            value={formData.businessName}
            onChange={handleInputChange}
            className={`mt-1 md:w-2/3 w-[140px] px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-yellow-500 ${errors.businessName ? 'border-red-500' : ''}`}
            placeholder="Enter business name"
          />
          {errors.businessName && <p className="text-red-500 text-xs">{errors.businessName}</p>}
        </div>

        {/* Nature of Business */}
        <div className='flex flex-col'>
          <label className="relative text-sm text-gray-700 mb-1">
            Nature of Business
            <span className="text-[#F2B807] absolute top-[-4px] right-[4px] md:right-[180px]">*</span>
          </label>
          <input
            type="text"
            name="natureOfBusiness"
            value={formData.natureOfBusiness}
            onChange={handleInputChange}
            className={`mt-1 md:w-2/3 w-[140px]  px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-yellow-500 ${errors.natureOfBusiness ? 'border-red-500' : ''}`}
            placeholder="Enter nature of business"
          />
          {errors.natureOfBusiness && <p className="text-red-500 text-xs">{errors.natureOfBusiness}</p>}
        </div>

        {/* Date of Registration */}
        <div className='flex flex-col'>
          <label className="relative text-sm text-gray-700 mb-1">
            Date of Registration
            <span className="text-[#F2B807] absolute top-[-4px] right-[-5px] md:right-[180px]">*</span>
          </label>
          <input
            type="date"
            name="dateOfRegistration"
            value={formData.dateOfRegistration}
            onChange={handleInputChange}
            className={`mt-1 md:w-2/3 w-[140px] px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-yellow-500 ${errors.dateOfRegistration ? 'border-red-500' : ''}`}
          />
          {errors.dateOfRegistration && <p className="text-red-500 text-xs">{errors.dateOfRegistration}</p>}
        </div>

        {/* Postal Address */}
        <div className='flex flex-col'>
          <label className="relative text-sm text-gray-700 mb-1">
            Postal Address
            <span className="text-[#F2B807] absolute top-[-4px] right-[20px] md:right-[210px]">*</span>
          </label>
          <input
            type="text"
            name="postalAddress"
            value={formData.postalAddress}
            onChange={handleInputChange}
            className={`mt-1 md:w-2/3 w-[140px] px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-yellow-500 ${errors.postalAddress ? 'border-red-500' : ''}`}
            placeholder="Enter postal address"
          />
          {errors.postalAddress && <p className="text-red-500 text-xs">{errors.postalAddress}</p>}
        </div>

        {/* Postal Code */}
        <div className='flex flex-col'>
          <label className="relative text-sm text-gray-700 mb-1">
            Postal Code
            <span className="text-[#F2B807] absolute top-[-4px] right-[40px] md:right-[230px]">*</span>
          </label>
          <input
            type="text"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleInputChange}
            className={`mt-1 md:w-2/3 w-[140px] px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-yellow-500 ${errors.postalCode ? 'border-red-500' : ''}`}
            placeholder="Enter postal code"
          />
          {errors.postalCode && <p className="text-red-500 text-xs">{errors.postalCode}</p>}
        </div>

        {/* City/Town */}
        <div className='flex flex-col'>
          <label className="relative text-sm text-gray-700 mb-1">
            City/Town
            <span className="text-[#F2B807] absolute top-[-4px] right-[50px] md:right-[250px]">*</span>
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            className={`mt-1 md:w-2/3 w-[140px] px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-yellow-500 ${errors.city ? 'border-red-500' : ''}`}
            placeholder="Enter city or town"
          />
          {errors.city && <p className="text-red-500 text-xs">{errors.city}</p>}
        </div>

        {/* Email */}
        <div className='flex flex-col'>
          <label className="relative text-sm text-gray-700 mb-1">
            Email
            <span className="text-[#F2B807] absolute top-[-4px] right-[80px] md:right-[280px]">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`mt-1 md:w-2/3 w-[140px] px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-yellow-500 ${errors.email ? 'border-red-500' : ''}`}
            placeholder="Enter email address"
          />
          {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
        </div>

        {/* Telephone */}
        <div className='flex flex-col'>
          <label className="relative text-sm text-gray-700 mb-1">
            Telephone
            <span className="text-[#F2B807] absolute top-[-4px] right-[50px] md:right-[250px]">*</span>
          </label>
          <input
            type="tel"
            name="telephone"
            value={formData.telephone}
            onChange={handleInputChange}
            className={`mt-1 md:w-2/3 w-[140px]  px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-yellow-500 ${errors.telephone ? 'border-red-500' : ''}`}
            placeholder="Enter telephone number"
          />
          {errors.telephone && <p className="text-red-500 text-xs">{errors.telephone}</p>}
        </div>
      </form>

      {/* Buttons */}
      <div className="flex justify-between md:ml-12  md:mr-32 mt-8">
        <button
          type="button"
          onClick={handleBack}
          className="bg-gray-100 text-xs font-bold py-2 px-4 rounded flex justify-center text-[#3AB54B]"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleSave}
          className="text-xs bg-[#F2B807] rounded font-bold py-2 px-4 flex justify-center text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BusinessDetails;
