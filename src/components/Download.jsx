import React, { useState, useEffect } from "react";
import axios from "axios";

const FileDownload = () => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");

  // Fetch files from the API when the component mounts
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get("https://api4.promittoltd.com/list-pdfs");
        setFiles(response.data);
        console.log(response.data)
      } catch (error) {
        setError("An error occurred while fetching the files.");
      }
    };

    fetchFiles();
  }, []);

  // Handle file download by file name
  const handleDownload = (fileName) => {
    // Construct the download URL
    const downloadUrl = `https://api4.promittoltd.com/download/${fileName}`;
    // Trigger download by opening the URL in a new window
    window.open(downloadUrl, "_blank");
  };

  return (
    <div className="mx-[30%] p-6 mb-20  bg-white mt-10">
      <h2 className="text-3xl font-semibold text-center mb-4">
        Document Download (Bronchures)
      </h2>
      <p className="text-red-500 italic text-center text-sm mb-3">**Download the  document by clicking the link.**</p>

      {/* Display error message if any */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* List of files with custom names in two columns for md screens */}
      <ul className="list-disc list-inside md:grid md:grid-cols-2 md:gap- pl-8">
        {files.length > 0 ? (
          files.map((file) => (
            <li
              key={file.id}
              className="py-1  cursor-pointer "
              onClick={() => handleDownload(file.file_name)} // Trigger download on custom name click
            >
              <span className="text-lg text-yellow-600 underline italic font-semibold">{file.custom_name}</span>
            </li>
          ))
        ) : (
          <li>No files available.</li>
        )}
      </ul>
    </div>
  );
};

export default FileDownload;
