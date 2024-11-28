import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveNextOfKin } from '../formSlice'; // Import action to save form data

const NextOfKin = ({ onNext, onPrevious }) => {
  const dispatch = useDispatch();

  // Get data from the store
  const nextOfKinData = useSelector((state) => state.form.nextOfKin);
  const personalDetailsData = useSelector((state) => state.form.personalDetails); // Get personal details data

  const [form, setForm] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    relationship: '',
    phone: '',
    nationalId: '',
    dob: '',
  });

  const [isOpen, setIsOpen] = useState(false);
  const [selectedRelationship, setSelectedRelationship] = useState('');

  const relationships = ['Father', 'Mother', 'Sister', 'Brother'];

  // Load data from store when component mounts or when nextOfKinData changes
  useEffect(() => {
    if (nextOfKinData) {
      setForm(nextOfKinData);
      setSelectedRelationship(nextOfKinData.relationship || '');
    }
  }, [nextOfKinData]);

  // Handle input changes
  const handleInputChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelect = (relationship) => {
    setSelectedRelationship(relationship);
    setForm({ ...form, relationship });
    setIsOpen(false);
  };

  const handleNext = () => {
    // Save data to store
    dispatch(saveNextOfKin(form));
    onNext(); // Proceed to the next step
  };

  const handlePrevious = () => {
    // Save data before going back (optional)
    dispatch(saveNextOfKin(form));
    onPrevious(); // Call the onPrevious function passed from Register
  };
   // Helper function to get yesterday's date in YYYY-MM-DD format
   const getYesterdayDate = () => {
    const today = new Date();
    today.setDate(today.getDate() - 1); // Subtract 1 day
    return today.toISOString().split('T')[0]; // Get date in YYYY-MM-DD format
  };

  return (
    <div className="p-6 text-sm font-poppins bg-gray-50 rounded-lg">
      <form className="space-y-6">
        {/* Name Section */}
        <div className='hidden md:flex-col md:ml-32 md:flex'>
        <div className="flex flex-col mb-6">
          <label htmlFor="name" className="relative text-gray-600 mb-2 font-semibold">
            Next of Kin Name.
            <span className="text-[#F2B807] mml-2">*</span>
          </label>
          <div className="flex space-x-16">
            {['firstName', 'middleName', 'lastName'].map((field, index) => (
              <input
                key={index}
                type="text"
                id={field}
                name={field}
                placeholder={`${field.charAt(0).toUpperCase() + field.slice(1).replace(/Name/, ' Name')}`}
                value={form[field]} // Load data from state
                onChange={handleInputChange}
                className="p-3 w-[195px] border border-gray-500 rounded-lg font-poppins focus:border-[#F2B807] focus:ring-2 focus:ring-[#F2B807] outline-none flex-shrink-0"
                required
              />
            ))}
          </div>
        </div>

        {/* Relationship, Phone Number, National ID / Passport */}
        <div className="flex space-x-16 mb-6">
          <div className="flex flex-col relative">
            <label htmlFor="relationship" className="relative  text-gray-600 mb-2 font-semibold">
              Relationship.
              <span className="text-[#F2B807] mml-2">*</span>
              </label>
            <div
              className="p-3 md:w-[195px] bg-gray-200 border border-gray-500 font-poppins rounded-lg cursor-pointer flex items-center justify-between"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span>{selectedRelationship || 'Select Relationship'}</span>
              <svg
                className="ml-2"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 4.5L6 7.5L9 4.5"
                  stroke="#6B7280"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            {isOpen && (
              <ul className="absolute z-10 mt-1 w-full bg-white border font-poppins border-gray-300 rounded-lg shadow-lg">
                {relationships.map((relationship, index) => (
                  <li
                    key={index}
                    onClick={() => handleSelect(relationship)}
                    className="p-2 hover:bg-[#F2B807] cursor-pointer"
                  >
                    {relationship}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="phone" className="relative  text-gray-600 mb-2 font-semibold">
              Phone Number.
              <span className="text-[#F2B807] mml-2">*</span>
              </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Enter a valid phone number"
              value={form.phone}
              onChange={handleInputChange}
              className="p-3 w-[195px] border border-gray-500 rounded-lg font-poppins focus:border-[#F2B807] focus:ring-2 focus:ring-[#F2B807] outline-none"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="nationalId" className="relative  text-gray-600 mb-2 font-semibold">
              National ID / Passport No.
              <span className="text-[#F2B807] mml-2">*</span>
              </label>
            <input
              type="text"
              id="nationalId"
              name="nationalId"
              placeholder="Enter National ID / Passport No."
              value={form.nationalId}
              onChange={handleInputChange}
              className="p-3 w-[195px] border border-gray-500 rounded-lg font-poppins focus:border-[#F2B807] focus:ring-2 focus:ring-[#F2B807] outline-none"
              required
            />
          </div>
        </div>

        {/* Date of Birth */}
        <div className="flex flex-col mb-12">
          <label htmlFor="dob" className="relative  text-gray-600 mb-2 font-semibold">
            Date of Birth.
            <span className="text-[#F2B807] mml-2">*</span>
          </label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={form.dob}
            onChange={handleInputChange}
            className="p-3 w-[195px] border border-gray-500 rounded-lg font-poppins focus:border-[#F2B807] focus:ring-2 focus:ring-[#F2B807] outline-none"
            required
            max={getYesterdayDate()}
          />
        </div>

        {/* Buttons for large screens */}
        <div className="hidden md:flex justify-between">
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
            className="bg-[#F2B807] text-white font-semibold p-2  px-4 rounded-lg"
          >
           Save & Continue
          </button>
        </div>
        </div>
        
        {/* Small screen layout */}
        <div className="md:hidden space-y-6">
          {/* Name Section */}
          <div className="flex flex-col  mb-4">
            <label htmlFor="name" className="relative text-gray-600 font-semibold  text-sm font-lufga mb-2">
              Next of Kin Name.
              <span className="text-[#F2B807] mml-2">*</span>
              </label>
            <div className="flex flex-col space-y-4">
              {['firstName', 'middleName', 'lastName'].map((field, index) => (
                <input
                  key={index}
                  type="text"
                  id={field}
                  name={field}
                  placeholder={`${field.charAt(0).toUpperCase() + field.slice(1).replace(/Name/, ' Name')}`}
                  value={form[field]} // Load data from state
                  onChange={handleInputChange}
                  className="p-3 border border-gray-500 my-2 rounded-lg focus:border-[#F2B807] focus:ring-2 focus:ring-[#F2B807] outline-none"
                  required
                />
              ))}
            </div>
          </div>

          {/* Relationship, Phone Number, National ID / Passport */}
          <div className="flex flex-col space-y-4 mb-4">
            <div className="flex flex-col relative">
              <label htmlFor="relationship" className="relative text-sm font-semibold  text-gray-600 mb-2">
                Relationship.
                <span className="text-[#F2B807] mml-2">*</span>
                </label>
              <div
                className="p-3 bg-gray-200 border border-gray-500 rounded-lg cursor-pointer flex items-center justify-between"
                onClick={() => setIsOpen(!isOpen)}
              >
                <span>{selectedRelationship || 'Select Relationship'}</span>
                <svg
                  className="ml-2"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 4.5L6 7.5L9 4.5"
                    stroke="#6B7280"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              {isOpen && (
                <ul className="relative z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                  {relationships.map((relationship, index) => (
                    <li
                      key={index}
                      onClick={() => handleSelect(relationship)}
                      className="p-2 hover:bg-[#F2B807] text-sm cursor-pointer"
                    >
                      {relationship}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="phone" className="relative font-lufga text-sm font-semibold  text-gray-600 mb-2">
                Phone Number.
                <span className="text-[#F2B807] mml-2">*</span>
                </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Enter a valid phone number"
                value={form.phone}
                onChange={handleInputChange}
                className="p-3 border border-gray-500 rounded-lg text-sm focus:border-[#F2B807] focus:ring-2 focus:ring-[#F2B807] outline-none"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="nationalId" className="relative text-gray-600 font-semibold  mb-2 text-sm">
                National ID / Passport No.
                <span className="text-[#F2B807] mml-2">*</span>
                </label>
              <input
                type="text"
                id="nationalId"
                name="nationalId"
                placeholder="Enter National ID / Passport No."
                value={form.nationalId}
                onChange={handleInputChange}
                className="p-3 text-sm border border-gray-500 rounded-lg focus:border-[#F2B807] focus:ring-2 focus:ring-[#F2B807] outline-none"
                required
              />
            </div>
          </div>

    {/* Date of Birth */}
<div className="flex flex-col mb-8">
  <label htmlFor="dob" className="relative text-gray-600 text-sm mb-2 font-semibold font-lufga">
    Date of Birth.
    <span className="text-[#F2B807] mml-2">*</span>
  </label>
  <input
    type="date"
    id="dob"
    name="dob"
    value={form.dob}
    onChange={handleInputChange}
    className="p-3 text-sm border border-gray-500 rounded-lg focus:border-[#F2B807] focus:ring-2 focus:ring-[#F2B807] outline-none"
    required
    max={getYesterdayDate()} 

  />
</div>



          {/* Navigation */}
          <div className="flex mt-5 justify-between">
            <button
              type="button"
              onClick={handlePrevious}
              className="bg-gray-300 px-3 py-2 text-sm rounded-lg"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="bg-[#F2B807] py-2 px-5 text-sm rounded-lg"
            >
              Save & Continue
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NextOfKin;
