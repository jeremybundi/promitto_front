import React, { useState } from 'react';
import NextOfKin from './NextOfKin';
import PersonalDetails from './PersonalDetails';
import RemittanceDetails from './Remittance';
import Review from './Review';
import EmploymentDetails from './EmploymentDetails';
import BusinessDetails from './BusinessDetails';
import PropertyDetails from './PropertyDetails';
import { useSelector } from 'react-redux';

const Register = () => {
  const [activeTab, setActiveTab] = useState('Personal Details');

  // Get form data from Redux store
  const { personalDetails, nextOfKin, employmentDetails, businessDetails, propertyDetails, remittanceDetails } = useSelector(state => state.form);

  // Calculate form completion percentage
  const calculateCompletionPercentage = () => {
    let percentage = 0;

    if (Object.keys(personalDetails).length > 0) {
      percentage += 20; 
    }

    if (Object.keys(nextOfKin).length > 0) {
      percentage += 10; 
    }
    if (Object.keys(employmentDetails).length > 0) {
      percentage += 20; 
    }
    if (Object.keys(businessDetails).length > 0) {
      percentage += 20; 
    }
    if (Object.keys(propertyDetails).length > 0) {
      percentage += 20; 
    }

    if (Object.keys(remittanceDetails).length > 0) {
      percentage += 10; 
    }

    return percentage;
  };

  // Handle tab switching
  const handleTabSwitch = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="flex flex-col items-center mx-2 md:mx-40">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full">
        <h1 className="text-2xl font-bold text-center text-[#F2B807] mb-4">Register Now?</h1>
        <p className="text-lg font-semibold mb-4 text-center" data-aos="fade-up">Membership Registration Form</p>

        <div className="flex flex-col">
          {/* Scrollable Tabs */}
          <div className="flex flex-nowrap overflow-x-auto space-x-4 md:font-light font-semibold md:text-sm text-[12px] font-poppins md:mx-36 justify-start md:p-2 relative">
            {['Personal Details', 'Next Of Kin', 'Employment Details', 'Business Details', 'Property Details', 'Remittance Details', 'Review'].map(tab => (
              <button
                key={tab}
                className={`py-2 px-4 rounded-lg ${activeTab === tab ? 'text-[#F2B807]' : 'text-gray-700'} hover:text-[#F2B807] transition`}
                onClick={() => handleTabSwitch(tab)}
              >
                {tab.replace(/([A-Z])/g, ' $1').trim()}
              </button>
            ))}
          </div>

          {/* Show Completion Percentage */}
          <div className="text-left mb-2 md:ml-40">
            {calculateCompletionPercentage()}%
            <span className="font-semibold ml-2">Complete</span>
          </div>

          {/* Conditional rendering based on activeTab */}
          {activeTab === 'Personal Details' && (
            <PersonalDetails onNext={() => handleTabSwitch('Next Of Kin')} />
          )}

          {activeTab === 'Next Of Kin' && (
            <NextOfKin
              onNext={() => handleTabSwitch('Employment Details')}
              onPrevious={() => handleTabSwitch('Personal Details')}
            />
          )}

          {activeTab === 'Employment Details' && (
            <EmploymentDetails
              onNext={() => handleTabSwitch('Business Details')}
              onPrevious={() => handleTabSwitch('Next Of Kin')}
            />
          )}

          {activeTab === 'Business Details' && (
            <BusinessDetails
              onNext={() => handleTabSwitch('Property Details')}
              onPrevious={() => handleTabSwitch('Employment Details')}
            />
          )}
          {activeTab === 'Property Details' && (
            <PropertyDetails
              onNext={() => handleTabSwitch('Remittance Details')}
              onPrevious={() => handleTabSwitch('Business Details')}
            />
          )}

          {activeTab === 'Remittance Details' && (
            <RemittanceDetails
              onNext={() => handleTabSwitch('Review')}
              onPrevious={() => handleTabSwitch('Property Details')}
            />
          )}

          {activeTab === 'Review' && (
            <Review
              onPrevious={() => handleTabSwitch('Remittance Details')}
              onEditClick={handleTabSwitch}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
