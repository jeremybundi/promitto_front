import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "https://api4.promittoltd.com/choose-us";

const ManageWhyChooseUs = () => {
  const token = useSelector((state) => state.auth.token);
  const [entries, setEntries] = useState([]);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(null); // Track which entry is being deleted
  const [message, setMessage] = useState(""); // Success/Error message
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await axios.get(API_URL);
        setDescription(response.data.description || ""); 
        setEntries(Array.isArray(response.data.entries) ? response.data.entries : []);
      } catch (error) {
        console.error("Error fetching entries", error);
      }
    };
    fetchEntries();
  }, []);

  const handleDelete = async (id) => {
    setLoading(id);
    setMessage(""); // Clear previous messages

    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setEntries((prevEntries) => prevEntries.filter((entry) => entry.id !== id));
      setMessage("Entry deleted successfully.");
    } catch (error) {
      console.error("Error deleting entry", error);
      setMessage("Failed to delete the entry. Please try again.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white mb-20 shadow-lg rounded-lg">
      <div className="flex">
        <h2 className="text-2xl font-semibold font-poppins text-yellow-500 mb-4">
          Manage Why Choose Us
        </h2>
        <button
          onClick={() => navigate("/admin")}
          className="bg-yellow-700 hover:bg-yellow-600 font-poppins text-white md:px-4 px-2 md:py-2 ml-auto mb-1 rounded-lg shadow-md"
        >
          Dashboard
        </button>
      </div>

      {message && (
        <p className={`mb-4 p-2 rounded ${message.includes("Failed") ? "bg-red-200 text-red-700" : "bg-green-200 text-green-700"}`}>
          {message}
        </p>
      )}

      {description && <p className="italic text-gray-600 mb-4">{description}</p>}

      {entries.length > 0 ? (
        entries.map((entry) => (
          <div key={entry.id} className="border-b p-4 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold">{entry.title}</h3>
              <p>{entry.explanation}</p>
            </div>
            {token && (
              <button
                onClick={() => handleDelete(entry.id)}
                disabled={loading === entry.id}
                className={`px-4 py-2 rounded text-white ${
                  loading === entry.id ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"
                }`}
              >
                {loading === entry.id ? "Deleting..." : "Delete"}
              </button>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-500">No entries available.</p>
      )}
    </div>
  );
};

export default ManageWhyChooseUs;
