import React, { useState, useEffect } from "react";
import axios from "axios";
import JosueImage from '../assets/images/josue.png';
import Web1 from '../assets/images/web1.png';
import MissionImage from '../assets/images/mission.png';
import visionSvg from '../assets/icons/vision.svg';


const AboutUs = () => {
    const [boardMembers, setBoardMembers] = useState([]);
    const [operationsTeam, setOperationsTeam] = useState([]);
    const [showAll, setShowAll] = useState(false);

    const handleShowMore = () => {
        setShowAll(true);
      };


    useEffect(() => {
        axios.get('https://api4.promittoltd.com/board-members')
          .then(response => {
            setBoardMembers(response.data);
            console.log(response.data); 
          })
          .catch(error => console.error('Error fetching board members:', error));
      }, []);
      

      useEffect(() => {
        const fetchOperationsTeam = async () => {
          try {
            const response = await axios.get('https://api4.promittoltd.com/staff');
            setOperationsTeam(response.data);
            setLoading(false);
          } catch (error) {
            console.error('Error fetching operations team:', error);
            setLoading(false);
          }
        };
    
        fetchOperationsTeam();
      }, []);
      



  return (
    <div className="max-w-8xl font-poppins mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* First Column */}
        <div className="bg-gray-50 md:px-12 px-3 md:pt-32 pt-3 border-t rounded-tr-lg rounded-bl-lg shadow-md">
          <h1 className="md:text-6xl text-2xl font-semibold font-lufga text-yellow-500 md:mb-8 mb-2">
            About Us
          </h1>
          <p className="text-gray-700 md:mb-12 mb-4 text-sm md:text-lg leading-relaxed">
            Promitto is a real estate company with a distinctive aim to boost
            and support individuals to achieve their dreams of homeownership
            through provision of affordable construction loans at competitive
            interest rates and provision of full construction services.
          </p>

          <div className="flex items-center space-x-2">

            <span className="bg-yellow-500 md:p-2 p-1 md:mb-14 mb-6 items-center text-sm md:text-lg font-medium flex  rounded-md">
            Enroll Now
            <svg
            width="17"
            height="17"
            viewBox="0 0 17 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            className="ml-1"
            >
            <rect width="17" height="17" fill="url(#pattern0_101_1417)" />
            <defs>
                <pattern
                id="pattern0_101_1417"
                patternContentUnits="objectBoundingBox"
                width="1"
                height="1"
                >
                <use
                    xlinkHref="#image0_101_1417"
                    transform="scale(0.01)"
                />
                </pattern>
                <image
                id="image0_101_1417"
                width="100"
                height="100"
                xlinkHref="data:image/png;base64,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"
                />
            </defs>
            </svg>
            
            </span>
            </div>
                
        </div>

        <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
            {/* Row 1, Column 1 */}
            <div className=" p-6 rounded-3xl border-t shadow-md">
            <span >
                <img src={visionSvg} alt="Vision Icon" className="md:w-16 md:h-16 w-10 h-10 md:mt-8 mt-3 md:mb-4 mb-3  rounded-full md:p-3 p-1 bg-yellow-400" />
                </span>
                <h2 className="md:text-lg text-sm text-yellow-500 fonf-lufga font-medium md:mb-4 mb-1">Our Vision</h2>
                <p className="text-gray-600 md:text-sm text-sm  md:mb-8 mb-5 leading-relaxed">
                To be your trusted partner to home ownership.
                </p>
            </div>
            {/* Row 1, Column 2 */}
            <div
              className="bg-blue-100 p-6 rounded-3xl shadow-md hidden md:block"
                style={{
                    backgroundImage: `url(${Web1})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '100%', 
                    width: '100%', 
                }}
                ></div>
            {/* Row 2, Column 1 */}
            <div
              className="bg-blue-100 p-6 rounded-3xl shadow-md hidden md:block"
              style={{
                    backgroundImage: `url(${JosueImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '100%', 
                    width: '100%', 
                }}
                ></div>
            {/* Row 2, Column 2 */}
            <div className="bg-yellow-400 p-6 rounded-3xl shadow-md">
        
                <span >
                    <img
                    src={MissionImage}
                    alt="Mission"
                    className="md:w-16 w-10 h-10 md:h-16 md:mt-10 mt-5 mb-4 object-contain bg-[#010440] md:p-3 p-2 rounded-full"
                    />
                </span>

                <h2 className="md:text-lg text-sm  fonf-lufga font-medium md:mb-2 mb-1">Our Mission</h2>
                <p className="text-gray-800 text-sm mb-7 leading-relaxed">
                Empower individuals to become home owners.
                </p>
            </div>
            </div>

      </div>
      <div className="shadow">
      {/* Main Title */}
      <p className="text-yellow-500 text-4xl mt-12 ml-2 font-semibold text-center pt-10">Our Team</p>
      
      {/* Description */}
      <p className="md:text-center text-left text-sm mt-2 px-4 md:px-40">
        At Promitto Ltd, our success is driven by our exceptional team of professionals. From our talented architects and designers who bring visionary concepts to life, to our dedicated project managers who ensure seamless execution, every member of our team plays a vital role in delivering exceptional results.
      </p>
      
      {/* Board Members Heading */}
      <h1 className="text-center mt-8 text-2xl font-semibold">Board Members</h1>

      {/* Board Members */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-5 gap-3">
  {boardMembers.map(member => (
    <div key={member.id} className="relative bg-white  overflow-hidden">
      {/* Image */}
    
      <img
        src={member.image_url}
        alt={member.name}
        className="w-full md:h-80 h-auto object-cover rounded-2xl" 
      />
  
      {/* Member Details */}
      <div className="absolute md:bottom-2 bottom-4 left-1/2 transform -translate-x-1/2 w-3/4 bg-white px-1 py-1 rounded-md z-10 text-center">
        <h2 className="text-sm text-yellow-500 font-semibold">{member.name}</h2>
        <p className=" text-sm font-medium">{member.role}</p>
        <a
          href="#"
          className="text-blue-500 text-xs underline mt-1 inline-block"
        >
          More about me
        </a>
      </div>
    </div>
  ))}
</div>
<div>
  <h1 className="text-center items-center mt-8 text-2xl font-semibold">Operations Team</h1>
  <div className="mt-6 grid grid-cols-1 md:grid-cols-6 gap-2 justify-between">
    {operationsTeam.slice(0, showAll || window.innerWidth >= 768 ? operationsTeam.length : 4).map((member) => (
      <div key={member.id} className="relative bg-white overflow-hidden">
        {/* Image */}
        <img
          src={member.image_url}
          alt={member.name}
          className="w-full h-50 object-cover rounded-3xl"
        />
        {/* Member Details */}
        <div className="absolute md:bottom-2 bottom-4 left-1/2 transform -translate-x-1/2 w-[60%] bg-white px-1 py-1 rounded-md z-10 text-center">
          <h2 className="text-xs text-yellow-500 font-semibold">{member.name}</h2>
          <p className="text-xs font-medium">{member.role}</p>
          <a href={`mailto:${member.email}`} className="text-blue-500 underline text-[9px] font-medium">
            {member.email}
          </a>
        </div>
      </div>
    ))}
  </div>

  {operationsTeam.length > 4 && window.innerWidth < 768 && !showAll && (
    <button
      onClick={handleShowMore}
      className="mt-3 mb-4 py-2 px-4 bg-yellow-500 font-medium text-white rounded-md block mx-auto"
    >
      Show More
    </button>
  )}
</div>


    </div>
    </div>
  );
};

export default AboutUs;





