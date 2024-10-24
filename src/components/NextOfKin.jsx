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
    //console.log(form)
    onPrevious(); // Call the onPrevious function passed from Register
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
                value={form[field]} // Load data from state
                onChange={handleInputChange}
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
            <div
              className="p-3 md:w-[195px] bg-gray-200 border border-gray-500 rounded-lg cursor-pointer flex items-center justify-between"
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
              value={form.phone}
              onChange={handleInputChange}
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
              value={form.nationalId}
              onChange={handleInputChange}
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
            value={form.dob}
            onChange={handleInputChange}
            className="p-3 w-[195px] border border-gray-500 rounded-lg focus:border-[#F2B807] focus:ring-2 focus:ring-[#F2B807] outline-none"
            required
          />
        </div>

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
            className="bg-[#F2B807] p-2 rounded-lg"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default NextOfKin;
