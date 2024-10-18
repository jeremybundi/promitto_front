import React, { useEffect, useState } from 'react';
import axios from 'axios';
import sizeIcon from '../assets/images/icons8-full-screen-100.jpg';     
import typeIcon from '../assets/images/key_4838168.jpg';     
import bedroomsIcon from '../assets/images/icons8-bed-96.jpg'; 
import ownhome from '../assets/images/ownhome.jpg'; // Import your image


const ChooseDreamHome = () => {
    const [houses, setHouses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHouses = async () => {
            try {
                const response = await axios.get('/api/houses/done');
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

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col p-4">
            {/* First Row - All Homes and house details */}
            <div className="flex flex-col md:flex-row justify-between">
                {/* First Column */}
                <div className="md:w-[25%] md:mx-11 md:mt-[100px] p-4">
                    <h2 className="md:text-2xl text-lg text-[#F2B807] font-sans font-bold mb-2">All Homes</h2>

                    {/* Yellow line below "All Homes" */}
                    <hr className="border-t-2 border-[#F2B807] mb-4" />
                    
                    {/* Links to bedroom types */}
                    <div className="mb-4">
                        <a href="#" className="text-sm font-semibold text-gray-600 block mb-4">2 Bedrooms</a>
                        <hr className="border-t border-[#F8F8F8]" />
                        <a href="#" className="text-sm font-semibold text-gray-600 block my-4">3 Bedrooms</a>
                        <hr className="border-t border-[#F8F8F8]" />
                        <a href="#" className="text-sm font-semibold text-gray-600 block mt-4 mb-4">Perimeter Walls</a>
                        <hr className="border-t border-[#F8F8F8]" />
                        <a href="#" className="text-sm font-semibold text-gray-600 block mt-4 mb-4">3 Bedroom With Floor Plan</a>
                        <hr className="border-t border-[#F8F8F8]" />
                        <a href="#" className="text-sm font-semibold text-gray-600 block mt-4 mb-4">Commercial Buildings </a>
                        <hr className="border-t border-[#F8F8F8]" />
                        <a href="#" className="text-sm font-semibold text-gray-600 block mt-4 mb-4">4 Bedroom With Floor Plan</a>
                        <hr className="border-t border-[#F8F8F8]" />
                        <a href="#" className="text-sm font-semibold text-gray-600 block mt-4 mb-4">Studio/DSQ</a>
                        <hr className="border-t border-[#F8F8F8]" />
                        <a href="#" className="text-sm font-semibold text-gray-600 block mt-4 mb-4">Rentals/Commercial Buildings</a>
                        <hr className="border-t border-[#F8F8F8]" />
                    </div>
                </div>

                {/* Second Column */}
                <div className="md:w-[75%] p-4">
                    <h2 className="md:text-4xl text-xl text-[#F2B807] font-lufga font-bold mt-0 mb-2 md:mb-4">Choose Your Dream Home</h2>
                    <h3 className='font-semibold md:text-sm text-xs mb-2 md:mb-9'>Discover Your Dream Home in Kenya with Promitto Ltd.</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {houses.map((house) => (
                            <div key={house.id} className="rounded-xl md:w-[400px] shadow-md overflow-hidden">
                                <img 
                                    src={house.image_url} 
                                    alt={house.name} 
                                    className="w-full h-100% object-cover"
                                />
                                <div className="p-4">
                                    <p className="font-bold ml-3 mb-3 mt-2">{house.description}</p>
                                    <div className="flex justify-between items-center mb-7">
                                        <div className="flex ml-3 items-center">
                                            <img src={sizeIcon} alt="Size" className="w-4 h-4 mr-1" />
                                            <span className='text-[11px] font-bold text-gray-600'>{house.size}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <img src={typeIcon} alt="Type" className="w-5 h-5 mr-1" />
                                            <span className='text-[11px] font-bold text-gray-600'>{house.type}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <img src={bedroomsIcon} alt="Bedrooms" className="w-5 h-5 mr-1" />
                                            <span className='text-[11px] font-bold text-gray-600'>{house.bedrooms} bedrooms</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <button className="bg-[#F2B807] text-white py-2 px-4 rounded">View House</button>
                                        <div className="flex flex-col items-end">
                                            <span className="mr-20 font-semibold">Pay</span>
                                            <span className="text-sm "> {house.price}/=  Per Month</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            {/* New Row for Two Columns at the Bottom */}
            <div className="flex mt-12 w-full h-[350px] ">
                {/* Column 1 - 60% Width */}
                <div className="w-[60%] bg-[#F2B807] rounded-tl-2xl rounded-br-2xl p-4">
                    <h3 className="text-xl font-bold mb-4">Column 1 - 60%</h3>
                    <p>This is the content for the first column, which takes up 60% of the width.</p>
                </div>

                  {/* Column 2 - 40% Width with Image */}
                  <div 
                    className="w-[40%] rounded-bl-2xl rounded-tr-2xl bg-gray-100 p-4" 
                    style={{
                        backgroundImage: `url(${ownhome})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
        
                </div>
            </div>
        </div>
    );
};

export default ChooseDreamHome;
