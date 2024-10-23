import React, { useState } from 'react';
import NavigationButtons from './NavigationButtons'; // Import NavigationButtons

const NextOfKin = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRelationship, setSelectedRelationship] = useState('');
  const [currentTab, setCurrentTab] = useState(1); // Track the current tab
  const totalTabs = 4; // Define total number of tabs

  const relationships = ['Father', 'Mother', 'Sister', 'Brother'];

  const handleSelect = (relationship) => {
    setSelectedRelationship(relationship);
    setIsOpen(false);
  };

  const handlePrevious = () => {
    if (currentTab > 1) {
      setCurrentTab(currentTab - 1);
    }
  };

  const handleNext = () => {
    if (currentTab < totalTabs) { // Adjust according to your total tabs
      setCurrentTab(currentTab + 1);
    }
  };

  return (
    <div className="ml-[132px] p-6 text-xs font-semibold rounded-lg">
      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        {/* Name Section */}
        <div className="flex flex-col mb-4">
          <label htmlFor="name" className="relative text-gray-700 mb-1">
            Next of Kin Name.
            <span className="text-[#F2B807] absolute top-[-4px] right-[690px]">*</span>
          </label>
          <div className="flex space-x-16">
            {['firstName', 'middleName', 'lastName'].map((field, index) => (
              <input
                key={index}
                type="text"
                id={field}
                name={field}
                placeholder={`${field.charAt(0).toUpperCase() + field.slice(1).replace(/Name/, ' Name')}`}
                className="p-3 w-[195px] border border-gray-500 rounded-lg focus:border-[#F2B807] focus:ring-2 focus:ring-[#F2B807] outline-none flex-shrink-0"
                required
              />
            ))}
          </div>
        </div>

        {/* Relationship, Phone Number, National ID / Passport */}
        <div className="flex space-x-16 mb-4">
          <div className="flex flex-col relative">
            <label htmlFor="relationship" className="relative text-gray-700 mb-1">
              Relationship.
              <span className="text-[#F2B807] absolute top-[-4px] right-[108px]">*</span>
            </label>
            <div className="p-3 md:w-[195px] bg-gray-200 border border-gray-500 rounded-lg cursor-pointer flex items-center justify-between" onClick={() => setIsOpen(!isOpen)}>
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
              <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
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
            <label htmlFor="phone" className="relative text-gray-700 mb-1">
              Phone Number.
              <span className="text-[#F2B807] absolute top-[-4px] right-[95px]">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Enter a valid phone number"
              className="p-3 w-[195px] border border-gray-500 rounded-lg focus:border-[#F2B807] focus:ring-2 focus:ring-[#F2B807] outline-none"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="nationalId" className="relative text-gray-700 mb-1">
              National ID / Passport No.
              <span className="text-[#F2B807] absolute top-[-4px] right-[36px]">*</span>
            </label>
            <input
              type="text"
              id="nationalId"
              name="nationalId"
              placeholder="Enter National ID / Passport No."
              className="p-3 w-[195px] border border-gray-500 rounded-lg focus:border-[#F2B807] focus:ring-2 focus:ring-[#F2B807] outline-none"
              required
            />
          </div>
        </div>

        {/* Date of Birth */}
        <div className="flex flex-col mb-4">
          <label htmlFor="dob" className="relative text-gray-700 mb-1">
            Date of Birth.
            <span className="text-[#F2B807] absolute top-[-4px] right-[720px]">*</span>
          </label>
          <input
            type="date"
            id="dob"
            name="dob"
            className="p-3 w-[195px] border border-gray-500 rounded-lg focus:border-[#F2B807] focus:ring-2 focus:ring-[#F2B807] outline-none"
            required
          />
        </div>
      </form>

      {/* Navigation Buttons */}
      <NavigationButtons currentTab={currentTab} onPrevious={handlePrevious} onNext={handleNext} />
    </div>
  );
};

export default NextOfKin;
