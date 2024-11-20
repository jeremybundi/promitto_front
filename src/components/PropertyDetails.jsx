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
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg">
      <form className="grid grid-cols-1 mx-4 md:grid-cols-2 gap-9">
        {/* Location of Property */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">Location of Property</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className={`mt-1 w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-yellow-500 ${errors.location ? 'border-red-500' : ''}`}
            placeholder="Enter location of property"
          />
          {errors.location && <p className="text-red-500 text-xs">{errors.location}</p>}
        </div>

        {/* Title Number */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">Title Number</label>
          <input
            type="text"
            name="titleNumber"
            value={formData.titleNumber}
            onChange={handleInputChange}
            className={`mt-1 w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-yellow-500 ${errors.titleNumber ? 'border-red-500' : ''}`}
            placeholder="Enter title number"
          />
          {errors.titleNumber && <p className="text-red-500 text-xs">{errors.titleNumber}</p>}
        </div>

        {/* Land Reference No */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">Land Reference No.</label>
          <input
            type="text"
            name="landReferenceNo"
            value={formData.landReferenceNo}
            onChange={handleInputChange}
            className={`mt-1 w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-yellow-500 ${errors.landReferenceNo ? 'border-red-500' : ''}`}
            placeholder="Enter land reference number"
          />
          {errors.landReferenceNo && <p className="text-red-500 text-xs">{errors.landReferenceNo}</p>}
        </div>

        {/* Size of Project */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">Size of Project</label>
          <input
            type="text"
            name="sizeOfProject"
            value={formData.sizeOfProject}
            onChange={handleInputChange}
            className={`mt-1 w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-yellow-500 ${errors.sizeOfProject ? 'border-red-500' : ''}`}
            placeholder="Enter size of project"
          />
          {errors.sizeOfProject && <p className="text-red-500 text-xs">{errors.sizeOfProject}</p>}
        </div>

        {/* Type of Project */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">Type of Project</label>
          <select
            name="typeOfProject"
            value={formData.typeOfProject}
            onChange={handleInputChange}
            className={`mt-1 w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-yellow-500 ${errors.typeOfProject ? 'border-red-500' : ''}`}
          >
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
          </select>
          {errors.typeOfProject && <p className="text-red-500 text-xs">{errors.typeOfProject}</p>}
        </div>

        {/* County */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">County</label>
          <input
            type="text"
            name="county"
            value={formData.county}
            onChange={handleInputChange}
            className={`mt-1 w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-yellow-500 ${errors.county ? 'border-red-500' : ''}`}
            placeholder="Enter county"
          />
          {errors.county && <p className="text-red-500 text-xs">{errors.county}</p>}
        </div>

        {/* Ward */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">Ward</label>
          <input
            type="text"
            name="ward"
            value={formData.ward}
            onChange={handleInputChange}
            className={`mt-1 w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-yellow-500 ${errors.ward ? 'border-red-500' : ''}`}
            placeholder="Enter ward"
          />
          {errors.ward && <p className="text-red-500 text-xs">{errors.ward}</p>}
        </div>
      </form>

      {/* Buttons */}
      <div className="flex mx-56 space-x-[350px]">
        <button
          type="button"
          onClick={handleBack}
          className="bg-gray-100 text-xs mt-8 font-bold py-2 px-4 rounded flex justify-center text-[#3AB54B]"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleSave}
          className="text-xs bg-[#F2B807] mt-8 rounded font-bold py-2 px-4 flex justify-center text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PropertyDetails;
