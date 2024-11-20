import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveEmploymentDetails } from '../formSlice';

const EmploymentDetails = ({ onNext, onPrevious }) => {
  const dispatch = useDispatch();

  // Access employment details from Redux state
  const employmentData = useSelector((state) => state.form.employmentDetails);

  // Local state for form data, initialized from Redux state
  const [formData, setFormData] = useState({
    employerName: '',
    postalAddress: '',
    postalCode: '',
    location: '',
    email: '',
    telephone: '',
    jobTitle: '',
    lengthOfService: '',
    termsOfEmployment: '',
    contractPeriod: '',
  });

  // State for tracking errors
  const [errors, setErrors] = useState({});

  // Update formData when employmentData changes
  useEffect(() => {
    if (employmentData) {
      setFormData({
        employerName: employmentData.employerName || '',
        postalAddress: employmentData.postalAddress || '',
        postalCode: employmentData.postalCode || '',
        location: employmentData.location || '',
        email: employmentData.email || '',
        telephone: employmentData.telephone || '',
        jobTitle: employmentData.jobTitle || '',
        lengthOfService: employmentData.lengthOfService || '',
        termsOfEmployment: employmentData.termsOfEmployment || '',
        contractPeriod: employmentData.contractPeriod || '',
      });
    }
  }, [employmentData]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error message for the field being modified
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  // Handle validation and next button click
  const handleNext = () => {
    const newErrors = {};

    // Validate required fields
    Object.keys(formData).forEach((key) => {
      if (!formData[key] && key !== 'contractPeriod') {
        newErrors[key] = `${key} is required`;
      }
    });

    // Check if contractPeriod is required based on termsOfEmployment
    if (formData.termsOfEmployment === 'Contract' && !formData.contractPeriod) {
      newErrors.contractPeriod = 'Contract period is required';
    }

    // If there are errors, set the errors state and don't proceed
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // If validation passes, save data to Redux and move to the next step
    dispatch(saveEmploymentDetails(formData));
    console.log(formData);
    onNext();
  };

  // Handle validation and previous button click
  const handlePrevious = () => {
    const newErrors = {};

    // Validate required fields
    Object.keys(formData).forEach((key) => {
      if (!formData[key] && key !== 'contractPeriod') {
        newErrors[key] = `${key} is required`;
      }
    });

    // Check if contractPeriod is required based on termsOfEmployment
    if (formData.termsOfEmployment === 'Contract' && !formData.contractPeriod) {
      newErrors.contractPeriod = 'Contract period is required';
    }

    // If there are errors, set the errors state and don't proceed
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // If validation passes, save data to Redux and move to the previous step
    dispatch(saveEmploymentDetails(formData));
    console.log(formData);
    onPrevious();
  };

  return (
    <div className="employment-details-form p-6 bg-white shadow-lg rounded-lg">
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-36">
        {Object.keys(formData).map((key) => (
          key !== 'termsOfEmployment' && (
            <div key={key}>
              <label htmlFor={key} className="block text-sm font-medium text-gray-700">
                {key === 'contractPeriod' ? 'Contract Period' : key.replace(/([A-Z])/g, ' $1').trim()}
                <span className="text-[#F2B807] ml-2">*</span>
              </label>
              <input
                type="text"
                id={key}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className="mt-1 input-field w-full md:w-[300px] border border-gray-300 rounded-md p-2"
                required
              />
              {errors[key] && <p className="text-red-500 text-xs mt-1">{errors[key]}</p>}
            </div>
          )
        ))}

        {/* Terms of Employment Dropdown */}
        <div>
          <label htmlFor="termsOfEmployment" className="block text-sm font-medium text-gray-700">
            Terms of Employment
            <span className="text-[#F2B807] ml-2">*</span>
          </label>
          <select
            id="termsOfEmployment"
            name="termsOfEmployment"
            value={formData.termsOfEmployment}
            onChange={handleChange}
            className="mt-1 input-field w-full md:w-[300px] border border-gray-300 rounded-md p-2"
            required
          >
            <option value="">Select</option>
            <option value="Permanent">Permanent</option>
            <option value="Probation">Probation</option>
            <option value="Contract">Contract</option>
          </select>
          {errors.termsOfEmployment && <p className="text-red-500 text-xs mt-1">{errors.termsOfEmployment}</p>}
        </div>

        {/* Conditionally render Contract Period field */}
        {formData.termsOfEmployment === 'Contract' && (
          <div className="col-span-1 md:col-span-2">
            <label htmlFor="contractPeriod" className="block text-sm font-medium text-gray-700">
              Contract Period
              <span className="text-[#F2B807] ml-2">*</span>
            </label>
            <input
              type="text"
              id="contractPeriod"
              name="contractPeriod"
              placeholder='Enter number of months'
              value={formData.contractPeriod}
              onChange={handleChange}
              className="mt-1 input-field w-full md:w-[200px] border border-gray-300 rounded-md p-2"
              required
            />
            <span className='ml-2 text-emerald-700'>Months</span>
            {errors.contractPeriod && <p className="text-red-500 text-xs mt-1">{errors.contractPeriod}</p>}
          </div>
        )}
      </form>

      <div className='flex md:mx-56 md:space-x-[350px]'>
        <button 
          className="bg-gray-100 text-xs mt-8 font-bold py-2 px-4 rounded flex justify-center text-[#3AB54B]"
          onClick={handlePrevious}
        >
          Back
        </button>
        <button 
          className="text-xs bg-[#F2B807] mt-8 rounded font-bold py-2 px-4 flex justify-center text-white"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EmploymentDetails;
