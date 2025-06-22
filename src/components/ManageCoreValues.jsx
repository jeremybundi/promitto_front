import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const ManageCoreValues = () => {
  const token = useSelector((state) => state.auth.token);
  const [coreValues, setCoreValues] = useState([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Added loading state
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch core values on component mount
    const fetchCoreValues = async () => {
      try {
        const response = await axios.get("https://api4.promittoltd.com/core-values");
        setCoreValues(response.data.core_values);  // Correctly access the core_values array
        console.log("API response", response.data);
      } catch (error) {
        setMessage("Failed to fetch core values");
        console.log("Failed to fetch core values", error);
      }
    };

    fetchCoreValues();
  }, []);

  const handleDeleteAll = async () => {
    if (!token) {
      setMessage("Authentication required");
      return;
    }

    setIsLoading(true); // Start loading

    try {
      const response = await axios.delete(
        "https://api4.promittoltd.com/core-values",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(response.data.message || "All Core Values Deleted");
      setCoreValues([]); // Clear the list after deletion
    } catch (error) {
      setMessage(error.response?.data?.error || "Failed to delete core values");
    } finally {
      setIsLoading(false); // End loading
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex mt-8 mb-6">
        <h2 className="text-xl font-semibold font-poppins text-yellow-500 mb-4">Manage Core Values</h2>
        <button
          onClick={() => navigate("/admin")}
          className="bg-yellow-700 hover:bg-yellow-600 font-poppins text-white md:px-4 px-2 md:py-2 ml-auto mb-1 rounded-lg shadow-md"
        >
          Dashboard
        </button>
      </div>
      
      {/* Display loading dots if still loading */}
      {isLoading && <div className="text-center mb-4">Deleting... <span className="animate-pulse">...</span></div>}

    

      {message && <p className="mb-4 text-red-600">{message}</p>}



      <div>
        {coreValues.length > 0 ? (
          coreValues.map((coreValue, index) => (
            <div key={index} className="mb-4 p-4 border rounded bg-gray-100">
                      <h3 className="font-semibold text-lg">{coreValue.description}</h3>  
              <h3 className="font-semibold text-lg">{coreValue.title}</h3>  
              <p className="italic text-sm text-gray-600">{coreValue.explanation}</p> 
              <p className="text-sm text-gray-500">Position: {coreValue.position}</p>  
            </div>
          ))
        ) : (
          <p>No core values found.</p>
        )}
      </div>
      <button
        onClick={handleDeleteAll}
        className="bg-red-500 justify-end text-white px-4 py-2 rounded "
      >
        Delete All
      </button>
    </div>
  );
};

export default ManageCoreValues;
