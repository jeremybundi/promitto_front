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
    marital: '',
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
    housingDetails: '',
  });

  useEffect(() => {
    if (personalDetailsData) {
      setFormData((prevData) => ({
        ...prevData,
        ...personalDetailsData,
      }));
    }
  }, [personalDetailsData]);

  const [isGenderOpen, setIsGenderOpen] = useState(false);
  const [isMaritalOpen, setIsMaritalOpen] = useState(false);
  const [isHousingOpen, setIsHousingOpen] = useState(false);

  const genderOptions = ['Male', 'Female', 'Other'];
  const maritalOptions = ['Single', 'Married', 'Widower', 'Divorced', 'Other'];
  const housingOptions = ['Rental', 'Owner Occupied', 'Employer Housing'];

  const handleSelectGender = (option) => {
    setFormData((prevData) => ({ ...prevData, gender: option }));
    setIsGenderOpen(false);
  };

  const handleSelectMarital = (option) => {
    setFormData((prevData) => ({ ...prevData, marital: option }));
    setIsMaritalOpen(false);
  };

  const handleSelectHousing = (option) => {
    setFormData((prevData) => ({ ...prevData, housingDetails: option }));
    setIsHousingOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(savePersonalDetails(formData));
    onNext(); // Move to next tab
  };

  return (
    <div className="md:py-6  text-xs font-semibold rounded-lg">
      <form className="md:space-y-6 space-y-2" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 md:grid-cols-3 md:gap-6">
          {/* First Name */}
          
          <div className="flex flex-col mb-4">
            <label htmlFor="firstName" className="text-gray-700  mb-1">
              First Name <span className="text-[#F2B807]">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="First Name"
              className="p-3 border border-gray-500  rounded-lg focus:border-[#F2B807] focus:ring-2 focus:ring-[#F2B807] outline-none md:w-full w-[80%]  "
              required
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>

          {/* Middle Name */}
          <div className="flex flex-col mb-4">
            <label htmlFor="middleName" className="text-gray-700 mb-1">
              Middle Name <span className="text-[#F2B807]">*</span>
            </label>
            <input
              type="text"
              id="middleName"
              name="middleName"
              placeholder="Middle Name"
              className="p-3 border border-gray-500 rounded-lg focus:border-[#F2B807] focus:ring-2 focus:ring-[#F2B807] outline-none md:w-full w-[80%]"
              required
              value={formData.middleName}
              onChange={handleChange}
            />
          </div>

          {/* Last Name */}
          <div className="flex flex-col mb-4">
            <label htmlFor="lastName" className="text-gray-700 mb-1">
              Last Name <span className="text-[#F2B807]">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Last Name"
              className="p-3 border border-gray-500 rounded-lg focus:border-[#F2B807] focus:ring-2 focus:ring-[#F2B807] outline-none md:w-full w-[80%]"
              required
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>

          {/* Gender */}
          <div className="flex flex-col mb-4">
            <label htmlFor="gender" className="text-gray-700 mb-1">
              Gender <span className="text-[#F2B807]">*</span>
            </label>
            <div className="relative">
              <div
                className="p-3 bg-gray-200 border border-gray-500 rounded-lg md:w-full w-[80%] cursor-pointer"
                onClick={() => setIsGenderOpen(!isGenderOpen)}
              >
                <span>{formData.gender || 'Select'}</span>
              </div>
              {isGenderOpen && (
                <ul className="absolute z-10 mt-1 md:w-full w-[80%] bg-white border border-gray-300 rounded-lg shadow-lg ">
                  {genderOptions.map((option) => (
                    <li
                      key={option}
                      onClick={() => handleSelectGender(option)}
                      className="p-2 hover:bg-[#F2B807] cursor-pointer "
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Marital Status */}
          <div className="flex flex-col mb-4">
            <label htmlFor="marital" className="text-gray-700 mb-1">
              Marital Status <span className="text-[#F2B807]">*</span>
            </label>
            <div className="relative">
              <div
                className="p-3 bg-gray-200 border border-gray-500 md:w-full w-[80%] rounded-lg cursor-pointer"
                onClick={() => setIsMaritalOpen(!isMaritalOpen)}
              >
                <span>{formData.marital || 'Select'}</span>
              </div>
              {isMaritalOpen && (
                <ul className="absolute z-10 mt-1 md:w-full w-[80%] bg-white border border-gray-300 rounded-lg shadow-lg">
                  {maritalOptions.map((option) => (
                    <li
                      key={option}
                      onClick={() => handleSelectMarital(option)}
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
            <label htmlFor="dob" className="text-gray-700 mb-1">
              Date of Birth <span className="text-[#F2B807]">*</span>
            </label>
            <input
              type="date"
              id="dob"
              name="dob"
              className="p-3 border border-gray-500 rounded-lg focus:border-[#F2B807] focus:ring-2 focus:ring-[#F2B807] outline-none md:w-full w-[80%]"
              required
              value={formData.dob}
              onChange={handleChange}
            />
          </div>

          {/* National ID/Passport */}
          <div className="flex flex-col mb-4">
            <label htmlFor="idNumber" className="text-gray-700 mb-1">
              National ID/Passport <span className="text-[#F2B807]">*</span>
            </label>
            <input
              type="text"
              id="idNumber"
              name="idNumber"
              placeholder="National ID/Passport"
              className="p-3 border border-gray-500 rounded-lg focus:border-[#F2B807] focus:ring-2 focus:ring-[#F2B807] outline-none md:w-full w-[80%]"
              required
              value={formData.idNumber}
              onChange={handleChange}
            />
          </div>

          {/* KRA PIN */}
          <div className="flex flex-col mb-4">
            <label htmlFor="kraPin" className="text-gray-700 mb-1">
              KRA PIN <span className="text-[#F2B807]">*</span>
            </label>
            <input
              type="text"
              id="kraPin"
              name="kraPin"
              placeholder="KRA PIN"
              className="p-3 border border-gray-500 rounded-lg focus:border-[#F2B807] focus:ring-2 focus:ring-[#F2B807] outline-none md:w-full w-[80%]"
              required
              value={formData.kraPin}
              onChange={handleChange}
            />
          </div>

          {/* Valid Address */}
          <div className="flex flex-col mb-4">
            <label htmlFor="validAddress" className="text-gray-700 mb-1">
              Valid Address <span className="text-[#F2B807]">*</span>
            </label>
            <input
              type="text"
              id="validAddress"
              name="validAddress"
              placeholder="Valid Address"
              className="p-3 border border-gray-500 rounded-lg focus:border-[#F2B807] focus:ring-2 focus:ring-[#F2B807] outline-none md:w-full w-[80%]"
              required
              value={formData.validAddress}
              onChange={handleChange}
            />
          </div>

          {/* Postal Code */}
          <div className="flex flex-col mb-4">
            <label htmlFor="postalCode" className="text-gray-700 mb-1">
              Postal Code <span className="text-[#F2B807]">*</span>
            </label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              placeholder="Postal Code"
              className="p-3 border border-gray-500 rounded-lg focus:border-[#F2B807] focus:ring-2 focus:ring-[#F2B807] outline-none md:w-full w-[80%]"
              required
              value={formData.postalCode}
              onChange={handleChange}
            />
          </div>

          {/* City */}
          <div className="flex flex-col mb-4">
            <label htmlFor="city" className="text-gray-700 mb-1">
              City <span className="text-[#F2B807]">*</span>
            </label>
            <input
              type="text"
              id="city"
              name="city"
              placeholder="City"
              className="p-3 border border-gray-500 rounded-lg focus:border-[#F2B807] focus:ring-2 focus:ring-[#F2B807] outline-none md:w-full w-[80%]"
              required
              value={formData.city}
              onChange={handleChange}
            />
          </div>

          {/* County */}
          <div className="flex flex-col mb-4">
            <label htmlFor="county" className="text-gray-700 mb-1">
              County <span className="text-[#F2B807]">*</span>
            </label>
            <input
              type="text"
              id="county"
              name="county"
              placeholder="County"
              className="p-3 border border-gray-500 rounded-lg focus:border-[#F2B807] focus:ring-2 focus:ring-[#F2B807] outline-none md:w-full w-[80%]"
              required
              value={formData.county}
              onChange={handleChange}
            />
          </div>

          {/* Country */}
          <div className="flex flex-col mb-4">
            <label htmlFor="country" className="text-gray-700 mb-1">
              Country <span className="text-[#F2B807]">*</span>
            </label>
            <input
              type="text"
              id="country"
              name="country"
              placeholder="Country"
              className="p-3 border border-gray-500 rounded-lg focus:border-[#F2B807] focus:ring-2 focus:ring-[#F2B807] outline-none md:w-full w-[80%]"
              required
              value={formData.country}
              onChange={handleChange}
            />
          </div>

          {/* Phone Number */}
          <div className="flex flex-col mb-4">
            <label htmlFor="phoneNumber" className="text-gray-700 mb-1">
              Phone Number <span className="text-[#F2B807]">*</span>
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Phone Number"
              className="p-3 border border-gray-500 rounded-lg focus:border-[#F2B807] focus:ring-2 focus:ring-[#F2B807] outline-none md:w-full w-[80%]"
              required
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>

          {/* Email Address */}
          <div className="flex flex-col mb-4">
            <label htmlFor="emailAddress" className="text-gray-700 mb-1">
              Email Address <span className="text-[#F2B807]">*</span>
            </label>
            <input
              type="email"
              id="emailAddress"
              name="emailAddress"
              placeholder="Email Address"
              className="p-3 border border-gray-500 rounded-lg focus:border-[#F2B807] focus:ring-2 focus:ring-[#F2B807] outline-none md:w-full w-[80%]"
              required
              value={formData.emailAddress}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Housing Details */}
        <div className="flex flex-col mb-4">
          <label htmlFor="housingDetails" className="text-gray-700 mb-1">
            Housing Details <span className="text-[#F2B807]">*</span>
          </label>
          <div className="relative">
            <div
      className="p-3 bg-gray-200 border border-gray-500 rounded-lg cursor-pointer w-[40%]  md:w-[320px]"
      onClick={() => setIsHousingOpen(!isHousingOpen)}
            >
              <span>{formData.housingDetails || 'Select'}</span>
            </div>
            {isHousingOpen && (
      <ul className="relative z-10 mt-1 md:w-[320px] w-[40%] bg-white border border-gray-300 rounded-lg shadow-lg">
                {housingOptions.map((option) => (
                  <li
                    key={option}
                    onClick={() => handleSelectHousing(option)}
                    className="p-2 hover:bg-[#F2B807] rounded-md cursor-pointer"
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
     <div className=''>
        <button
          type="submit"
          className="w-auto px-8 bg-[#F2B807] text-white py-3 text-center rounded-lg hover:bg-yellow-600 transition-colors"
        >
          Save and Continue
        </button>
        </div>
      </form>
      
    </div>
  );
};

export default PersonalDetails;
