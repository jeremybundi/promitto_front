import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const ManageTestimonials = () => {
  const token = useSelector((state) => state.auth.token);
  const [testimonials, setTestimonials] = useState([]);
  const [message, setMessage] = useState("");
    const navigate = useNavigate();

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await axios.get("https://api4.promittoltd.com/testimonials");
      setTestimonials(response.data);
    } catch (error) {
      setMessage("Failed to fetch testimonials.");
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (!token) {
      setMessage("Authentication token missing.");
      return;
    }

    try {
      await axios.delete(`https://api4.promittoltd.com/testimonials/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Testimonial deleted successfully.");
      setTestimonials(testimonials.filter((t) => t.id !== id));
    } catch (error) {
      setMessage("Error deleting testimonial.");
      console.error(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
          <div className='flex'>
      <h2 className="text-xl font-semibold font-poppins text-yellow-500 mb-4">Manage Testimonials</h2>
      <button
          onClick={() => navigate("/admin")}
          className="bg-yellow-700 hover:bg-yelow-600 font-poppins text-white md:px-4 px-2 md:py-2 ml-auto mb-1 rounded-lg shadow-md"
        >
          Dashboard
        </button>
        </div> 
      {message && <p className="text-red-500">{message}</p>}
      <ul className="space-y-4">
        {testimonials.map((t) => (
          <li key={t.id} className="p-4 border rounded flex justify-between items-center">
            <div>
              <p className="font-bold">{t.name} - {t.role}</p>
              <p className="text-sm">Rating: {t.rating}</p>
              <p className="text-gray-600">{t.description}</p>
            </div>
            <button
              onClick={() => handleDelete(t.id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageTestimonials;
