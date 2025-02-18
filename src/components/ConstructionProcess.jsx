import React from "react";
import img11 from "../assets/images/11.png";
import img22 from "../assets/images/22.png";
import img33 from "../assets/images/33.png";
import img44 from "../assets/images/44.png";
import img55 from "../assets/images/55.png";
import img66 from "../assets/images/66.png";

const ConstructionProcess = () => {
  const steps = [
    {
      image: img11,
      title: "Expression of Interest",
      description:
        "Client expresses interest to construct and commits with a deposit of KES 30,000. Promitto kicks off by performing due diligence including a site visit, title search, and KYC verification.",
    },
    {
      image: img22,
      title: "Client Authorization Stage",
      description:
        "Promitto shares project details with contractor for preparation of a Bill of Quantities.",
    },
    {
      image: img33,
      title: "Project Assignment",
      description:
        "Promitto provides Bill of Quantities within a maximum of 14 working days.",
    },
    {
      image: img44,
      title: "Clearance Stage",
      description:
        "Promitto shares the Bill of Quantities with the Client. Client makes deposit of 30% to Promitto.",
    },
    {
      image: img55,
      title: "Confirmation stage",
      description:
        "Promitto shares the Bill of Quantities with the Client. Client makes deposit of 30% to Promitto.",
    },
    {
      image: img66,
      title: "Implementation, monitoring and evaluation stage",
      description:
        "Promitto flags off construction and oversees management of project. Construction ends in 6 - 12 months as client continues to make monthly repayments. Client starts making monthly repayments a month after construction begins.",
    },
  ];

  return (
    <div className="mx-24 p-6">
      <h1 className="text-4xl font-medium text-center text-yellow-400 mb-6">
        Construction Process
      </h1>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step, index) => (
          <div
            key={index}
            className=" p-6  bg-white text-lrft"
          >
            {/* Image */}
            <img
              src={step.image}
              alt={step.title}
              className="w-  object-cover rounded-lg mb-4"
            />
            
            {/* Title */}
            <h2 className="text-xl font-semibold font-lufga text-[#010440] mb-2">
              {step.title}
            </h2>

            {/* Description */}
            <p className="text-gray-500 text-sm font-poppins">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConstructionProcess;
