import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveBusinessDetails } from '../formSlice';

const BusinessDetails = ({ onNext, onPrevious }) => {
  const dispatch = useDispatch();
  const storedBusinessDetails = useSelector((state) => state.form.businessDetails);

  const [formData, setFormData] = useState({
    businessName: '',
    natureOfBusiness: '',
    dateOfRegistration: '',
    postalAddress: '',
    postalCode: '',
    city: '',
    email: '',
    telephone: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (storedBusinessDetails) {
      setFormData(storedBusinessDetails);
    }
  }, [storedBusinessDetails]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Clear error for the field
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate each field in formData
    Object.keys(formData).forEach((key) => {
      if (!formData[key]?.trim()) {
        newErrors[key] = 'This field is required';
      }
    });

    setErrors(newErrors);

    // Return true only if no errors
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (isNext) => {
    const isValid = validateForm(); // Validate fields
    if (!isValid) {
      console.log('Form validation failed!'); // Debugging: Log validation status
      return; // Prevent navigation if form is invalid
    }

    // Save form data to Redux store
    dispatch(saveBusinessDetails(formData));
    console.log(saveBusinessDetails(formData));

    // Navigate to the next or previous step
    if (isNext) {
      onNext();
    } else {
      onPrevious();
    }
  };

  const getYesterdayDate = () => {
    const today = new Date();
    today.setDate(today.getDate() - 1);
    return today.toISOString().split('T')[0];
  };

  return (
    <div className="md:ml-28 md:p-6 bg-gray-50 rounded-lg">
      <form className="grid md:mx-4 grid-cols-2 gap-6">
        {[
          { name: 'businessName', label: 'Name of Business', type: 'text', placeholder: 'Enter business name' },
          { name: 'natureOfBusiness', label: 'Nature of Business', type: 'text', placeholder: 'Enter nature of business' },
          { name: 'dateOfRegistration', label: 'Date of Registration', type: 'date', max: getYesterdayDate() },
          { name: 'postalAddress', label: 'Postal Address', type: 'text', placeholder: 'Enter postal address' },
          { name: 'postalCode', label: 'Postal Code', type: 'text', placeholder: 'Enter postal code' },
          { name: 'city', label: 'City/Town', type: 'text', placeholder: 'Enter city or town' },
          { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter email address' },
          { name: 'telephone', label: 'Telephone', type: 'tel', placeholder: 'Enter telephone number' },
        ].map(({ name, label, type, placeholder, max }) => (
          <div className="flex flex-col" key={name}>
            <label className="font-semibold md:text-sm text-xs text-gray-600 mb-2">
              {label}
              <span className="text-[#F2B807] ml-2">*</span>
            </label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleInputChange}
              max={max || ''}
              placeholder={placeholder || ''}
              className={`mt-1 md:w-2/3 w-[140px] px-4 py-3 border ${
                errors[name] ? 'border-red-500' : 'border-gray-500'
              } rounded-lg text-sm text-gray-700 focus:outline-none focus:ring ${
                errors[name] ? 'focus:ring-red-500' : 'focus:ring-yellow-500'
              }`}
            />
            {errors[name] && (
              <span className="text-red-500 text-xs mt-1">{errors[name]}</span>
            )}
          </div>
        ))}
      </form>

      <div className="flex justify-between md:ml-12 md:mr-32 mt-8">
        <button
          type="button"
          onClick={() => handleSubmit(false)} // Handle Previous
          className="bg-gray-300 text-sm py-2 px-4 font-medium rounded flex justify-center"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={() => handleSubmit(true)} // Handle Next
          className="text-sm bg-[#F2B807] rounded font-medium py-2 px-4 flex justify-center text-white"
        >
          Save & Continue
        </button>
      </div>
    </div>
  );
};

export default BusinessDetails;
