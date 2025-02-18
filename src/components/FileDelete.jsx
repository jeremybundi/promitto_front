import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const FileDelete = () => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  

  // Get the token from the Redux store
  const token = useSelector((state) => state.auth.token);

  // Fetch files from the API when the component mounts
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get("https://api4.promittoltd.com/list-pdfs");
        setFiles(response.data);
      } catch (error) {
        setError("An error occurred while fetching the files.");
      }
    };

    fetchFiles();
  }, []);

  // Handle file delete
  const handleDelete = async (fileName) => {
    try {
      const response = await axios.delete(
        `https://api4.promittoltd.com/pdf/delete/${fileName}`, 
        {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        }
      );

      setSuccessMessage(response.data.success);
      console.log(response.data.success)
      setError("");
      // Remove the deleted file from the state
      setFiles(files.filter((file) => file.file_name !== fileName));
    } catch (error) {
      setError(error.response?.data?.error || "An error occurred during file deletion.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="flex justify-center items-cente min-h-[70vh] px-4">
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
      <span className="flex mb-6 mx-6">
        <h2 className="text-2xl font-semibold font-poppins mt-2 text-yellow-500 mb-4">Manage Files</h2>
      <button
          onClick={() => navigate("/admin")}
          className="bg-yellow-700 hover:bg-yelow-600 font-poppins text-white md:px-4 px-2 md:py-2 ml-auto mb-4 rounded-lg shadow-md"
        >
          Dashboard
        </button>

        </span>        {/* Display success or error messages */}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

        <table className="min-w-full rounded table-auto mt-4">
          <thead>
            <tr className="bg-slate-100">
              <th className="border text-left px-4 py-2">Custom Name</th>
              <th className="border text-left px-4 py-2">File Name</th>
              <th className="border text-left px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {files.length > 0 ? (
              files.map((file) => (
                <tr key={file.id}>
                  <td className="border text-gray-600 text-sm px-4 py-1">{file.custom_name}</td>
                  <td className="border text-gray-600 text-sm px-4 py-1">{file.file_name}</td>
                  <td className="border px-4 py-1">
                    <button
                      onClick={() => handleDelete(file.file_name)}
                      className="text-white bg-red-500 px-4 py-1 rounded-lg hover:bg-red-600 transition duration-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-4">No files found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FileDelete;
