import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { DownloadIcon } from "@heroicons/react/solid"; 

const HousesOngoingImages = ({ houseId }) => {
  const [house, setHouse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageCount, setImageCount] = useState(2);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const fetchHouseData = async () => {
      try {
        const response = await axios.get(
          `https://api4.promittoltd.com/house-ongoing/images/${houseId}`
        );
        setHouse(response.data.data);
      } catch (err) {
        setError("Failed to load house data");
      } finally {
        setLoading(false);
      }
    };

    fetchHouseData();

    const handleResize = () => {
      if (window.matchMedia("(min-width: 768px)").matches) {
        setImageCount(3);
      } else {
        setImageCount(2);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [houseId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!house) return <div>No house data found.</div>;

  const handleImageClick = (index) => setCurrentImageIndex(index);

  const handleSeeMoreClick = () => {
    if (startIndex + imageCount < house.images.length) {
      setStartIndex(startIndex + imageCount);
    }
  };

  const downloadImage = async (url) => {
    try {
      // Fetch the image as a blob
      const response = await fetch(url);
      const blob = await response.blob();
  
      // Create an object URL for the blob
      const blobUrl = URL.createObjectURL(blob);
  
      // Create a temporary link to trigger the download
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `image-${currentImageIndex + 1}.jpg`; 
      document.body.appendChild(link);
      link.click();
  
      // Cleanup
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl); // Free up memory
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };
  

  const displayedImages = house.images.slice(startIndex, startIndex + imageCount);

  return (
    <div className="flex flex-col font-poppins bg-gray-100 items-center">
      <h2 className="md:text-2xl lg:text-3xl text-xl text-center mt-6 font-bold">
        {house.description}
      </h2>
      <p className="text-lg text-gray-600">
        <span className="text-yellow-500 font-semibold mr-4">Location:</span>
        {house.location}
      </p>

      <div className="mt-5 w-full max-w-4xl">
        {house.images && house.images.length > 0 ? (
          <>
            <div className="mb-4 flex justify-center relative">
              {/* Larger Image */}
              <img
                src={house.images[currentImageIndex]}
                alt={`House image ${currentImageIndex + 1}`}
                className="md:w-2/3 lg:w-[60%] w-[85%] md:h-96 lg:h-100 h-76 object-cover rounded-lg"
              />

              {/* Download Button */}
              <button
                onClick={() => downloadImage(house.images[currentImageIndex])}
                className="absolute top-4 md:right-36 right-12 lg:right-48 bg-white p-1 rounded-full shadow-md cursor-pointer hover:bg-yellow-500"
                title="Download Image"
              >
                <DownloadIcon className="h-6 w-6 text-gray-700 hover:text-white" />
              </button>
            </div>

            <div className="flex items-center mb-8 space-x-4 overflow-x-auto justify-center">
              {startIndex > 0 && (
                <button
                  className="text-lg text-gray-600 font-bold cursor-pointer px-2"
                  onClick={() => setStartIndex(Math.max(startIndex - imageCount, 0))}
                >
                  {"<"}
                </button>
              )}
              {displayedImages.map((image, index) => (
                <img
                  key={startIndex + index}
                  src={image}
                  alt={`House image ${startIndex + index + 1}`}
                  className={`md:w-32 md:h-32 lg:w-36 lg:h-36 h-24 w-24 object-cover rounded-lg cursor-pointer ${
                    startIndex + index === currentImageIndex
                      ? "border-4 border-yellow-500"
                      : ""
                  }`}
                  onClick={() => handleImageClick(startIndex + index)}
                />
              ))}
              {startIndex + imageCount < house.images.length && (
                <div
                  className="relative md:w-32 md:h-32 lg:w-36 lg:h-36 h-24 w-24 cursor-pointer"
                  onClick={handleSeeMoreClick}
                >
                  <img
                    src={house.images[startIndex + imageCount] || house.images[0]}
                    alt="See More"
                    className="object-cover rounded-lg w-full h-full blur-sm brightness-75"
                  />
                  <span className="absolute inset-0 flex items-center justify-center text-yellow-500 font-medium font-poppins text-xs md:text-lg lg:text-xl">
                    see more
                  </span>
                </div>
              )}
            </div>
          </>
        ) : (
          <p>No images available.</p>
        )}
      </div>
    </div>
  );
};

export default function Page() {
  const { id } = useParams();
  return <HousesOngoingImages houseId={id} />;
}
