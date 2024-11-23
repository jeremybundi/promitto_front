import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"; 

const DeleteHousesDone = () => {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Retrieve the token from Redux store
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    // Fetch data from API
    const fetchHouses = async () => {
      try {
        const response = await axios.get("https://api3.promittoltd.com/houses/done");
        setHouses(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch houses data. Please try again later.");
        setLoading(false);
      }
    };

    fetchHouses();
  }, []);

  const handleDelete = async (id) => {
    try {
      // Call delete endpoint with Authorization header
      await axios.delete(`https://api3.promittoltd.com/houses/done/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      // Remove the deleted house from the state
      setHouses((prevHouses) => prevHouses.filter((house) => house.id !== id));
    } catch (err) {
      console.log("Failed to delete the house. Please try again later.");
    }
  };

  if (loading) {
    return <div className="text-center text-lg">Loading houses...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }
  return (
    <div className="container mx-auto p-4">
        <div className="flex">
      <h1 className="text-xl text-yellow-500 font-bold mb-4">Houses Done</h1>
      <button
          onClick={() => navigate("/admin")}
          className="bg-yellow-700 hover:bg-yelow-600 text-white px-4 py-2 ml-auto mb-1 rounded-lg shadow-md"
        >
          Go to Dashboard
        </button>
        </div>
      <div className="space-y-6">
        {houses.map((house) => (
          <div
            key={house.id}
            className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center bg-white shadow-md border-t rounded-lg p-4"
          >
            {/* Image and Description */}
            <div className="md:ml-6">
            <h2 className="text-sm font-semibold mb-1 text-gray-800">
                {house.description}
              </h2>
              <img
                src={house.image_url}
                alt={house.description}
                className="w-full h-32 object-cover rounded-lg shadow-sm mb-2"
              />
             
            </div>

            {/* Location, Size, and Bedrooms */}
            <div className="md:ml-12">
              <p className="block text-gray-600"><span className="font-semibold">Location: </span>{house.location}</p>
              <p className="block text-gray-600"><span className="font-semibold">Size:  </span>{house.size}</p>
              <p className="text-gray-600"><span className="font-semibold">Bedrooms: </span>{house.bedrooms}</p>
            </div>

            {/* Type, Price, and Created At */}
            <div className="md:ml-12">
              <p className="text-gray-600"><span className="font-semibold">Type: </span>{house.type}</p>
              <p className="text-gray-600"><span className="font-semibold mr-1">Price:</span>Ksh.{house.price}</p>
              <p className="text-gray-500 text-sm">
                <span className="font-semibold">Created At: </span>{new Date(house.created_at).toLocaleDateString()}
              </p>
            </div>

            {/* Delete Button */}
            <div className="flex  md:ml-8  items-center">
              <button
                onClick={() => handleDelete(house.id)}
                className="flex items-center gap-2 text-white bg-red-400 hover:bg-red-600 px-4 py-2 rounded-lg shadow-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 0a2 2 0 00-2 2v2h8V5a2 2 0 00-2-2m-4 0h4"
                  />
                </svg>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeleteHousesDone;
