import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { savePropertyDetails } from '../formSlice'; // Assuming you have this action defined

const PropertyDetails = ({ onNext, onPrevious }) => {
  const dispatch = useDispatch();

  // Select property details from Redux store
  const propertyDetails = useSelector((state) => state.form.propertyDetails);

  const [formData, setFormData] = useState({
    location: '',
    titleNumber: '',
    landReferenceNo: '',
    sizeOfProject: '',
    typeOfProject: 'Residential', // Default type of project
    county: '',
    ward: '',
  });

  const [errors, setErrors] = useState({});

  // Populate formData with data from Redux store on mount
  useEffect(() => {
    if (propertyDetails) {
      setFormData(propertyDetails);
    }
  }, [propertyDetails]);

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

    dispatch(savePropertyDetails(formData));
    console.log('Saved Data:', formData);
    onNext();
  };

  const handleBack = () => {
    if (!validateForm()) {
      return; 
    }
    dispatch(savePropertyDetails(formData));
    console.log('Saved Data:', formData);
    onPrevious();
  };

  return (
    <div className="md:ml-28 md:p-6 bg-gray-50 rounded-lg">
      <form className="grid grid-cols-2 md:gap-6 gap-2 md:p-4">
        {/* Location of Property */}
        <div className='flex flex-col'>
          <label className="font-semibold text-sm font-poppins text-gray-600  mb-1">Location of Property
            <span className="text-[#F2B807] md:ml-2">*</span>
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className={`mt-1 md:w-[250px] w-[90%] px-4 py-2 border border-gray-500 rounded-lg text-gray-600 text-sm focus:outline-none focus:ring focus:ring-yellow-500 ${errors.location ? 'border-red-500' : ''}`}
            placeholder="Enter location of property"
          />
          {errors.location && <p className="text-red-500 text-xs">{errors.location}</p>}
        </div>

         {/* Land Reference No */}
         <div className='flex flex-col'>
         <label className="font-semibold text-sm font-poppins text-gray-600  mb-1">Land Reference No.
            <span className="text-[#F2B807] mml-2">*</span>
          </label>
          <input
            type="text"
            name="landReferenceNo"
            value={formData.landReferenceNo}
            onChange={handleInputChange}
            className={`mt-1 md:w-[250px] w-[90%] px-4 py-2 border border-gray-500 space-x-16 rounded-lg text-gray-600 text-sm focus:outline-none focus:ring focus:ring-yellow-500 ${errors.landReferenceNo ? 'border-red-500' : ''}`}
            placeholder="Enter land reference number"
          />
          {errors.landReferenceNo && <p className="text-red-500 text-xs">{errors.landReferenceNo}</p>}
        </div>

        {/* Title Number */}
        <div className='flex flex-col'>
        <label className="font-semibold text-sm font-poppins text-gray-600  mb-1">Title Number
            <span className="text-[#F2B807] ml-2">*</span>
          </label>
          <input
            type="text"
            name="titleNumber"
            value={formData.titleNumber}
            onChange={handleInputChange}
            className={`mt-1 md:w-[250px] w-[90%] px-4 py-2 border border-gray-500 rounded-lg text-gray-600 text-sm focus:outline-none focus:ring focus:ring-yellow-500 ${errors.titleNumber ? 'border-red-500' : ''}`}
            placeholder="Enter title number"
          />
          {errors.titleNumber && <p className="text-red-500 text-xs">{errors.titleNumber}</p>}
        </div>

       

        {/* Size of Project */}
        <div className='flex flex-col'>
        <label className="font-semibold text-sm font-poppins text-gray-600  mb-1">Size of Project
            <span className="text-[#F2B807] ml-2">*</span>
          </label>
          <input
            type="text"
            name="sizeOfProject"
            value={formData.sizeOfProject}
            onChange={handleInputChange}
            className={`mt-1 md:w-[250px] w-[90%] px-4 py-2 border rounded-lg text-gray-600 text-sm border-gray-500 focus:outline-none focus:ring focus:ring-yellow-500 ${errors.sizeOfProject ? 'border-red-500' : ''}`}
            placeholder="Enter size of project"
          />
          {errors.sizeOfProject && <p className="text-red-500 text-xs">{errors.sizeOfProject}</p>}
        </div>

        {/* Type of Project */}
        <div className='flex flex-col'>
          <label className="font-semibold text-sm font-poppins text-gray-600  mb-1">Type of Project
            <span className="text-[#F2B807] ml-2">*</span>
          </label>
          <select
            name="typeOfProject"
            value={formData.typeOfProject}
            onChange={handleInputChange}
            className={`mt-1 md:w-[250px] w-[90%] px-4 py-2 border rounded-lg text-sm border-gray-500 text-gray-600 focus:outline-none focus:ring focus:ring-yellow-500 ${errors.typeOfProject ? 'border-red-500' : ''}`}
          >
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
          </select>
          {errors.typeOfProject && <p className="text-red-500 text-xs">{errors.typeOfProject}</p>}
        </div>

        {/* County */}
        <div className='flex flex-col'>
          <label className="font-semibold text-sm font-poppins text-gray-600  mb-1">County
            <span className="text-[#F2B807] ml-2">*</span>
          </label>
          <input
            type="text"
            name="county"
            value={formData.county}
            onChange={handleInputChange}
            className={`mt-1 md:w-[250px] w-[90%] px-4 py-2 border text-sm border-gray-500 rounded-lg text-gray-600 focus:outline-none focus:ring focus:ring-yellow-500 ${errors.county ? 'border-red-500' : ''}`}
            placeholder="Enter county"
          />
          {errors.county && <p className="text-red-500 text-xs">{errors.county}</p>}
        </div>

        {/* Ward */}
        <div className='flex flex-col'>
        <label className="font-semibold text-sm font-poppins text-gray-600  mb-1">Ward
            <span className="text-[#F2B807] ml-2">*</span>
          </label>
          <input
            type="text"
            name="ward"
            value={formData.ward}
            onChange={handleInputChange}
            className={`mt-1 md:w-[250px] w-[90%] px-4 py-2 border text-sm border-gray-500 rounded-lg text-gray-600 focus:outline-none focus:ring focus:ring-yellow-500 ${errors.ward ? 'border-red-500' : ''}`}
            placeholder="Enter ward"
          />
          {errors.ward && <p className="text-red-500 text-xs">{errors.ward}</p>}
        </div>
      </form>

      {/* Buttons */}
      <div className="flex justify-between mx-auto md:mt-8 mt-3  space-y-0 space-x-4">
        <button
          type="button"
          onClick={handleBack}
          className="bg-gray-300  font-medium py-2 md:px-6 px-2 text-sm rounded "
        >
          Previous
        </button>
        <button
          type="button"
          onClick={handleSave}
          className="text-sm bg-[#F2B807] rounded font-medium py-2 md:px-6 px-2 text-white"
        >
          Save & Continue
        </button>
      </div>
    </div>
  );
};

export default PropertyDetails;
