import React from 'react';
import { useSelector } from 'react-redux';

const Review = ({ onEditClick }) => {
  // Access data from the Redux store using useSelector
  const personalDetails = useSelector((state) => state.form.personalDetails);
  const nextOfKin = useSelector((state) => state.form.nextOfKin);
  const remittanceDetails = useSelector((state) => state.form.remittanceDetails);

  return (
    <div className="flex flex-col mx-24 text-xs items-center">
      <div className="bg-white rounded-xl p-8 w-full">
        <p className="text-lg font-semibold mb-4 text-center">Please review your details before submission.</p>

        <div className="space-y-6">
          {/* Personal Details Section */}
          <div className="space-y-8 p-6 bg-gray-50 rounded-lg shadow-lg">
            {/* Personal Details Header */}
            <div className="border-b pb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center">
                Personal Details
              </h2>

              <div className="space-y-4">
                {/* First Row */}
                <div className="flex space-x-7 p-2 bg-gray-100">
                  {/* Name */}
                  <div className="col-span-2">
                    <label className="block text-sm font-semibold mb-1 text-[#F2B807]">Name</label>
                    <div className="flex space-x-3 items-center ">
                      <span className="text-gray-700 font-semibold text-xs">{personalDetails.firstName}</span>
                      <span className="text-gray-700 font-semibold text-xs">{personalDetails.middleName}</span>
                      <span className="text-gray-700 font-semibold text-xs">{personalDetails.lastName}</span>
                    </div>
                  </div>

                  <div className="pl-12">
                    <label className="block text-sm font-semibold mb-1 text-[#F2B807]">Gender</label>
                    <p className="text-gray-700 font-semibold">{personalDetails.gender}</p>
                  </div>

                  <div className="pl-8">
                    <label className="block text-sm font-semibold mb-1 text-[#F2B807]">Date of Birth</label>
                    <p className="text-gray-700 font-semibold">{personalDetails.dob}</p>
                  </div>

                  <div className="pl-5">
                    <label className="block text-sm font-semibold mb-1 text-[#F2B807]">Email Address</label>
                    <p className="text-gray-700 font-semibold">{personalDetails.emailAddress}</p>
                  </div>

                  <div className="pl-3">
                    <label className="block text-sm font-semibold mb-1 text-[#F2B807]">KRA PIN</label>
                    <p className="text-gray-700 font-semibold">{personalDetails.kraPin}</p>
                  </div>
                </div>

                {/* Second Row */}
                <div className="flex space-x-7 py-2 w-full px-2 bg-[#FFFCF2]">
                  <div className="col-span-2">
                    <label className="block text-sm font-semibold mb-1 text-[#F2B807]">Address</label>
                    <p className="text-gray-700 font-semibold">
                      {personalDetails.validAddress}, {personalDetails.city}, {personalDetails.county}
                    </p>
                  </div>

                  <div className="pl-4">
                    <label className="block text-sm font-semibold mb-1 text-[#F2B807]">Postal Code</label>
                    <p className="text-gray-700 font-semibold">{personalDetails.postalCode}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-1 text-[#F2B807]">Country</label>
                    <p className="text-gray-700 font-semibold">{personalDetails.country}</p>
                  </div>

                  <div className="px-12">
                    <label className="block text-sm font-semibold mb-1 text-[#F2B807]">Phone No.</label>
                    <p className="text-gray-700 font-semibold">{personalDetails.phoneNumber}</p>
                  </div>

                  <div className="pl-10">
                    <label className="block text-sm font-semibold mb-1 text-[#F2B807]">ID Number</label>
                    <p className="text-gray-700 text-xs font-semibold">{personalDetails.idNumber}</p>
                  </div>
                </div>
                <div className="relative">
  {/* Next of Kin Row */}
  <div className="flex space-x-7 py-2 w-full px-2 bg-[#FFFCF2]">
    <div className="col-span-2">
      <label className="block text-sm font-semibold mb-1 text-[#F2B807]">Phone</label>
      <p className="text-gray-700 font-semibold">{nextOfKin.phone}</p>
    </div>

    <div className="pl-11">
      <label className="block text-sm font-semibold mb-1 text-[#F2B807]">National ID</label>
      <p className="text-gray-700 font-semibold">{nextOfKin.nationalId}</p>
    </div>

    <div className="pl-12">
      <label className="block text-sm font-semibold mb-1 text-[#F2B807]">Date of Birth</label>
      <p className="text-gray-700 font-semibold">{nextOfKin.dob}</p>
    </div>
  </div>

  {/* Edit Section */}
  <div className="mt-4 flex items-center justify-end space-x-2">
  <p className=" font-semibold text-sm cursor-pointer"
    onClick={() => onEditClick('personalDetails')} // Switch to Personal Details tab
>Edit Personal Details</p>

    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#F2B807"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3l-9 9-4 1 1-4 9-9z" />
    </svg>
  </div>
</div>
              </div>
            </div>
          </div>

          {/* Next of Kin Details Section */}
          <div className="space-y-8 p-6 bg-gray-50 rounded-lg shadow-lg">
            <div className="border-b pb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center">Next of Kin Details</h2>

              <div className="space-y-4">
                {/* Next of Kin Row */}
                <div className="flex space-x-7 p-2 bg-gray-100">
                  <div className="col-span-2">
                    <label className="block text-sm font-semibold mb-1 text-[#F2B807]">First Name</label>
                    <p className="text-gray-700 font-semibold">{nextOfKin.firstName}</p>
                  </div>

                  <div className="pl-12">
                    <label className="block text-sm font-semibold mb-1 text-[#F2B807]">Middle Name</label>
                    <p className="text-gray-700 font-semibold">{nextOfKin.middleName}</p>
                  </div>

                  <div className="pl-8">
                    <label className="block text-sm font-semibold mb-1 text-[#F2B807]">Last Name</label>
                    <p className="text-gray-700 font-semibold">{nextOfKin.lastName}</p>
                  </div>

                  <div className="pl-5">
                    <label className="block text-sm font-semibold mb-1 text-[#F2B807]">Relationship</label>
                    <p className="text-gray-700 font-semibold">{nextOfKin.relationship}</p>
                  </div>
                </div>

                <div className="relative">
  {/* Next of Kin Row */}
  <div className="flex space-x-7 py-2 w-full px-2 bg-[#FFFCF2]">
    <div className="col-span-2">
      <label className="block text-sm font-semibold mb-1 text-[#F2B807]">Phone</label>
      <p className="text-gray-700 font-semibold">{nextOfKin.phone}</p>
    </div>

    <div className="pl-11">
      <label className="block text-sm font-semibold mb-1 text-[#F2B807]">National ID</label>
      <p className="text-gray-700 font-semibold">{nextOfKin.nationalId}</p>
    </div>

    <div className="pl-12">
      <label className="block text-sm font-semibold mb-1 text-[#F2B807]">Date of Birth</label>
      <p className="text-gray-700 font-semibold">{nextOfKin.dob}</p>
    </div>
  </div>

  {/* Edit Section */}
  <div className="mt-4 flex items-center justify-end space-x-2">
  <p className=" font-semibold text-sm cursor-pointer"
    onClick={() => onEditClick('nextOfKin')} // Switch to Next of Kin tab
     >Edit Next of Kin Details</p>

    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#F2B807"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3l-9 9-4 1 1-4 9-9z" />
    </svg>
  </div>
</div>


              </div>
            </div>
          </div>

          {/* Remittance Details Section */}
          <div className="space-y-8 p-6 bg-gray-50 rounded-lg shadow-lg">
            <div className="border-b pb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center">Remittance Details</h2>

              <div className="space-y-4">
                {/* Remittance Row */}
                <div className="flex space-x-7 p-2 bg-gray-100">
                  <div className="col-span-2">
                    <label className="block text-sm font-semibold mb-1 text-[#F2B807]">Phone Number</label>
                    <p className="text-gray-700 font-semibold">{remittanceDetails.phoneNumber}</p>
                  </div>

                  <div className="pl-12">
                    <label className="block text-sm font-semibold mb-1 text-[#F2B807]">Transaction Code</label>
                    <p className="text-gray-700 font-semibold">{remittanceDetails.transactionCode}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
