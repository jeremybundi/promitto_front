import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const AddTestimonials = () => {
  const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    rating: "",
    description: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      setMessage("Authentication token missing.");
      return;
    }

    try {
      const response = await axios.post(
        "https://api4.promittoltd.com/testimonials",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setMessage(response.data.message || "Testimonial added successfully!");
      setFormData({ name: "", role: "", rating: "", description: "" });
    } catch (error) {
      setMessage("Error adding testimonial.");
      console.error(error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 px-12 mb-16 bg-white shadow-lg rounded-lg">
  <div className='flex my-6'>
      <h2 className="text-xl font-semibold font-poppins text-yellow-500 mb-4">Add Testimonials</h2>
      <button
          onClick={() => navigate("/admin")}
          className="bg-yellow-700 hover:bg-yelow-600 font-poppins text-white md:px-4 px-2 md:py-2 ml-auto mb-1 rounded-lg shadow-md"
        >
          Dashboard
        </button>
        </div>       {message && <p className="text-red-500">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="role"
          placeholder="Role"
          value={formData.role}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="rating"
          placeholder="Rating (e.g., Excellent)"
          value={formData.rating}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-yellow-600 text-white py-2 rounded hover:bg-yellow-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddTestimonials;
