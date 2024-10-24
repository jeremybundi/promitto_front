import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { savePersonalDetails } from '../formSlice'; // Adjust the path as necessary

const PersonalDetails = ({ onNext }) => {
  const dispatch = useDispatch();
  const personalDetailsData = useSelector((state) => state.form.personalDetails);

  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    gender: '',
    dob: '',
    idNumber: '',
    kraPin: '',
    validAddress: '',
    postalCode: '',
    city: '',
    county: '',
    country: '',
    phoneNumber: '',
    emailAddress: '',
    idUpload: null,
    kraUpload: null,
  });

  // Update the form data when personalDetailsData changes
  useEffect(() => {
    if (personalDetailsData) {
      setFormData((prevData) => ({
        ...prevData,
        ...personalDetailsData,
      }));
    }
  }, [personalDetailsData]);

  const [selectedGender, setSelectedGender] = useState(formData.gender);
  const [isOpen, setIsOpen] = useState(false);
  const options = ['Male', 'Female', 'Other'];

  const handleSelect = (option) => {
    setSelectedGender(option);
    setIsOpen(false);
    setFormData((prevData) => ({ ...prevData, gender: option }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(savePersonalDetails(formData));
    console.log(formData);
    onNext(); // Move to next tab
  };

  return (
    <div className="md:ml-[132px] md:p-6 text-xs mx-1 font-semibold rounded-lg">
      <form className="md:space-y-6 space-y-2" onSubmit={handleSubmit}>
        {/* Personal Details Fields */}
        <div className="flex flex-col mb-4">
          <label htmlFor="name" className="relative text-gray-700 mb-1">
            Name.
            <span className="text-[#F2B807] absolute md:top-[-4px] md:right-[760px]">*</span>
          </label>
          <div className="flex space-x-3 md:space-x-16">
            {['firstName', 'middleName', 'lastName'].map((field) => (
              <input
                key={field}
                type="text"
                id={field}
                name={field}
                placeholder={field === 'firstName' ? 'First Name' : field === 'middleName' ? 'Middle Name' : 'Last Name'}
                className="p-3 md:w-[195px] w-[110px] border border-gray-500 rounded-lg focus:border-[#F2B807] focus:ring-2 focus:ring-[#F2B807] outline-none flex-shrink-0"
                required
                value={formData[field]} // Set the value from formData
                onChange={handleChange}
              />
            ))}
          </div>
        </div>

        {/* Gender, Date of Birth, National ID / Passport Fields */}
        <div className="flex md:space-x-16 space-x-3 w-full items-center">
          <div className="flex flex-col">
            <label htmlFor="gender" className="relative text-gray-700 mb-1">
              Gender.
              <span className="text-[#F2B807] absolute md:top-[-4px] md:right-[130px]">*</span>
            </label>
            <div className="relative">
              <div
                className="p-3 md:w-[190px] w-[110px] bg-gray-200 border border-gray-500 rounded-lg cursor-pointer flex items-center justify-between"
                onClick={() => setIsOpen(!isOpen)}
              >
                <span>{selectedGender || 'Select '}</span>
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

          <div className="flex flex-col md:mb-4">
            <label htmlFor="dob" className="relative text-gray-700 mb-1">
              Date of Birth.
              <span className="text-[#F2B807] absolute top-[-4px] right-[100px]">*</span>
            </label>
            <input
              type="date"
              id="dob"
              name="dob"
              className="p-3 md:w-[195px] w-[110px] border border-gray-500 rounded-lg focus:border-[#F2B807] focus:ring-2 focus:ring-[#F2B807] outline-none"
              required
              value={formData.dob} // Set the value from formData
              onChange={handleChange}
            />
          </div>

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
              value={formData.idNumber} // Set the value from formData
              onChange={handleChange}
            />
          </div>
        </div>

        {/* KRA Pin No. and Upload Fields */}
        <div className="flex space-x-16 w-full ">
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
              value={formData.kraPin} // Set the value from formData
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="idUpload" className="relative text-xs text-gray-700 mb-1">
              National ID/Passport Upload
              <span className="text-[#F2B807] absolute top-[-4px] right-[15px]">*</span>
            </label>
            <input
              type="file"
              id="idUpload"
              name="idUpload"
              className="border-2 border-dashed md:w-[195px] border-gray-500 p-4 rounded-lg"
              onChange={handleFileChange}
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="kraUpload" className="relative text-gray-700 mb-1">
              KRA Pin Certificate Upload
              <span className="text-[#F2B807] absolute top-[-4px] right-[25px]">*</span>
            </label>
            <input
              type="file"
              id="kraUpload"
              name="kraUpload"
              className="border-2 border-dashed md:w-[195px] border-gray-500 p-4 rounded-lg"
              onChange={handleFileChange}
              required
            />
          </div>
        </div>

        {/* Address Fields */}
        <div className="flex md:space-x-16 space-x-3 w-full ">
          <div className="flex flex-col">
            <label htmlFor="validAddress" className="relative text-gray-700 mb-1">
              Address.
              <span className="text-[#F2B807] absolute md:top-[-4px] md:right-[130px]">*</span>
            </label>
            <input
              type="text"
              id="validAddress"
              name="validAddress"
              placeholder="Valid Address"
              className="p-3 border border-gray-500 rounded-lg focus:border-[#F2B807] focus:ring-2 focus:ring-[#F2B807] outline-none"
              required
              value={formData.validAddress} // Set the value from formData
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="postalCode" className="relative text-gray-700 mb-1">
              Postal Code
              <span className="text-[#F2B807] absolute top-[-4px] right-[70px]">*</span>
            </label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              placeholder="Postal Code"
              className="p-3 border border-gray-500 rounded-lg focus:border-[#F2B807] focus:ring-2 focus:ring-[#F2B807] outline-none"
              required
              value={formData.postalCode} // Set the value from formData
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="city" className="relative text-gray-700 mb-1">
              City.
              <span className="text-[#F2B807] absolute top-[-4px] right-[100px]">*</span>
            </label>
            <input
              type="text"
              id="city"
              name="city"
              placeholder="City"
              className="p-3 border border-gray-500 rounded-lg focus:border-[#F2B807] focus:ring-2 focus:ring-[#F2B807] outline-none"
              required
              value={formData.city} // Set the value from formData
              onChange={handleChange}
            />
          </div>
        </div>

        {/* County and Country Fields */}
        <div className="flex md:space-x-16 space-x-3 w-full ">
          <div className="flex flex-col">
            <label htmlFor="county" className="relative text-gray-700 mb-1">
              County.
              <span className="text-[#F2B807] absolute md:top-[-4px] md:right-[130px]">*</span>
            </label>
            <input
              type="text"
              id="county"
              name="county"
              placeholder="County"
              className="p-3 border border-gray-500 rounded-lg focus:border-[#F2B807] focus:ring-2 focus:ring-[#F2B807] outline-none"
              required
              value={formData.county} // Set the value from formData
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="country" className="relative text-gray-700 mb-1">
              Country.
              <span className="text-[#F2B807] absolute md:top-[-4px] md:right-[130px]">*</span>
            </label>
            <input
              type="text"
              id="country"
              name="country"
              placeholder="Country"
              className="p-3 border border-gray-500 rounded-lg focus:border-[#F2B807] focus:ring-2 focus:ring-[#F2B807] outline-none"
              required
              value={formData.country} // Set the value from formData
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Contact Information */}
        <div className="flex md:space-x-16 space-x-3 w-full ">
          <div className="flex flex-col">
            <label htmlFor="phoneNumber" className="relative text-gray-700 mb-1">
              Phone Number
              <span className="text-[#F2B807] absolute md:top-[-4px] md:right-[70px]">*</span>
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Phone Number"
              className="p-3 border border-gray-500 rounded-lg focus:border-[#F2B807] focus:ring-2 focus:ring-[#F2B807] outline-none"
              required
              value={formData.phoneNumber} // Set the value from formData
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="emailAddress" className="relative text-gray-700 mb-1">
              Email Address
              <span className="text-[#F2B807] absolute md:top-[-4px] md:right-[70px]">*</span>
            </label>
            <input
              type="email"
              id="emailAddress"
              name="emailAddress"
              placeholder="Email Address"
              className="p-3 border border-gray-500 rounded-lg focus:border-[#F2B807] focus:ring-2 focus:ring-[#F2B807] outline-none"
              required
              value={formData.emailAddress} // Set the value from formData
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="p-3 px-6 bg-[#F2B807] ml-auto mr-24 rounded-lg text-white hover:bg-[#E2A306] focus:outline-none focus:ring-2 focus:ring-[#E2A306] focus:ring-opacity-50"
          >
             Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalDetails;
