import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveEmploymentDetails } from '../formSlice';

const EmploymentDetails = ({ onNext, onPrevious }) => {
  const dispatch = useDispatch();

  const employmentData = useSelector((state) => state.form.employmentDetails);

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

  const [errors, setErrors] = useState({});

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const handleNext = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key] && key !== 'contractPeriod') {
        newErrors[key] = `${key.replace(/([A-Z])/g, ' $1').trim()} is required`;
      }
    });

    if (formData.termsOfEmployment === 'Contract' && !formData.contractPeriod) {
      newErrors.contractPeriod = 'Contract period is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    dispatch(saveEmploymentDetails(formData));
    onNext();
  };

  const handlePrevious = () => {
    dispatch(saveEmploymentDetails(formData));
    onPrevious();
  };

  return (
    <div className="employment-details-form md:p-6 bg-gray-50  rounded-lg">
      <form className="grid grid-cols-2 md:gap-6 md:mx-36">
        {Object.keys(formData).map((key) => (
          key !== 'termsOfEmployment' && (
            <div key={key} className="flex flex-col">
              <label
                htmlFor={key}
                className="font-semibold text-sm mt-4 md:mt-3 font-poppins text-gray-600 "
              >
                {key === 'contractPeriod'
                  ? 'Contract Period'
                  : key
                      .replace(/([A-Z])/g, ' $1')
                      .trim()
                      .replace(/\b\w/g, (c) => c.toUpperCase())}
                {key !== 'contractPeriod' && <span className="text-[#F2B807] ml-2">*</span>}
              </label>
              <input
                type="text"
                id={key}
                name={key}
                value={formData[key]}
                placeholder={`Enter ${key
                  .replace(/([A-Z])/g, ' $1')
                  .trim()
                  .toLowerCase()}`}
                onChange={handleChange}
                className="font-poppins input-field w-[90%] md:w-[300px] border mt-2 text-sm font-poppins focus:border-[#F2B807] focus:ring-2 focus:ring-[#F2B807] outline-none border-gray-500 rounded-md p-3"
              />
              {errors[key] && (
                <p className="text-red-500 text-xs mt-1">{errors[key]}</p>
              )}
            </div>
          )
        ))}

        <div className="flex md:mt-3 mt-1 md:mb-0 mb-2 flex-col">
          <label
            htmlFor="termsOfEmployment"
            className="font-semibold md:text-sm text-xs text-gray-600 md:mb-"
          >
            Terms Of Employment
            <span className="text-[#F2B807] ml-2">*</span>
          </label>
          <select
            id="termsOfEmployment"
            name="termsOfEmployment"
            value={formData.termsOfEmployment}
            onChange={handleChange}
            className="text-sm font-poppins input-field w-[90%] md:w-[300px] mt-2 border  focus:border-[#F2B807] focus:ring-2 focus:ring-[#F2B807] outline-none border-gray-500 rounded-md p-3"
          >
            <option value="">Select</option>
            <option value="Permanent">Permanent</option>
            <option value="Probation">Probation</option>
            <option value="Contract">Contract</option>
          </select>
          {errors.termsOfEmployment && (
            <p className="text-red-500 text-xs mt-1">
              {errors.termsOfEmployment}
            </p>
          )}
        </div>

        {formData.termsOfEmployment === 'Contract' && (
          <div className="flex flex-col col-span-1 md:col-span-2">
            <label
              htmlFor="contractPeriod"
              className="font-semibold text-xs text-gray-700 mb-1"
            >
              Contract Period
              <span className="text-[#F2B807] ml-2">*</span>
              </label>
            <input
              type="text"
              id="contractPeriod"
              name="contractPeriod"
              placeholder="Enter number of months"
              value={formData.contractPeriod}
              onChange={handleChange}
              className="text-xs mt-1 input-field w-[90%] md:w-[200px] border border-gray-300 rounded-md p-3"
            />
            <span className="ml-2 text-emerald-700">Months</span>
            {errors.contractPeriod && (
              <p className="text-red-500 text-xs mt-1">
                {errors.contractPeriod}
              </p>
            )}
          </div>
        )}
      </form>

      <div className="flex justify-between md:mx-48 md:space-x-[350px]">
        <button
          className="bg-gray-300 text-sm mt-8 font-medium py-2 px-4 rounded "
          onClick={handlePrevious}
        >
          Previous
        </button>
        <button
          className="bg-[#F2B807] text-sm mt-8 font-medium py-2 px-4 rounded text-white"
          onClick={handleNext}
        >
          Save & Continue
        </button>
      </div>
    </div>
  );
};

export default EmploymentDetails;
