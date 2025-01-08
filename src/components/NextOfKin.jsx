import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveNextOfKin } from '../formSlice'; // Import action to save form data

const NextOfKin = ({ onNext, onPrevious }) => {
  const dispatch = useDispatch();

  const nextOfKinData = useSelector((state) => state.form.nextOfKin);

  const [form, setForm] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    relationship: '',
    phone: '',
    nationalId: '',
    dob: '',
  });

  // Load data from store when component mounts or when nextOfKinData changes
  useEffect(() => {
    if (nextOfKinData) {
      setForm(nextOfKinData);
    }
  }, [nextOfKinData]);

  const handleInputChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleNext = () => {
    const isFormValid = Object.values(form).every((value) => value.trim() !== '');
    if (!isFormValid) {
      alert('Please fill in all required fields before proceeding.');
      return;
    }
    dispatch(saveNextOfKin(form));
    onNext();
  };

  const handlePrevious = () => {
    dispatch(saveNextOfKin(form));
    onPrevious();
  };

  const getYesterdayDate = () => {
    const today = new Date();
    today.setDate(today.getDate() - 1);
    return today.toISOString().split('T')[0];
  };

  return (
    <div className="md:px-32 md:py-8 text-sm font-poppins bg-gray-50 rounded-lg">
      <form className="space-y-6">
        {/* Name Section */}
        <div className="flex flex-col mb-6">
          <label className="text-gray-600 mb-2 font-semibold">
            Next of Kin Name <span className="text-[#F2B807]">*</span>
          </label>
          <div className="flex md:space-x-16 space-x-2">
            {['firstName', 'middleName', 'lastName'].map((field) => (
              <input
                key={field}
                type="text"
                name={field}
                placeholder={`${field.charAt(0).toUpperCase() + field.slice(1)} Name`}
                value={form[field]}
                onChange={handleInputChange}
                className="md:p-3 lg:p-3 w-[110px] p-2 md:w-[195px] lg:w-[200px] border border-gray-500 md:rounded-lg lg:rounded-lg rounded-md focus:border-[#F2B807] focus:ring-2 focus:ring-[#F2B807] outline-none"
                required
              />
            ))}
          </div>
        </div>

      

        {/* Phone Number, National ID / Passport */}
        <div className="flex md:space-x-16 space-x-2 mb-6">

            {/* Relationship */}
        <div className="flex flex-col ">
          <label className="text-gray-600 mb-2 font-semibold">
            Relationship <span className="text-[#F2B807]">*</span>
          </label>
          <input
            type="text"
            name="relationship"
            placeholder="Enter relationship (e.g., Father, Sister)"
            value={form.relationship}
            onChange={handleInputChange}
            className="md:p-3 lg:p-3 w-[110px] p-2 md:w-[195px] lg:w-[200px] border border-gray-500 md:rounded-lg lg:rounded-lg rounded-md focus:border-[#F2B807] focus:ring-2 focus:ring-[#F2B807] outline-none"
            required
          />
        </div>
          <div className="flex flex-col">
            <label className="text-gray-600 mb-2 font-semibold">
              Phone No. <span className="text-[#F2B807]">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="Enter phone number"
              value={form.phone}
              onChange={handleInputChange}
              className="md:p-3 lg:p-3 w-[110px] p-2 md:w-[195px] lg:w-[200px] border border-gray-500 md:rounded-lg lg:rounded-lg rounded-md focus:border-[#F2B807] focus:ring-2 focus:ring-[#F2B807] outline-none"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600 mb-2 text-[12px] md:text-sm font-semibold">
              ID/Passport No. <span className="text-[#F2B807]">*</span>
            </label>
            <input
              type="text"
              name="nationalId"
              placeholder="Enter National ID / Passport No."
              value={form.nationalId}
              onChange={handleInputChange}
              className="md:p-3 lg:p-3 w-[110px] p-2 md:w-[195px] lg:w-[200px] border border-gray-500 md:rounded-lg lg:rounded-lg rounded-md focus:border-[#F2B807] focus:ring-2 focus:ring-[#F2B807] outline-none"
              required
            />
          </div>
        </div>

        {/* Date of Birth */}
        <div className="flex flex-col mb-12">
          <label className="text-gray-600 mb-2 font-semibold">
            Date of Birth <span className="text-[#F2B807]">*</span>
          </label>
          <input
            type="date"
            name="dob"
            value={form.dob}
            onChange={handleInputChange}
            className="md:p-3 lg:p-3 w-[110px] p-2 md:w-[195px] lg:w-[200px] border border-gray-500 md:rounded-lg lg:rounded-lg rounded-md focus:border-[#F2B807] focus:ring-2 focus:ring-[#F2B807] outline-none"
            required
            max={getYesterdayDate()}
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={handlePrevious}
            className="bg-gray-300 p-2 rounded-lg"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="bg-[#F2B807] text-white font-semibold p-2 px-4 rounded-lg"
          >
            Save & Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default NextOfKin;
