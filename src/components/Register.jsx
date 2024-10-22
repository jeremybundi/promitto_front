import React, { useState } from 'react';
import PersonalDetails from './PersonalDetails';

const Register = () => {
  const [activeTab, setActiveTab] = useState('personalDetails');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex flex-col  rounded-xl shadow-xl mx-40 p-8">
      <h1 className="text-3xl font-bold text-center text-[#F2B807] mb-4">Register Now?</h1>
      <p className="text-lg font-semibold mb-4 text-center" data-aos="fade-up">Membership Registration Form</p>

      <div className="flex  flex-col">
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

        {/* Underline for the active tab */}
        <div className="h-1 transition-all duration-300" style={{
          backgroundColor: activeTab ? (activeTab === 'personalDetails' || activeTab === 'nextOfKin' || activeTab === 'remittanceDetails' || activeTab === 'review' ? '#F2B807' : '#F5F5F5') : '#F5F5F5',
          width: activeTab === 'personalDetails' ? '250px' :
                 activeTab === 'nextOfKin' ? '240px' :
                 activeTab === 'remittanceDetails' ? '250px' :
                 activeTab === 'review' ? '150px' : '180px', // Default width
          marginLeft: activeTab === 'personalDetails' ? '115px' :
                      activeTab === 'nextOfKin' ? '370px' :
                      activeTab === 'remittanceDetails' ? '615px' :
                      activeTab === 'review' ? '860px' : '20px', // Default margin
        }} />
      </div>
      <div className="text-left ml-40">Complete</div>
      <div className="w-full max-w-2xl bg-white  px-4">
      {activeTab === 'personalDetails' && <PersonalDetails />}

        {activeTab === 'nextOfKin' && (
          <div>
            <h2 className="text-xl font-semibold">Next of Kin Details</h2>
            {/* Next of kin details form fields go here */}
          </div>
        )}
        {activeTab === 'remittanceDetails' && (
          <div>
            <h2 className="text-xl font-semibold">Remittance Details</h2>
            {/* Remittance details form fields go here */}
          </div>
        )}
        {activeTab === 'review' && (
          <div>
            <h2 className="text-xl font-semibold">Review</h2>
            {/* Review information goes here */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
