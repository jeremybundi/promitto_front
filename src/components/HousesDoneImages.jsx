import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


const HousesDoneImages = ({ houseId }) => {
  const [house, setHouse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchHouseData = async () => {
      try {
        const response = await axios.get(`https://api4.promittoltd.com/houses/done/${houseId}`);
        setHouse(response.data);
      } catch (err) {
        setError('Failed to load house data');
      } finally {
        setLoading(false);
      }
    };

    fetchHouseData();
  }, [houseId]);

  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!house) return <div>No house data found.</div>;

  const handleImageClick = (index) => setCurrentImageIndex(index);

  return (
    <div className="flex flex-col font-poppins bg-gray-200 items-center">
      <h2 className="md:text-xl lg:text-2xl text-lg text-center mt-6 text-yellow-600 font-bold">{house.title}</h2>

      {/* Two-column layout */}
      <div className="mt-5 w-full ml-4 md:ml-0 lg:ml-0 max-w-6xl grid md:grid-cols-2 gap-6">

         {/* Right Column: Images */}
         <div>
          {/* Larger main image */}
          <div className="mb-4 ">
            <img
              src={house.images[currentImageIndex]}
              alt={`House image ${currentImageIndex + 1}`}
              className="md:w-[85%] md:h-[500px] lg:w-[90%] lg:h-[550px] w-[95%] h-[400px] object-cover rounded-lg"
            />
            
          </div>
           {/* Vertical smaller images */}
           <div className="flex space-x-2 overflow-x-auto pr-2">
            {house.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`House image ${index + 1}`}
                className={`object-cover md:w-36 md:h-36 lg:w-40 lg:h-40 h-24 w-24 mb-4  rounded-lg cursor-pointer ${
                  index === currentImageIndex ? 'border-4 border-yellow-500' : ''
                }`}
                onClick={() => handleImageClick(index)}
              />
            ))}
          </div>
        </div>


        {/* Left Column: Details */}
        <div className="space-y-4 mb-4 p-4 ">
          <p className="text-sm  md:text-lg lg:text-lg text-gray-600">
            <span className="text-yellow-700 font-semibold mr-4">More information: </span>{house.info}
          </p>
          <ul className="text-gray-600  md:text-lg lg:text-lg text-sm">
            <li><span className='text-yellow-700 font-semibold mr-4'>Size:</span> {house.size} Sqft</li>
            <li><span className='text-yellow-700 font-semibold mr-4'>Type: </span>  {house.type}</li>
            <li><span className='text-yellow-700 font-semibold mr-4'> Bedrooms:</span>  {house.bedrooms}</li>
            <li> <span className='text-yellow-700 font-semibold mr-4'>Price: </span>Ksh. {house.price}/= only, <span className='font-semibold'>Per Month For 7 Years</span></li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default function Page() {
  const { id } = useParams();
  return <HousesDoneImages houseId={id} />;
}
