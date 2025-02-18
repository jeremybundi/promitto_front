import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { FaTrash, FaSpinner } from "react-icons/fa";

const EditHouseDesigns = () => {
  const [houseDesigns, setHouseDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(null);
  const [deletedMessage, setDeletedMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [houseIdToDelete, setHouseIdToDelete] = useState(null); // Store the houseId to delete
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    fetchHouseDesigns();
  }, []);

  const fetchHouseDesigns = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://api4.promittoltd.com/house-designs");
      setHouseDesigns(response.data.data);
    } catch (err) {
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteHouseType = async () => {
    setDeleting(houseIdToDelete);
    setDeletedMessage(""); // Clear any previous message
    try {
      await axios.delete(`https://api4.promittoltd.com/house-designs/${houseIdToDelete}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchHouseDesigns();
      setDeletedMessage("House type has been deleted successfully.");
    } catch (error) {
      setError("Error deleting house type");
    } finally {
      setDeleting(null);
      setIsModalOpen(false); // Close the modal after deletion
    }
  };

  const openDeleteModal = (houseId) => {
    setHouseIdToDelete(houseId);
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 bg-white mb-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-yellow-500">Manage House Designs</h2>
        <button
          onClick={() => navigate("/admin")}
          className="bg-yellow-700 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg shadow-md"
        >
          Dashboard
        </button>
      </div>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {deletedMessage && <p className="text-green-500">{deletedMessage}</p>}

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 border-collapse">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="border border-gray-300 px-4 py-2 w-1/12">#</th>
              <th className="border border-gray-300 px-4 py-2 w-1/5">House Type</th>
              <th className="border border-gray-300 text-left px-4 py-2 w-1/5">Design Name</th>
              <th className="border border-gray-300 px-4 py-2 w-1/5">Image</th>
              <th className="border border-gray-300 px-4 py-2 w-1/5">Cost</th>
              <th className="border border-gray-300 px-4 py-2 w-1/6">Delete</th>
            </tr>
          </thead>
          <tbody>
            {houseDesigns.map((house, houseIndex) => {
              const designsCount = house.designs.length || 1;
              return (
                <React.Fragment key={house.id}>
                  {house.designs.length > 0 ? (
                    house.designs.map((design, index) => (
                      <tr key={design.id} className="border border-gray-300">
                        {index === 0 && (
                          <>
                            <td rowSpan={designsCount} className="border border-gray-300 px-4 py-2 text-center bg-gray-100 font-semibold">
                              {houseIndex + 1}
                            </td>
                            <td rowSpan={designsCount} className="border border-gray-300 px-4 py-2 text-center bg-gray-100 font-semibold">
                              {house.name}
                            </td>
                          </>
                        )}
                        <td className="border border-gray-300 px-4 py-2">{design.name}</td>
                        <td className="px-4 py-2 flex justify-center">
                          <img src={design.images[0]} alt={design.name} className="w-16 h-12 rounded-md object-cover border" />
                        </td>
                        <td className="border border-gray-300 px-4 py-2">{design.cost}</td>
                        {index === 0 && (
                          <td rowSpan={designsCount} className="border border-gray-300 px-4 py-2 justify-center items-center text-center">
                            <button
                              onClick={() => openDeleteModal(house.id)}
                              className="flex items-center justify-center bg-red-500 hover:bg-red-400 text-white px-3 py-1.5 rounded shadow"
                              disabled={deleting === house.id}
                            >
                              {deleting === house.id ? (
                                <>
                                  <FaSpinner className="animate-spin mr-2" />
                                  Deleting...
                                </>
                              ) : (
                                <>
                                  <FaTrash className="mr-2" />
                                  Delete
                                </>
                              )}
                            </button>
                          </td>
                        )}
                      </tr>
                    ))
                  ) : (
                    <tr className="border border-gray-300">
                      <td className="border border-gray-300 px-4 py-2 text-center bg-gray-100 font-semibold">{houseIndex + 1}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center bg-gray-100 font-semibold">{house.name}</td>
                      <td colSpan="3" className="border border-gray-300 px-4 py-2 text-center text-gray-500">
                        No designs available
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        <button
                          onClick={() => openDeleteModal(house.id)}
                          className="flex items-center justify-center bg-red-500 hover:bg-red-400 text-white px-3 py-1.5 rounded shadow"
                          disabled={deleting === house.id}
                        >
                          {deleting === house.id ? (
                            <>
                              <FaSpinner className="animate-spin mr-2" />
                              Deleting...
                            </>
                          ) : (
                            <>
                              <FaTrash className="mr-2" />
                              Delete
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-700">Confirm Deletion</h3>
            <p className="mt-2 text-gray-600">Are you sure you want to delete this house type and all its designs?</p>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                onClick={handleDeleteHouseType}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
                disabled={deleting}
              >
                {deleting ? <FaSpinner className="animate-spin mr-2" /> : "Yes, Delete"}
              </button>
              <button
                onClick={closeDeleteModal}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditHouseDesigns;
