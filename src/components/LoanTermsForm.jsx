import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const LoanTermsForm = () => {
  const token = useSelector((state) => state.auth.token); // Get token from Redux
    const navigate = useNavigate();

  const [formData, setFormData] = useState({
    loan_security:"",
    deposits: "",
    expenses: "",
    loan_repayment_term: "",
    default_a_loan: "",
    actionables: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://api4.promittoltd.com/loan-terms/create", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Loan terms created successfully!", response.data);
      setFormData({ loan_security:"", deposits: "", expenses: "", loan_repayment_term: "", default_a_loan: "", actionables: "" });
    } catch (error) {
      console.error("Error creating loan terms:", error);
      console.log("Failed to create loan terms");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white font-poppins shadow-lg rounded-lg">
  <div className='flex'>
      <h2 className="text-xl font-semibold font-poppins  text-yellow-500 mb-4">Create Loan terms</h2>
      <button
          onClick={() => navigate("/admin")}
          className="bg-yellow-700 hover:bg-yelow-600 font-poppins text-white md:px-4 px-2 md:py-2 ml-auto mb-1 rounded-lg shadow-md"
        >
          Dashboard
        </button>
        </div>        <form onSubmit={handleSubmit} className="space-y-4">
        {Object.keys(formData).map((key) => (
          <div key={key}>
            <label className="block text-gray-700 font-medium capitalize">{key.replace(/_/g, " ")}</label>
            <textarea
              name={key}
              value={formData[key]}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={key === "default_a_loan" ? 4 : 3}
              placeholder="Enter details without bullets (e.g.  Point 1 \n Point 2)"
            />
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-yellow-700 text-white p-2 rounded-lg hover:bg-yellow-600 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default LoanTermsForm;
