import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

const ManageLoanTerms = () => {
  const [loanTerms, setLoanTerms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [termToDelete, setTermToDelete] = useState(null); // Store the loan term ID to delete
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLoanTerms = async () => {
      try {
        const response = await axios.get('https://api4.promittoltd.com/loan-terms/getAll');
        setLoanTerms(response.data);
      } catch (error) {
        console.error('Error fetching loan terms:', error);
      }
    };

    fetchLoanTerms();
  }, []);

  const deleteLoanTerm = async () => {
    if (termToDelete !== null) {
      setLoading(true);
      try {
        const response = await axios.delete(`https://api4.promittoltd.com/loan-terms/delete/${termToDelete}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setLoanTerms(loanTerms.filter((term) => term.id !== termToDelete));
          alert('Loan term deleted successfully');
        }
      } catch (error) {
        console.error('Error deleting loan term:', error);
        alert('Failed to delete loan term');
      } finally {
        setLoading(false);
        setShowModal(false); // Close the modal after deletion
      }
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto mt-2  bg-white rounded-xl md:mb-56 font-poppins shadow space-y-4">
      <div className="flex mt-8 mb-6">
        <h2 className="text-xl font-semibold font-poppins text-yellow-500 mb-4">Manage Loan Terms</h2>
        <button
          onClick={() => navigate("/admin")}
          className="bg-yellow-700 hover:bg-yellow-600 font-poppins text-white md:px-4 px-2 md:py-2 ml-auto mb-1 rounded-lg shadow-md"
        >
          Dashboard
        </button>
      </div>

      <div className="space-y-4 mb-6 font-semibold">
        {loanTerms.length === 0 ? (
          <p>No loan terms available.</p>
        ) : (
          loanTerms.map((term) => (
            <div key={term.id} className="border-b-2 border-yellow-500 flex justify-between mx-8 items-center mb-1">
              <span className="font-medium">{`Loan Term ID: ${term.id}`}</span>
              <button
                onClick={() => {
                  setTermToDelete(term.id); // Set the term to delete
                  setShowModal(true); // Show the modal
                }}
                className="text-sm font-medium bg-red-500 mb-4 text-white rounded-lg px-6 py-3 hover:bg-red-600 transition duration-300"
              >
                {loading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          ))
        )}
      </div>

      {/* Modal for confirmation */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h3 className="text-lg font-semibold">Are you sure you want to delete this loan term?</h3>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white rounded-lg px-4 py-2"
              >
                Cancel
              </button>
              <button
                onClick={deleteLoanTerm}
                className="bg-red-500 text-white rounded-lg px-4 py-2"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageLoanTerms;
