import React, { useState } from 'react';
import logo from '../assets/images/logo1.jpg'; // Adjust the path to your logo image
import facebookIcon from '../assets/icons/facebook.svg';
import youtubeIcon from '../assets/icons/youtube.svg';
import twitterIcon from '../assets/icons/twitter.svg';
import InstagramIcon from '../assets/icons/instagram.svg';
import PinterestIcon from '../assets/icons/pinterest.svg';


const Footer = () => {
  const [activeSection, setActiveSection] = useState(null);

  // Function to toggle active section
  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <footer className="rounded-t-3xl mt-11 mb-0  bg-[#010440] mx-5 md:mx-16 flex flex-col text-white">
      <div className="flex flex-col  md:flex-row w-full max-w-[1747px] md:h-[360px] h-full">
        {/* First Column */}
        <div className="flex-1 md:mt-16 ml-6 font-lufga p-4 md:mb-16 min-w-[300px]">
          <img src={logo} alt="Promitto Logo" className="mb-4 h-12 rounded-full" />
          <h1 className="text-xl text-[#F2B807] font-bold mb-2">PROMITTO LTD</h1>
          <p className="text-xs font-light font-lufga">
            With Promitto Ltd, you can expect Exceptional Homes and Unforgettable Memories.
            Enroll with us and Experience the Best of Kenya's Real Estate offers.
          </p>
        </div>

        {/* Second Column - Help Desk */}
        <div className="flex-1 border-t md:mt-36 font-poppins md:ml-11 border-yellow-500 p-2 min-w-[200px]">
          <h2
            className="text-lg font-semibold mb-2 ml-8 cursor-pointer text-[#F2B807] md:cursor-default"
            onClick={() => toggleSection('helpDesk')}
          >
            Help Desk
          </h2>
          <div className={`text-sm transition-all ml-6 duration-300 ${activeSection === 'helpDesk' ? 'max-h-screen' : 'max-h-0 overflow-hidden md:max-h-full'}`}>
            <p>Email</p>
            <p className='text-[10px] font-light'>info@promittoltd.com</p>
            <p >Telephone</p>
            <p className='text-[10px] font-light'>(+254) 729 506 506</p>
          </div>
        </div>

        {/* Third Column - Location */}
        <div className="flex-1 border-t md:mt-36 font-poppins border-yellow-500 p-2 min-w-[200px]">
          <h2
            className="text-lg font-semibold mb-2 ml-8 cursor-pointer text-[#F2B807] md:cursor-default"
            onClick={() => toggleSection('location')}
          >
            Location
          </h2>
          <div className={`text-sm transition-all ml-6 duration-300 ${activeSection === 'location' ? 'max-h-screen' : 'max-h-0 overflow-hidden md:max-h-full'}`}>
            <p>Head Office</p>
            <p className='text-[10px] font-light'>Pension Towers, Mezzanine Floor,</p>
            <p className='text-[10px] font-light'>Loita Street, Nairobi.</p>
            <p>Address</p>
            <p className='text-[10px] font-light'>P. O. Box 9388, 00100</p>
            <p className='text-[10px] font-light'>Nairobi, Kenya</p>
          </div>
        </div>

        {/* Fourth Column - Socials */}
        <div className="flex-1 border-t md:mt-36 mr-3 font-poppins border-yellow-500 p-2 min-w-[200px]">
          <h2
            className="text-lg font-semibold mb-2 ml-8 cursor-pointer text-[#F2B807] md:cursor-default"
            onClick={() => toggleSection('socials')}
          >
            Socials
          </h2>
          <div className={`text-sm transition-all ml-6 duration-300 ${activeSection === 'socials' ? 'max-h-screen' : 'max-h-0 overflow-hidden md:max-h-full'}`}>
            <p>Find us on</p>
            <p className='text-[10px] font-light'>Follow us, like, and get updates on investment opportunities!</p>
            <div className="flex space-x-4 mt-4">
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                    <img src={facebookIcon} alt="Facebook" className="w-6 h-6 hover:text-blue-500" />
                </a>
                <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                    <img src={youtubeIcon} alt="YouTube" className="w-6 h-6 hover:text-red-500" />
                </a>
                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                    <img src={twitterIcon} alt="Twitter" className="w-6 h-6 hover:text-blue-400" />
                </a>
                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                    <img src={InstagramIcon} alt="Twitter" className="w-6 h-6 hover:text-blue-400" />
                </a>
                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                    <img src={PinterestIcon} alt="Twitter" className="w-6 h-6 hover:text-blue-400" />
                </a>
                </div>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
