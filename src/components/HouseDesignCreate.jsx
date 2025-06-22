import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux"; // Import the useSelector hook
import { useNavigate } from "react-router-dom";



const HouseDesignCreate = () => {
  const [houseType, setHouseType] = useState("");
  const [designs, setDesigns] = useState([{ name: "", cost: "", features: "", images: [] }]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
    const navigate = useNavigate();
  

  // Get the token from the Redux store
  const token = useSelector((state) => state.auth.token);

  const handleHouseTypeChange = (e) => {
    setHouseType(e.target.value);
  };

  const handleDesignChange = (index, field, value) => {
    const updatedDesigns = [...designs];
    updatedDesigns[index][field] = value;
    setDesigns(updatedDesigns);
  };

  const handleFileChange = (index, event) => {
    const files = event.target.files;
    const updatedDesigns = [...designs];
    updatedDesigns[index].images = files;
    setDesigns(updatedDesigns);
  };

  const addDesign = () => {
    setDesigns([...designs, { name: "", cost: "", features: "", images: [] }]);
  };

  const removeDesign = (index) => {
    const updatedDesigns = designs.filter((_, i) => i !== index);
    setDesigns(updatedDesigns);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("name", houseType);
    
    designs.forEach((design, index) => {
      formData.append(`designs[${index}][name]`, design.name);
      formData.append(`designs[${index}][cost]`, design.cost);
      formData.append(`designs[${index}][features]`, JSON.stringify(design.features.split(",")));
      
      Array.from(design.images).forEach((file, fileIndex) => {
        formData.append(`designs[${index}][images][${fileIndex}]`, file);
      });
    });

    try {
      const response = await axios.post(
        "https://api4.promittoltd.com/house-designs", 
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // Use the token from Redux store
          },
        }
      );
      console.log("Success:", response.data);
        // Reset the form state after successful submission
        setHouseType("");
        setDesigns([{ name: "", cost: "", features: "", images: [] }]);

    } catch (error) {
      setError("Error submitting data");
      console.error("Error submitting data:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4  px-8  space-y-4 max-w-2xl mx-auto bg-white rounded shadow-md">
           <span className="flex mb-6 mx-6">
        <h2 className="text-2xl font-semibold font-poppins my-4 mb- text-yellow-500 mb-4">Add House Designs </h2>
      <button
          onClick={() => navigate("/admin")}
          className="bg-yellow-700 hover:bg-yelow-600 font-poppins text-white md:px-4 px-2 md:py-2 ml-auto mb-4 rounded-lg shadow-md"
        >
          Dashboard
        </button>

        </span> 
      <label className="block">
        House Type Name:
        <input
          type="text"
          value={houseType}
          onChange={handleHouseTypeChange}
          className="block w-full p-2 border rounded"
          required
        />
      </label>
      
      {designs.map((design, index) => (
        <div key={index} className="p-4 border rounded">
          <label className="block">
            Design Name:
            <input
              type="text"
              value={design.name}
              onChange={(e) => handleDesignChange(index, "name", e.target.value)}
              className="block w-full p-2 border rounded"
              required
            />
          </label>
          <label className="block">
            Cost:
            <input
              type="text"
              value={design.cost}
              onChange={(e) => handleDesignChange(index, "cost", e.target.value)}
              className="block w-full p-2 border rounded"
              required
            />
          </label>
          <label className="block">
            Features:
            <textarea
              value={design.features}
              onChange={(e) => handleDesignChange(index, "features", e.target.value)}
              className="block w-full p-2 border rounded"
              rows="4"
              required
            ></textarea>
          </label>

          <label className="block">
            Upload Images:
            <input
              type="file"
              multiple
              onChange={(e) => handleFileChange(index, e)}
              className="block w-full p-2 border rounded"
            />
          </label>
          <button
            type="button"
            onClick={() => removeDesign(index)}
            className="mt-2 text-red-500"
          >
            Remove Design
          </button>
        </div>
      ))}
      <div className="flex justify-between">
      <button
        type="button"
        onClick={addDesign}
        className="p-2 bg-blue-500 text-white rounded"
      >
        Add Another Design
      </button>
      
      <button
        type="submit"
        className="p-2 bg-green-500 text-white rounded"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
      </div>
     

      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};

export default HouseDesignCreate;
