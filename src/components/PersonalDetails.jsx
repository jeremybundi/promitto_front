import React, { useState } from 'react';


const PersonalDetails = () => {
    const [selectedGender, setSelectedGender] = useState('');
    const [isOpen, setIsOpen] = useState(false);
  
    const options = ['Male', 'Female', 'Other'];
  
    const handleSelect = (option) => {
      setSelectedGender(option);
      setIsOpen(false);
    };

  return (
    <div className="ml-[132px] p-6 text-xs font-semibold rounded-lg">
      <form className="space-y-6 ">
      <div className="flex flex-col mb-4">
  <label htmlFor="name" className="relative text-gray-700 mb-1">
    Name.
    <span className="text-[#F2B807] absolute top-[-4px] right-[760px]">*</span>
  </label>
  <div className="flex space-x-16">
    <input
      type="text"
      id="firstName"
      name="firstName"
      placeholder="First Name"
      className="p-3 w-[195px] border border-gray-500 rounded-lg focus:border-[#F2B807] focus:ring-2 focus:ring-[#F2B807] outline-none flex-shrink-0"
      required
    />
    <input
      type="text"
      id="middleName"
      name="middleName"
      placeholder="Middle Name"
      className="p-3 w-[195px] border border-gray-500 rounded-lg focus:border-[#F2B807] focus:ring-2 focus:ring-[#F2B807] outline-none flex-shrink-0"
      required
    />
    <input
      type="text"
      id="lastName"
      name="lastName"
      placeholder="Last Name"
      className="p-3 w-[195px] border border-gray-500 rounded-lg focus:border-[#F2B807] focus:ring-2 focus:ring-[#F2B807] outline-none flex-shrink-0"
      required
    />
  </div>
</div>

        
        {/* Gender, Date of Birth, National ID / Passport Fields */}
        <div className="flex space-x-16 w-full items-center">
          {/* Gender field */}
          <div className="flex flex-col">
            <label htmlFor="gender" className="relative text-gray-700 mb-1">
              Gender.
              <span className="text-[#F2B807] absolute top-[-4px] right-[130px]">*</span>
            </label>
            <div className="relative">
              <div
                className="p-3 md:w-[190px] bg-gray-200 border border-gray-500 rounded-lg cursor-pointer flex items-center justify-between"
                onClick={() => setIsOpen(!isOpen)}
              >
                <span>{selectedGender || 'Select Gender'}</span>
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
                  {options.map((option, index) => (
                    <li
                      key={index}
                      onClick={() => handleSelect(option)}
                      className="p-2 hover:bg-[#F2B807] cursor-pointer"
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        {/* Date of Birth */}
        <div className="flex flex-col mb-4">
            <label htmlFor="dob" className="relative text-gray-700 mb-1">
            Date of Birth.
            <span className="text-[#F2B807] absolute top-[-4px] right-[100px]">*</span>
          </label>
          <input
            type="date"
            id="dob"
            name="dob"
            className="p-3 w-[195px] border border-gray-500 rounded-lg focus:border-[#F2B807] focus:ring-2 focus:ring-[#F2B807] outline-none"
            required
          />
        </div>

          {/* National ID / Passport number field */}
          <div className="flex flex-col">
            <label htmlFor="idNumber" className="relative text-gray-700 mb-1">
              National ID/Passport
              <span className="text-[#F2B807] absolute top-[-4px] right-[60px]">*</span>
            </label>
            <input
              type="text"
              id="idNumber"
              name="idNumber"
              placeholder="National ID or Passport Number"
              className="p-3 md:w-[195px] border border-gray-500 rounded-lg focus:border-[#F2B807] focus:ring-2 focus:ring-[#F2B807] outline-none"
              required
            />
          </div>
        </div>
          {/* KRA Pin No. and Upload Fields */}
        <div className="flex space-x-16 w-full ">
          {/* KRA Pin No. */}
          <div className="flex flex-col">
            <label htmlFor="kraPin" className="relative text-gray-700 mb-1">
              KRA Pin No.
              <span className="text-[#F2B807] absolute top-[-4px] right-[115px]">*</span>
            </label>
            <input
              type="text"
              id="kraPin"
              name="kraPin"
              placeholder="KRA Pin Number"
              className="p-3 md:w-[195px] border border-gray-500 rounded-lg focus:border-[#F2B807] focus:ring-2 focus:ring-[#F2B807] outline-none"
              required
            />
          </div>

          {/* National ID / Passport Upload */}
          <div className="flex flex-col">
            <label htmlFor="idUpload" className="relative text-xs text-gray-700 mb-1">
              National ID/Passport Upload
              <span className="text-[#F2B807] absolute top-[-4px] right-[15px]">*</span>
            </label>
            <div className="border-2 border-dashed md:w-[195px] border-gray-500 p-4 rounded-lg">
            <p className="text-[#F2B807] text-[10px] font-light text-center">Drag and Drop a File here
              or Click to Upload from your Computer</p>
              <p className='text-center text-[10px] text-light'>Maximum Upload size:
              20 MB</p>            </div>
          </div>

          {/* KRA Pin Certificate Upload */}
          <div className="flex flex-col">
            <label htmlFor="kraUpload" className="relative text-gray-700 mb-1">
              KRA Pin Certificate Upload
              <span className="text-[#F2B807] absolute top-[-4px] right-[17px]">*</span>
            </label>
            <div className="border-2 border-dashed md:w-[195px] border-gray-500 p-4 rounded-lg">
              <p className="text-[#F2B807] text-[10px] font-light text-center">Drag and Drop a File here
              or Click to Upload from your Computer</p>
              <p className='text-center text-[10px] text-light'>Maximum Upload size:
              20 MB</p>
            </div>
          </div>
        </div>
    {/*Adress section */}
        <div className="flex flex-col mb-4">
        <label htmlFor="address" className="relative text-gray-700 mb-1">
            Address
            <span className="text-[#F2B807] absolute top-[-4px] right-[750px]">*</span>
        </label>
        <div className="flex space-x-16 py-2">
            <input
            type="text"
            id="validAddress"
            name="validAddress"
            placeholder="Enter a valid address"
            className="p-3 w-[195px] border border-gray-500 rounded-lg focus:border-[#F2B807] focus:ring-2 focus:ring-[#F2B807] outline-none flex-shrink-0"
            required
            />
            <input
            type="text"
            id="postalCode"
            name="postalCode"
            placeholder="Postal Code"
            className="p-3 w-[195px] border border-gray-500 rounded-lg focus:border-[#F2B807] focus:ring-2 focus:ring-[#F2B807] outline-none flex-shrink-0"
            required
            />
            <input
            type="text"
            id="city"
            name="city"
            placeholder="City"
            className="p-3 w-[195px] border border-gray-500 rounded-lg focus:border-[#F2B807] focus:ring-2 focus:ring-[#F2B807] outline-none flex-shrink-0"
            required
            />
        </div>
        
        <div className="flex space-x-16 mt-4">
            <input
            type="text"
            id="county"
            name="county"
            placeholder="County"
            className="p-3 w-[195px] border border-gray-500 rounded-lg focus:border-[#F2B807] focus:ring-2 focus:ring-[#F2B807] outline-none flex-shrink-0"
            required
            />
            <input
            type="text"
            id="country"
            name="country"
            placeholder="Country"
            className="p-3 w-[195px] border border-gray-500 rounded-lg focus:border-[#F2B807] focus:ring-2 focus:ring-[#F2B807] outline-none flex-shrink-0"
            required
            />
        </div>
        </div>
        {/*contacts section*/}
        <div className="flex flex-col mb-4">
        <label htmlFor="contacts" className="relative text-gray-700 mb-1">
            Contacts.
            <span className="text-[#F2B807] absolute top-[-4px] right-[740px]">*</span>
        </label>
        <div className="flex space-x-16">
            <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="Enter a valid phone number"
            className="p-3 w-[195px] border border-gray-500 rounded-lg focus:border-[#F2B807] focus:ring-2 focus:ring-[#F2B807] outline-none"
            required
            />
            <input
            type="email"
            id="emailAddress"
            name="emailAddress"
            placeholder="Enter email address"
            className="p-3 w-[195px] border border-gray-500 rounded-lg focus:border-[#F2B807] focus:ring-2 focus:ring-[#F2B807] outline-none"
            required
            />
        </div>
        </div>
        <button type="submit" className="mt-4 bg-[#F2B807] py-2 px-4 text-xl rounded-xl flex items-center w-auto">
            Next
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 ml-2">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
        </button>




      </form>
    </div>
  );
};

export default PersonalDetails;
