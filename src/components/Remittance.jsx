// Remittance.jsx
import React from 'react';

const Remittance = () => {
  return (
    <div className="flex flex-col items-center font-poppins py-4 w-[900px] mx-[70px] bg-white ">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Choose your desired Payment method
      </h2>
      <p className="text-sm text-gray-700 mb-6 px-40 text-center">
        Kindly proceed to pay KES 30,000 for your account application fees to cater for NEEMA, site visit, bill of quantities, county charges, valuation, physical planning, NCA, and other building approvals and licenses.
      </p>
      <button className="px-6 py-2 border-2 border-[#53C064] text-[#53C064] rounded-xl hover:bg-[#53C064] hover:text-white transition duration-200">
        Proceed to Pay
      </button>
    </div>
  );
};

export default Remittance;
