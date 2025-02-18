import { useState, useEffect } from "react";
import axios from "axios";

const HouseDesignFeatures = () => {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImages, setSelectedImages] = useState({});

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const response = await axios.get("https://api4.promittoltd.com/house-designs");
        if (response.data.success) {
          setHouses(response.data.data);

          const initialImages = {};
          response.data.data.forEach((house) => {
            house.designs.forEach((design) => {
              initialImages[design.id] = design.images[0];
            });
          });
          setSelectedImages(initialImages);
        }
      } catch (err) {
        setError("Failed to fetch house designs");
      } finally {
        setLoading(false);
      }
    };

    fetchHouses();
  }, []);

  const handleImageClick = (designId, newImage) => {
    setSelectedImages((prev) => ({ ...prev, [designId]: newImage }));
  };

  return (
    <div className="mx-8 p-6 font-poppins">
      <h1 className="text-4xl font-medium text-center text-yellow-400 mb-8">House Designs</h1>

      {loading && <p className="text-blue-600">Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {houses.length > 0 && (
        <div>
          {houses.map((house, houseIndex) => (
            <div key={house.id} className="border p-6 px-20 rounded-xl shadow-lg mb-8 bg-white">
              <h2 className="text-3xl font-semibold text-[#010440] mb- pt-12">
                {`${String(houseIndex + 1).padStart(2, "0")}. ${house.name}`}
              </h2>

              {house.designs.map((design, designIndex) => (
                <div
                  key={design.id}
                  className={`flex flex-col md:flex-row gap-8 items-start py-6 rounded-lg ${
                    designIndex % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Design Details */}
                  <div className="md:w-1/2 mt-8">
                    <h3 className="text-2xl font-medium text-yellow-500 mb-4">{design.name}</h3>
                    <div className="flex flex-col">
                      <span className="font-semibold text-lg">Cost</span>
                      <p className="text-gray-500 text-sm mt-2 mb-3">{design.cost}</p>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-lg">Features</span>
                      <p className="text-gray-500 text-sm mt-2 pr-16">{design.features}</p>
                    </div>
                  </div>

                  {/* Images */}
                  <div className="md:w-1/2">
                    <img
                      src={selectedImages[design.id]}
                      alt="Main House Design"
                      className="w-full h-64 object-cover rounded-2xl shadow-lg mb-4"
                    />

                    {/* Thumbnails */}
                    <div className="grid grid-cols-4 gap-0">
                      {design.images.map((image, idx) => (
                        <img
                          key={idx}
                          src={image}
                          alt="House Design Thumbnail"
                          className="w-4/5 h-16 object-cover rounded-md cursor-pointer hover:opacity-80 transition"
                          onClick={() => handleImageClick(design.id, image)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              {/* ✅ Add Note Below the Last Design of the First Column */}
              {house.designs.length > 0 && (
                <div className="md:w-1/2 mt-6">
                  <span>
                    <h1 className="text-red-500 text-lg font-bold">*Note*</h1>
                    <p className="font-medium text-sm mb-8 ">
                      Excavation shall not be beyond 2 feet of black cotton and the gradient is flat or slightly slanting. 
                      Anything beyond a standard design, a tailored BQ will be prepared.
                    </p>
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HouseDesignFeatures;
