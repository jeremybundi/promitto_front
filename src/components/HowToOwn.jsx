import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import image1 from "../../src/assets/images/image1.png";
import sail from "../../src/assets/images/sail.png";
import path from "../../src/assets/images/Path.png";


export default function HowToOwn() {
  const navigate = useNavigate();
  const [terms, setTerms] = useState([]);

  useEffect(() => {
    axios
      .get("https://api4.promittoltd.com/loan-terms/getAll")
      .then((response) => {
        console.log("API Response:", response.data); // Log response
        setTerms(response.data);
      })
      .catch((error) => {
        console.error("Error fetching terms:", error);
      });
  }, []);
  

  const handleEnrollNow = () => {
    navigate("/register");
  };
    
    return (
    

        <div>
      <div className="flex flex-col md:flex-row font-poppins mt-8  gap-2 p-6">
        {/* First Column */}
        <div className="w-full md:w-1/2 p-16 pt-36 mx-12 bg-gray-100 rounded-lg shadow-md">
          <h2 className="text-7xl text-yellow-500 font-bold mb-4">Own a Home</h2>
          <p className="text-gray-500 text-lg mb-10">
            At Promitto Ltd, we have streamlined the path to homeownership, making
            it easier and more accessible than ever before. With our innovative
            approach, owning a home becomes an achievable reality. We offer
            flexible financing options, tailored to suit your unique
            circumstances, ensuring that your dream of homeownership fits
            comfortably within your budget.
          </p>
          <div className="flex items-center space-x-2">

<span className="bg-yellow-400 md:p-2 p-1 md:mb- mb-6 items-center text-sm md:text-lg 
font-medium cursor-pointer flex hover:bg-yellow-600 rounded-md"
onClick={handleEnrollNow}>
Enroll Now
<svg
width="17"
height="17"
viewBox="0 0 17 17"
fill="none"
xmlns="http://www.w3.org/2000/svg"
xmlnsXlink="http://www.w3.org/1999/xlink"
className="ml-1"
>
<rect width="17" height="17" fill="url(#pattern0_101_1417)" />
<defs>
    <pattern
    id="pattern0_101_1417"
    patternContentUnits="objectBoundingBox"
    width="1"
    height="1"
    >
    <use
        xlinkHref="#image0_101_1417"
        transform="scale(0.01)"
    />
    </pattern>
    <image
    id="image0_101_1417"
    width="100"
    height="100"
    xlinkHref="data:image/png;base64,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"
    />
</defs>
</svg>

</span>
</div>
        </div>
  
        {/* Second Column */}
        <div className="w-full md:w-1/2 p-6 mt-12 bg-white">
          <h2 className="text-2xl font-bold text-gray-700">Jenga Nyumba Loan</h2>
          <p className="text-gray-400 mt-4 text-lg">Why You Should Get It!</p>
          <div className="flex gap-8 mt-12">
            <span className="border rounded-3xl shadow-md p-6">
            <img src={image1} alt="Home" className="w-[80px] mb-4 mt-5 " />


                <h1 className="text-lg font-semibold mb-3">
                Sustainable Loans.

                </h1>

                <p className="text-gray-500">
                Housing is a basic need. Promitto provides the affordable and sustainable 
                Jenga Nyumba loan products geared towards providing affordable housing to its members.
                </p>

            </span>
            <span className="border rounded-3xl shadow-md bg-[#F2B807] p-6">
            <img src={sail} alt="Sail" className="w-[70px] mt-5 mb-4" />

            <h1 className="text-lg font-semibold mb-3">
            Construction Services.

                </h1>
                <p className="text-gray-600">
                Attached to the Jenga Nyumba Loan Product, members are offered full construction services by the society’s 
                contractors to help members construct with efficiency and timeliness.
                </p>

            </span>

          </div>
        </div>
  
      </div>
     {/* Terms and Conditions Section */}
     <div className="mt-10 p-6 mx-20">
        <h2 className="text-4xl font-medium text-center text-yellow-400 mb-12">Our Terms and Conditions</h2>
        {terms.length > 0 ? (
          terms.map((term) => (
            <div key={term.id} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="px-6">
                <h3 className="text-3xl font-medium text-yellow-400 mb-6">01. Loan Security.</h3>
                <p className="font-semibold mb-4">Borrower agrees that on or before the date of this agreement shall deliver the following document to the lender;</p>

<ul className="list-disc pl-6 text-sm text-gray-700">
  {term.loan_security
    ?.replace(/\\n/g, "\n") 
    .split("\n")
    .map(line => line.replace(/^-?\s*/, "")) 
    .filter(line => line.trim() !== "") 
    .map((security, index) => (
      <li key={index}>{security}</li>
    ))}
</ul>



  

<h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Expenses</h3>
<ul className="list-disc pl-6 text-gray-700">
  {term.expenses
    ?.replace(/\\n/g, "\n") 
    .split("\n")
    .map(line => line.replace(/^-?\s*/, "")) 
    .filter(line => line.trim() !== "") 
    .map((expense, index) => (
      <li key={index}>{expense}</li>
    ))}
</ul>

<h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Loan Repayment Term</h3>
<ul className="list-disc pl-6 text-gray-700">
  {term.loan_repayment_term
    ?.replace(/\\n/g, "\n") 
    .split("\n")
    .map(line => line.replace(/^-?\s*/, "")) 
    .filter(line => line.trim() !== "") 
    .map((item, index) => (
      <li key={index}>{item}</li>
    ))}
</ul>
</div>

<div className="px-6">
    <div>

    <img src={path} alt="path" className="w-full mt-5 mb-4" />

    </div>

    <h3 className="text-xl font-semibold text-gray-800 mb-2">Deposits</h3>
<ul className="list-disc pl-6 text-gray-700">
  {term.deposits
    ?.replace(/\\n/g, "\n") // Converts escaped "\n" into real newlines
    .split("\n")
    .map(line => line.replace(/^-?\s*/, "")) // Removes leading "-" or spaces
    .filter(line => line.trim() !== "") // Removes empty lines
    .map((deposit, index) => (
      <li key={index}>{deposit}</li>
    ))}
</ul>



              
              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Defaulting a Loan</h3>
<ul className="list-disc pl-6 text-gray-700">
  {term.default_a_loan
    .replace(/\\n/g, "\n") // Converts escaped "\n" into real newlines
    .split("\n")
    .map(line => line.replace(/^-?\s*/, "")) // Removes leading "-" or extra spaces
    .filter(line => line.trim() !== "") // Filters out empty lines
    .map((defaultItem, index) => (
      <li key={index}>{defaultItem}</li>
    ))}
</ul>

              
              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Actionables</h3>
<ul className="list-disc pl-6 text-gray-700">
  {term.actionables
    .replace(/\\n/g, "\n") // Converts literal "\n" into actual newlines
    .split("\n")
    .map(action => action.replace(/^-?\s*/, "")) // Remove leading "- " or "-"
    .filter(line => line.trim() !== "")
    .map((action, index) => (
      <li key={index}>{action}</li>
    ))}
</ul>
</div>


            </div>
          ))
        ) : (
          <p className="text-gray-500">Loading terms...</p>
        )}
      </div>
    </div>
      
    );
  }
  

