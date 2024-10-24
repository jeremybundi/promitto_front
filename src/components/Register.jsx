import React, { useState } from 'react';
import NextOfKin from './NextOfKin'; // Adjust the path as needed
import PersonalDetails from './PersonalDetails'; // Example of another step
import RemittanceDetails from './Remittance'; // Another step in the process
import Review from './Review'

const Register = () => {
  const [activeTab, setActiveTab] = useState('personalDetails'); // Initial tab

  const handleNext = (currentTab, nextTab) => {
    setActiveTab(nextTab); // Set the active tab to the next one
  };

  const handlePrevious = (currentTab, previousTab) => {
    setActiveTab(previousTab); // Set the active tab to the previous one
  };
   // Function to handle tab switching
   const handleTabSwitch = (tabName) => {
    setActiveTab(tabName);
  };

    return (
      <div className="flex flex-col items-center mx-40">
        <div className="bg-white rounded-xl shadow-2xl p-8 w-full ">
          <h1 className="text-2xl font-bold text-center text-[#F2B807] mb-4">Register Now?</h1>
          <p className="text-lg font-semibold mb-4 text-center" data-aos="fade-up">Membership Registration Form</p>
  
          <div className="flex flex-col">
            <div className="flex space-x-12 font-light text-sm font-poppins mx-36 justify-between p-2 relative">
              <button
                className={`py-2 px-4 rounded-lg ${activeTab === 'personalDetails' ? 'text-[#F2B807]' : 'text-gray-700'} hover:text-[#F2B807] transition`}
                onClick={() => handleTabClick('personalDetails')}
              >
                Personal Information
              </button>
              <button
                className={`py-2 px-4 rounded-lg ${activeTab === 'nextOfKin' ? 'text-[#F2B807]' : 'text-gray-700'} hover:text-[#F2B807] transition`}
                onClick={() => handleTabClick('nextOfKin')}
              >
                Next of Kin Details
              </button>
              <button
                className={`py-2 px-4 rounded-lg ${activeTab === 'remittanceDetails' ? 'text-[#F2B807]' : 'text-gray-700'} hover:text-[#F2B807] transition`}
                onClick={() => handleTabClick('remittanceDetails')}
              >
                Remittance Details
              </button>
              <button
                className={`py-2 px-4 rounded-lg ${activeTab === 'review' ? 'text-[#F2B807]' : 'text-gray-700'} hover:text-[#F2B807] transition`}
                onClick={() => handleTabClick('review')}
              >
                Review
              </button>
            </div>

            <div className="text-left ml-40">Complete</div>


      {/* Conditional rendering based on activeTab */}
      {activeTab === 'personalDetails' && (
        <PersonalDetails
          onNext={() => handleNext('personalDetails', 'nextOfKin')}
        />
      )}

      {activeTab === 'nextOfKin' && (
        <NextOfKin
          onNext={() => handleNext('nextOfKin', 'remittanceDetails')}
          onPrevious={() => handlePrevious('nextOfKin', 'personalDetails')}
        />
      )}

      {activeTab === 'remittanceDetails' && (
        <RemittanceDetails
          onNext={() => handleNext('remittanceDetails', 'review')}
          onPrevious={() => handlePrevious('remittanceDetails', 'nextOfKin')}
        />
      )}
         {/* Review tab: Display saved data */}
         {activeTab === 'review' && (
         <Review 

         onPrevious={() => handlePrevious('review', 'remittanceDetails')}
         onEditClick={handleTabSwitch}

         
         />
    )}

    </div>
    </div>
    </div>
  );
};

export default Register;
