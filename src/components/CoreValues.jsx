import { useState, useEffect } from "react";
import axios from "axios";

const CoreValues = () => {
  const [coreValues, setCoreValues] = useState([]);
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch core values from the API
    const fetchCoreValues = async () => {
      try {
        const response = await axios.get("https://api4.promittoltd.com/core-values");
        setDescription(response.data.description);
        setCoreValues(response.data.core_values);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching core values:", error);
        setIsLoading(false);
      }
    };
    fetchCoreValues();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="md:block hidden">
        <h1 className="text-yellow-500 text-center md:mt-12 mt-4 font-lufga text-lg md:text-4xl font-lugha font-medium md:mb-6" data-aos="fade-down">
          Our Core Values
        </h1>
        <p className="text-center md:mx-60 font-poppins text-gray-600 md:px-24 md:text-xl text-lg">
          {description}
        </p>
      </div>
      <div className="container md:block hidden md:mx-auto md:px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {coreValues.map((value, index) => (
            <div className="md:p-6 flex" key={value.position}>
              <div className="md:text-4xl text-xl font-medium font-manrope mr-2 text-yellow-500">
                {value.position.padStart(2, "0")}.
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-lufga font-semibold">{value.title}</h3>
                <p className="md:mt-1 text-sm md:text-lg text-gray-500">{value.explanation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoreValues;
