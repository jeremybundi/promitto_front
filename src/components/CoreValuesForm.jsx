import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


const CoreValuesForm = () => {
  const token = useSelector((state) => state.auth.token);
  const [description, setDescription] = useState("");
  const [coreValues, setCoreValues] = useState([{ title: "", explanation: "", position: 1 }]);
  const [message, setMessage] = useState("");
    const navigate = useNavigate();
  

  const handleChange = (index, field, value) => {
    const updatedCoreValues = [...coreValues];
    updatedCoreValues[index][field] = value;
    setCoreValues(updatedCoreValues);
  };

  const addCoreValue = () => {
    setCoreValues([...coreValues, { title: "", explanation: "", position: coreValues.length + 1 }]);
  };

  const removeCoreValue = (index) => {
    const updatedCoreValues = coreValues.filter((_, i) => i !== index);
    setCoreValues(updatedCoreValues);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setMessage("Authentication required");
      return;
    }

    try {
      const response = await axios.post(
        "https://api4.promittoltd.com/core-values",
        { description, core_values: coreValues },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage(response.data.message || "Core Values Created Successfully!");
      setDescription("");
      setCoreValues([{ title: "", explanation: "", position: 1 }]);
    } catch (error) {
      setMessage(error.response?.data?.error || "Failed to create core values");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
  <div className="flex mt-8 mb-6">
        <h2 className="text-xl font-semibold font-poppins text-yellow-500 mb-4">Create Core Values</h2>
        <button
          onClick={() => navigate("/admin")}
          className="bg-yellow-700 hover:bg-yellow-600 font-poppins text-white md:px-4 px-2 md:py-2 ml-auto mb-1 rounded-lg shadow-md"
        >
          Dashboard
        </button>
      </div>      {message && <p className="mb-4 text-green-600">{message}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
            required
          ></textarea>
        </div>

        {coreValues.map((coreValue, index) => (
          <div key={index} className="mb-4 p-4 border rounded">
            <label className="block text-gray-700 font-medium">Core Value Title</label>
            <input
              type="text"
              value={coreValue.title}
              onChange={(e) => handleChange(index, "title", e.target.value)}
              className="w-full p-2 border rounded"
              required
            />

            <label className="block text-gray-700 font-medium mt-2">Explanation</label>
            <textarea
              value={coreValue.explanation}
              onChange={(e) => handleChange(index, "explanation", e.target.value)}
              className="w-full p-2 border rounded"
              required
            ></textarea>

            {index > 0 && (
              <button
                type="button"
                onClick={() => removeCoreValue(index)}
                className="mt-2 bg-red-500 text-white px-3 py-1 rounded"
              >
                Remove
              </button>
            )}
          </div>
        ))}

        <button type="button" onClick={addCoreValue} className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Core Value
        </button>

        <button type="submit" className="ml-4 bg-green-500 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CoreValuesForm;
