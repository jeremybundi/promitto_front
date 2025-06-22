import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const API_URL = "https://api4.promittoltd.com/choose-us";

const CreateWhyChooseUs = () => {
  const token = useSelector((state) => state.auth.token);
  const [description, setDescription] = useState("");
  const [entries, setEntries] = useState([{ title: "", explanation: "" }]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleEntryChange = (index, e) => {
    const { name, value } = e.target;
    setEntries((prevEntries) =>
      prevEntries.map((entry, i) =>
        i === index ? { ...entry, [name]: value || "" } : entry
      )
    );
  };

  const addEntry = () => {
    setEntries([...entries, { title: "", explanation: "" }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Ensure entries is always an array and explanation is never missing
      const payload = {
        description,
        entries: entries.map((entry) => ({
          title: entry.title.trim(), 
          explanation: entry.explanation.trim() || "" // Ensure it's never undefined
        })),
      };

      console.log("Sending Payload:", payload); // Debugging log

      const response = await axios.post(API_URL, payload, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      });

      console.log("Response:", response.data); // Debugging log

      setMessage(response.data.message);
      setDescription("");
      setEntries([{ title: "", explanation: "" }]);
    } catch (error) {
      console.error("Error:", error.response?.data); // Debugging log
      setMessage(error.response?.data?.error || "Failed to create entry");
    }
  };

  return (
    <div className="p-6 px-12 mb-16 bg-white mx-auto max-w-2xl shadow-lg rounded-lg">
  <div className='flex my-6'>
        <h2 className="text-2xl font-semibold font-poppins text-yellow-500 mb-4">Create Why Choose Us</h2>
        <button
          onClick={() => navigate("/admin")}
          className="bg-yellow-700 hover:bg-yellow-600 font-poppins text-white md:px-4 px-2 md:py-2 ml-auto mb-1 rounded-lg shadow-md"
        >
          Dashboard
        </button>
      </div>      {message && <p className="text-red-500">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          name="description"
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Description (Only One Allowed)"
          className="w-full p-2 border rounded"
        />

        {entries.map((entry, index) => (
          <div key={index} className="space-y-2">
            <input
              type="text"
              name="title"
              value={entry.title}
              onChange={(e) => handleEntryChange(index, e)}
              placeholder="Title"
              className="w-full p-2 border rounded"
              required
            />
            <textarea
              name="explanation"
              value={entry.explanation}
              onChange={(e) => handleEntryChange(index, e)}
              placeholder="Explanation"
              className="w-full p-2 border rounded"
              required
            />
          </div>
        ))}
        <div className="justify-between flex">
        <button
          type="button"
          onClick={addEntry}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          Add More Fields
        </button>
        
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Submit
        </button>
        </div>
       
      </form>
    </div>
  );
};

export default CreateWhyChooseUs;
