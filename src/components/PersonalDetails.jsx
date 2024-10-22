import React from 'react';

const PersonalDetails = () => {
  return (
    <div className='ml-[132px]  p-6 rounded-lg'>
      {/* Add your form fields here */}
      <form className="space-y-4">
      <label htmlFor="firstName" className="text-gray-700 mb-1"> Name</label>

            <div className="flex space-x-16 ">
            <input 
              type="text" 
              id="firstName" 
              name="firstName"
              placeholder='first name' 
              className="p-2 w-[200px] border border-gray-300 rounded-lg" 
              required 
            />
          
            <input 
              type="text" 
              id="middleName" 
              name="middleName" 
              placeholder='middle name'
              className="p-2  w-[200px] border border-gray-300 rounded-lg" 
              required 
            />
            <input 
              type="text" 
              id="lastName" 
              name="lastName" 
              placeholder='last name'
              className="p-2 w-[200px]  border border-gray-300 rounded-lg" 
              required 
            />
        </div>
        {/* You can add more fields as needed */}
           {/* Gender, Date of Birth, National ID / Passport fields */}
           <div className="flex space-x-16 w-full items-center">
          
          {/* Gender field */}
          <div className="flex flex-col">
            <label htmlFor="gender" className="text-gray-700 mb-1">Gender </label>
            <select 
              id="gender" 
              name="gender" 
              className="p-2 border border-gray-300 rounded-lg w-[190px] focus:border-[#F2B807]" 
              required
            >
              <option value="" disabled selected>Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Date of Birth */}
          <div className="flex flex-col">
            <label htmlFor="dob" className="text-gray-700 mb-1">Date of Birth</label>
            <input 
              type="text" 
              id="dob" 
              name="dob"
              placeholder='DD/MM/YYYY' 
              className="p-2 border border-gray-300 rounded-lg w-[200px] focus:border-[#F2B807]" 
              required 
            />
          </div>

          {/* National ID / Passport number field */}
          <div className="flex flex-col">
            <label htmlFor="idNumber" className="text-gray-700 mb-1">National ID/Passport No.</label>
            <input 
              type="text" 
              id="idNumber" 
              name="idNumber"
              placeholder='National ID or Passport Number' 
              className="p-2 border border-gray-300 rounded-lg w-[200px] focus:border-red-400" 
              required 
            />
          </div>
        </div>

        
        
        <button type="submit" className="mt-4 bg-[#F2B807] text-white py-2 px-4 rounded">
          Next
        </button>
      </form>
    </div>
  );
};

export default PersonalDetails;
