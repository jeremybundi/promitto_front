import React, { useState } from 'react';
import PersonalDetails from './PersonalDetails';
import NextOfKin from './NextOfKin';
import Remittance from './Remittance';

const Register = () => {
  const [activeTab, setActiveTab] = useState('personalDetails');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
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

          {/* Underline for the active tab */}
          <div
            className="h-1 transition-all duration-300"
            style={{
              backgroundColor: activeTab === 'personalDetails' || activeTab === 'nextOfKin' || activeTab === 'remittanceDetails' || activeTab === 'review' ? '#F2B807' : '#F5F5F5',
              width: activeTab === 'personalDetails' ? '200px' :
                     activeTab === 'nextOfKin' ? '200px' :
                     activeTab === 'remittanceDetails' ? '200px' :
                     activeTab === 'review' ? '80px' : '180px', 
              marginLeft: activeTab === 'personalDetails' ? '165px' :
                           activeTab === 'nextOfKin' ? '375px' :
                           activeTab === 'remittanceDetails' ? '575px' :
                           activeTab === 'review' ? '770px' : '20px', 
            }}
          />
        </div>
        
        <div className="text-left ml-40">Complete</div>

        <div className="w-full">
          {activeTab === 'personalDetails' && <PersonalDetails />}
          {activeTab === 'nextOfKin' && <NextOfKin />}
          {activeTab === 'remittanceDetails' && <Remittance />}
          {activeTab === 'review' && (
            <div>
              <h2 className="text-xl font-semibold">Review</h2>
              {/* Review information goes here */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
