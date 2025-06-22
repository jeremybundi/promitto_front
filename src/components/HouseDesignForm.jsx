import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

export default function HouseDesignForm() {
  const [name, setName] = useState("");
  const [designs, setDesigns] = useState([{ name: "", features: "", images: [] }]);
  const token = useSelector((state) => state.auth.token); // Get token from Redux

  const handleDesignChange = (index, key, value) => {
    const newDesigns = [...designs];
    newDesigns[index][key] = value;
    setDesigns(newDesigns);
  };

  const handleImageChange = (index, event) => {
    const files = Array.from(event.target.files);
    setDesigns((prevDesigns) =>
      prevDesigns.map((design, i) =>
        i === index ? { ...design, images: [...design.images, ...files] } : design
      )
    );
  };

  const removeImage = (designIndex, imgIndex) => {
    setDesigns((prevDesigns) =>
      prevDesigns.map((design, i) =>
        i === designIndex
          ? { ...design, images: design.images.filter((_, j) => j !== imgIndex) }
          : design
      )
    );
  };

  const addDesign = () => {
    setDesigns([...designs, { name: "", features: "", images: [] }]);
  };

  const removeDesign = (index) => {
    setDesigns(designs.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);

    designs.forEach((design, index) => {
      formData.append(`designs[${index}][name]`, design.name);
      formData.append(`designs[${index}][features]`, design.features);

      design.images.forEach((file, imgIndex) => {
        formData.append(`designs[${index}][images][${imgIndex}]`, file, file.name);
      });
    });

    try {
      const response = await axios.post("https://api4.promittoltd.com/house-designs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Success:", response.data);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="House Type Name"
        className="border p-2 w-full"
        required
      />

      {designs.map((design, index) => (
        <div key={index} className="border p-4">
          <input
            type="text"
            value={design.name}
            onChange={(e) => handleDesignChange(index, "name", e.target.value)}
            placeholder="Design Name"
            className="border p-2 w-full"
            required
          />
          <input
            type="text"
            value={design.features}
            onChange={(e) => handleDesignChange(index, "features", e.target.value)}
            placeholder="Features (comma separated)"
            className="border p-2 w-full"
            required
          />
          <input type="file" multiple onChange={(e) => handleImageChange(index, e)} className="border p-2 w-full" />

          {design.images.length > 0 && (
            <div className="mt-2">
              {design.images.map((img, imgIndex) => (
                <div key={imgIndex} className="flex items-center space-x-2">
                  <span className="text-sm">{img.name}</span>
                  <button type="button" onClick={() => removeImage(index, imgIndex)} className="text-red-500">
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}

          <button type="button" onClick={() => removeDesign(index)} className="bg-red-500 text-white px-4 py-2 mt-2">
            Remove Design
          </button>
        </div>
      ))}

      <button type="button" onClick={addDesign} className="bg-blue-500 text-white px-4 py-2">
        Add Design
      </button>

      <button type="submit" className="bg-green-500 text-white px-4 py-2">
        Submit
      </button>
    </form>
    </div>
  );
}
