import React, { useState, useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const FileUpload = () => {
  const [file, setFile] = useState(null);  
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); 
  const [customName, setCustomName] = useState("");
  const navigate = useNavigate();
  

  const token = useSelector((state) => state.auth.token);

  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleCustomNameChange = (e) => {
    setCustomName(e.target.value);
  };

  const handleFileUpload = async () => {
    if (!file) {
      setError("Please select a file first.");
      return;
    }

    if (file.type !== "application/pdf") {
      setError("Only PDFs are allowed.");
      return;
    }

    if (!customName) {
      setError("Please enter a custom name.");
      return;
    }

    setIsLoading(true); 

    const formData = new FormData();
    formData.append("file", file);
    formData.append("custom_name", customName);

    try {
      const response = await axios.post(
        "https://api4.promittoltd.com/upload-pdf", 
        formData,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSuccessMessage("Your file has been uploaded successfully.");
      setError("");

      setFile(null);  
      setCustomName("");  

      fileInputRef.current.value = null;

    } catch (error) {
      setError(error.response?.data?.error || "An error occurred during upload.");
      setSuccessMessage("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 mb-20 bg-white rounded-lg shadow-lg mt-10">
        <span className="flex mb-6 mx-6">
        <h2 className="text-2xl font-semibold font-poppins mt-2 text-yellow-500 mb-4">Upload File</h2>
      <button
          onClick={() => navigate("/admin")}
          className="bg-yellow-700 hover:bg-yelow-600 font-poppins text-white md:px-4 px-2 md:py-2 ml-auto mb-4 rounded-lg shadow-md"
        >
          Dashboard
        </button>

        </span>
     
      
      {isLoading && (
        <div className="flex justify-center mb-6">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-ping200"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
          </div>
        </div>
      )}

      <div className="mb-7 flex justify-center items-center">
        <input 
          ref={fileInputRef}
          type="file" 
          accept="application/pdf" 
          onChange={handleFileChange} 
          className="w-3/4 p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="mb-1 flex justify-center items-center">
        <input 
          type="text" 
          value={customName} 
          onChange={handleCustomNameChange} 
          placeholder="Enter custom name" 
          className="w-3/4 p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="flex justify-center mb-4">
        <button 
          onClick={handleFileUpload} 
          className="px-16 py-2 bg-yellow-700 text-white font-semibold rounded-md hover:bg-yellow-600 mt-8 transition duration-200"
        >
          Upload
        </button>
      </div>

      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      {successMessage && (
        <div className="text-green-500 text-center mb-4 mt-4">
          <p>{successMessage}</p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
