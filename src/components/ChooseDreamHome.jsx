import React, { useEffect, useState } from 'react';
import axios from 'axios';
import sizeIcon from '../assets/images/icons8-full-screen-100.jpg';     
import typeIcon from '../assets/images/key_4838168.jpg';     
import bedroomsIcon from '../assets/images/icons8-bed-96.jpg'; 
import ownhome from '../assets/images/ownhome.png'; 
import eyeIcon from '../assets/images/eye.png'; 
import enrollIcon from '../assets/images/enroll.jpg'; 
import dropdownIcon from '../assets/icons/dropdown.svg'; 
import { useNavigate } from 'react-router-dom';





const ChooseDreamHome = () => {
    const [houses, setHouses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visibleCount, setVisibleCount] = useState(4); 
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [sortOption, setSortOption] = useState('newest'); 
    const navigate = useNavigate();

  const handleViewDoneImages = (id) => {

    navigate(`/view/done/${id}`);
  };
  const handleViewImages = (id) => {

    navigate(`/view/ongoing/${id}`);
  };


    let hideTimeout;

    useEffect(() => {
        const fetchHouses = async () => {
            try {
                const response = await axios.get('https://api3.promittoltd.com/houses/done');
                setHouses(response.data);
                console.log(response.data); 
            } catch (error) {
                console.error('Error fetching houses:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchHouses();
    }, []);

 // Sort houses based on selected option
 const sortHouses = (houses) => {
    switch (sortOption) {
        case 'newest':
            return [...houses].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        case 'price-low-high':
            return [...houses].sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        case 'price-high-low':
            return [...houses].sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        default:
            return houses;
    }
};

const sortedHouses = sortHouses(houses); 

const handleSortChange = (option) => {
    setSortOption(option);
    setDropdownVisible(false); 
};

        // Show dropdown
    const handleMouseEnter = () => {
        if (hideTimeout) clearTimeout(hideTimeout);
        setDropdownVisible(true);
    };

    // Delay hiding dropdown
    const handleMouseLeave = () => {
        hideTimeout = setTimeout(() => {
        setDropdownVisible(false);
        }, 300); 
    };

    
  //done houses
    const handleViewMore = () => {
        setVisibleCount((prevCount) => prevCount + 8); 
    };

  //ongoing houses
  const [visibleOngoingCount, setVisibleOngoingCount] = useState(8); 

  const handleViewMoreOngoing = () => {
      setVisibleOngoingCount((prevCount) => prevCount + 12); 
  };
    //fetching ongoingHouses from api
    const [ongoingHouses, setOngoingHouses] = useState([]); 

    useEffect(() => {
        const fetchOngoingHouses = async () => {
            try {
                const response = await axios.get('https://api3.promittoltd.com/house-ongoing'); 
                setOngoingHouses(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching ongoing houses:', error);
            }
        };

        fetchOngoingHouses();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col p-4">
            {/* First Row - All Homes and house details */}
            <div className="flex flex-col md:flex-row justify-between">
                {/* First Column */}
                <div className="md:w-[25%] hidden md:block md:mx-11 md:mt-[100px] p-4">
                    <h2 className="md:text-2xl text-lg text-[#F2B807] font-sans font-bold mb-2">All Homes</h2>
                    <hr className="border-t-2 border-[#F2B807] mb-4" />
                    {/* Links to bedroom types */}
                    <div className="mb-4">
                        <a href="#" className="text-sm font-extralight text-gray-500 font-lufga block mb-4">2 Bedrooms</a>
                        <hr className="border-t border-[#F8F8F8]" />
                        <a href="#" className="text-sm font-extralight text-gray-500 font-lufga block my-4">3 Bedrooms</a>
                        <hr className="border-t border-[#F8F8F8]" />
                        <a href="#" className="text-sm font-extralight text-gray-500 font-lufga block mt-4 mb-4">Perimeter Walls</a>
                        <hr className="border-t border-[#F8F8F8]" />
                        <a href="#" className="text-sm font-extralight text-gray-500  font-lufga block mt-4 mb-4">3 Bedroom With Floor Plan</a>
                        <hr className="border-t border-[#F8F8F8]" />
                        <a href="#" className="text-sm font-extralight text-gray-500 font-lufga block mt-4 mb-4">Commercial Buildings</a>
                        <hr className="border-t border-[#F8F8F8]" />
                        <a href="#" className="text-sm font-extralight text-gray-500  font-lufga block mt-4 mb-4">4 Bedroom With Floor Plan</a>
                        <hr className="border-t border-[#F8F8F8]" />
                        <a href="#" className="text-sm font-extralight text-gray-500 font-lufga block mt-4 mb-4">Studio/DSQ</a>
                        <hr className="border-t border-[#F8F8F8]" />
                        <a href="#" className="text-sm font-extralight text-gray-500 font-lufga block mt-4 mb-4">Rentals/Commercial Buildings</a>
                        <hr className="border-t border-[#F8F8F8]" />
                    </div>
                </div>

                {/* Second Column */}
                <div className="md:w-[75%] p-4">
                <h2 className="md:text-5xl text-2xl text-[#F2B807] font-lufga font-bold mt-0 mb-2 md:mb-4" >
                    Choose Your Dream Home
                </h2>
                <h3 className="font-normal md:ml-16 text-gray-500 md:text-lg text-sm font-lufga  mb-2 md:mb-9" data-aos="fade-up">
                    Discover Your Dream Home in Kenya with Promitto Ltd.
                </h3>

                  {/* Sort Option */}
                  <div className="flex justify-end mr-16 items-center mb-6 relative">
                        <div
                            className="relative group cursor-pointer flex items-center"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <span className="text-sm  font-lufga md:mr-2">Sort By</span>
                            <img src={dropdownIcon} alt="Dropdown Icon" className="w-4 h-4" />
                            
                            {isDropdownVisible && (
                            <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg transition-opacity duration-300">
                                <ul className="py-2 text-sm text-gray-700">

                                    <li className="hover:bg-gray-100 px-4 py-2 font-lufga cursor-pointer" onClick={() => handleSortChange('newest')}>Newest</li>
                                    <li className="hover:bg-gray-100 px-4 py-2 font-lufga cursor-pointer" onClick={() => handleSortChange('price-low-high')}>Price: Low to high</li>
                                    <li className="hover:bg-gray-100 px-4 py-2 font-lufga cursor-pointer" onClick={() => handleSortChange('price-high-low')}>Price: High to low</li>
                                </ul>
                            </div>
                            )}
                        </div>
                    </div>

                 {/* Render sorted houses */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:mb-8 gap-2">
                    {sortedHouses.slice(0, visibleCount).map((house) => (
                        <div key={house.id} className="rounded-xl md:w-[90%] shadow-md overflow-hidden flex flex-col">
                            <img 
                                src={house.images[0]} 
                                alt={house.name} 
                                className="w-full h-100% object-cover"
                                onClick={() => handleViewDoneImages(house.id)} // Trigger view images on click

                            />
                            <div className="p-4 flex flex-col justify-between flex-grow">
                                <div>
                                    <p className="font-bold ml-3 font-lufga mb-3 mt-2">{house.title}</p>
                                    <div className="flex justify-between items-center mb-4">
                                        <div className="flex ml-1 items-center">
                                            <img src={sizeIcon} alt="Size" className="w-4 h-4 mr-1" />
                                            <span className="md:text-[11px] text-[9px] font-manrope font-bold text-[#5E5E5E]">
                                                {house.size} <span>SqFt</span>
                                            </span>
                                        </div>
                                        <div className="flex items-center">
                                            <img src={typeIcon} alt="Type" className="w-5 h-5 mr-1" />
                                            <span className="md:text-[11px] text-[9px] font-bold font-manrope text-[#5E5E5E]">
                                                {house.type}
                                            </span>
                                        </div>
                                        <div className="flex items-center">
                                            <img src={bedroomsIcon} alt="Bedrooms" className="w-5 h-5 mr-1" />
                                            <span className="md:text-[11px] text-[9px] font-manrope font-bold text-[#5E5E5E]">
                                                {house.bedrooms} bedrooms
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between mt-auto">
                                    <button
                                    onClick={() => handleViewDoneImages(house.id)} 
                                    className="bg-[#F2B807] flex text-white font-lufga py-2 md:px-4 lg:px-2 px-2 md:py-3 lg:py-1 text-xs md:text-sm lg:text-xs font-semibold rounded-lg">
                                        View House
                                        <span className="ml-3 lg:mt-1">
                                            <img src={eyeIcon} alt="Eye" className="w-5 h-5 mr-1" />
                                        </span>
                                    </button>
                                    <div className="flex flex-col ml-3 items-end">
                                        <span className="mr-20 font-manrope md:text-sm lg:text-sm text-xs font-semibold">Pay</span>
                                        <span className="md:text-sm text-xs lg:text-xs font-manrope">
                                            <span className="font-semibold">Ksh.</span> {house.price}/=  
                                            <span className="md:text-sm lg:text-xs text-[9px]">
                                                Per Month <span className="font-medium">For 7 Years</span>
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                    
                    {/* "View More" Button */}
                    {visibleCount < houses.length && (
                        <div className="flex justify-center mt-6">
                            <button 
                                onClick={handleViewMore} 
                                className="bg-[#F2B807] text-white py-2 px-6  rounded-xl" data-aos="fade-up"
                            >
                                View More Houses 
                            </button>
                        </div>
                    )}
                </div>
            </div>
          {/* New Row for Two Columns at the Bottom */}
          <div className="flex  md:mx-8">
            {/* Column 1 - 60% Width */}
            <div className="w-[55%] bg-[#F2B807] rounded-tl-2xl rounded-br-2xl md:py-24 p-5">
              <h3 className="md:text-7xl md:mt-8 text-xl mt-3 font-lufga font-semibold mb-4">Become a home owner today by Enrolling as a member.</h3>
              <p className='md:text-sm text-xs font-light font-poppins'>Here at Promitto Ltd we to turn your dreams into reality, as we pride ourselves on delivering extraordinary service, 
                impeccable quality, and unforgettable living experiences.</p>


                    {/* Enroll Now Button */}
                    <button className="flex items-center border bg-gray-100 border-black text-black px-4 py-2 mt-5 md:mt-12 rounded-lg"  data-aos="fade-up">
                    Enroll Now
                    <img src={enrollIcon} alt="Enroll Icon" className="ml-2 w-5 h-5" /> 
                  
                  </button>
              
                
            </div>

            {/* Column 2 - 40% Width with Image */}
            <div 
              className="w-[45%]  rounded-bl-2xl rounded-tr-2xl "
              style={{
                backgroundImage: `url(${ownhome})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
          </div>
        </div>
        <div className="flex flex-col items-center text-center">
          <h3 className='text-[#F2B807] md:text-4xl text-2xl  font-lugha font-semibold mt-8 md:mt-24 mb-4' data-aos="fade-down"> Our Ongoing Projects </h3>
          <p className='text-lg text-gray-500 font-poppins ' data-aos="fade-up">Some of our ongoing projects at various stages</p>
        </div>
        {/* Ongoing Projects */}
        <div className="mt-10 md:mt-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:mx-11 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {ongoingHouses.slice(0, visibleOngoingCount).map((house) => (
                <div key={house.id} className="rounded-xl shadow-md overflow-hidden flex flex-col">

                    <img 
                        src={house.images[0]}  // Access the first image
                        alt={house.description} 
                        className="w-full h-56 md:h-64 lg:h-72 object-cover"
                        onClick={() => handleViewImages(house.id)} // Trigger view images on click

                    />
                    <div className="p-4 flex flex-col justify-between flex-grow">
                        <div>
                            <p className="font-bold font-lufga">{house.description}</p>
                            <p className="text-sm font-poppins text-gray-500">{house.location}</p>
                        </div>
                        <div className="flex mt-4">
                            <button
                              onClick={() => handleViewImages(house.id)} 
                            className="bg-[#F2B807] flex text-white ml-auto font-lufga py-2 md:px-4 lg:px-1 px-2 md:py-3 lg:py-2 text-xs md:text-sm lg:text-xs font-semibold rounded-lg">
                                View Images
                                <span className="ml-1">
                                    <img src={eyeIcon} alt="Eye" className="w-4 h-4 mr-1 font-semibold" />
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>



            {/* "View More" Button */}
            {visibleOngoingCount < ongoingHouses.length && (
                <div className="flex justify-center mt-8">
                    <button 
                        onClick={handleViewMoreOngoing} 
                        className="bg-[#F2B807] text-white py-1 px-4 md:py-2 text-xs md:text-sm font-poppins font-semibold rounded-2xl"  data-aos="fade-down"
                    >
                        View More Ongoing Projects 
                    </button>
                </div>
            )}
        </div>


        </div>

        
    );
};

export default ChooseDreamHome;
