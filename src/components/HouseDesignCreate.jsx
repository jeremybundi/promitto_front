import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux"; // Import the useSelector hook

const HouseDesignCreate = () => {
  const [name, setName] = useState("");
  const [features, setFeatures] = useState("");
  const [designs, setDesigns] = useState([{ name: "", features: "", images: [] }]);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Get the token from the Redux store
  const token = useSelector((state) => state.auth.token);

  const handleAddDesign = () => {
    setDesigns([...designs, { name: "", features: "", images: [] }]);
  };

  const handleRemoveDesign = (index) => {
    const newDesigns = [...designs];
    newDesigns.splice(index, 1);
    setDesigns(newDesigns);
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const newDesigns = [...designs];
    newDesigns[index][name] = value;
    setDesigns(newDesigns);
  };

  const handleFileChange = (e, index) => {
    const newFiles = [...files];
    newFiles[index] = e.target.files;
    setFiles(newFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("designs", JSON.stringify(designs));

    // Append each file to FormData
    files.forEach((fileSet, index) => {
      Array.from(fileSet).forEach((file) => {
        formData.append(`designs[${index}][images][]`, file);
      });
    });

    try {
      const response = await axios.post(
        "https://api4.promittoltd.com/house-designs", // Update with the correct API URL
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // Use the token from Redux store
          },
        }
      );
      if (response.data.success) {
        // Handle success (e.g., redirect or show success message)
        alert("House designs created successfully");
        console.log(response.data.success);
      } else {
        setError(response.data.error || "An error occurred.");
      }
    } catch (error) {
      setError("An error occurred while creating the house designs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create House Design</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* House Type Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            House Type Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Design Sections */}
        {designs.map((design, index) => (
          <div key={index} className="border p-4 rounded-lg space-y-4">
            <div>
              <label htmlFor={`design-name-${index}`} className="block text-sm font-medium text-gray-700">
                Design Name
              </label>
              <input
                id={`design-name-${index}`}
                type="text"
                name="name"
                value={design.name}
                onChange={(e) => handleInputChange(e, index)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor={`design-features-${index}`} className="block text-sm font-medium text-gray-700">
                Features
              </label>
              <textarea
                id={`design-features-${index}`}
                name="features"
                value={design.features}
                onChange={(e) => handleInputChange(e, index)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Images */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Images</label>
              <input
                type="file"
                onChange={(e) => handleFileChange(e, index)}
                multiple
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Remove Design Button */}
            <button
              type="button"
              onClick={() => handleRemoveDesign(index)}
              className="mt-2 text-red-500 hover:text-red-700"
            >
              Remove Design
            </button>
          </div>
        ))}

        {/* Add Design Button */}
        <div>
          <button
            type="button"
            onClick={handleAddDesign}
            className="mt-2 px-4 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
          >
            Add Another Design
          </button>
        </div>

        {/* Error and Submit Button */}
        {error && <p className="text-red-500">{error}</p>}
        <div>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create House Designs"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default HouseDesignCreate;
