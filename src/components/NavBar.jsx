import React, { useState } from 'react';
import logo from '../assets/images/logo.jpg';
import dropdownIcon from '../assets/icons/dropdown.svg';
import { HiMenu, HiX } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isHomeDropdownOpen, setIsHomeDropdownOpen] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('/');
  let dropdownTimer;

  const toggleHomeDropdown = () => {
    clearTimeout(dropdownTimer);
    setIsHomeDropdownOpen(!isHomeDropdownOpen);
  };

  const toggleAboutDropdown = () => {
    clearTimeout(dropdownTimer);
    setIsAboutDropdownOpen(!isAboutDropdownOpen);
  };

  const handleMouseEnter = (setDropdownOpen) => {
    clearTimeout(dropdownTimer);
    setDropdownOpen(true);
  };

  const handleMouseLeave = (setDropdownOpen) => {
    dropdownTimer = setTimeout(() => {
      setDropdownOpen(false);
    }, 200);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setIsHomeDropdownOpen(false);
    setIsAboutDropdownOpen(false);
    setIsMenuOpen(false);
  };

  return (
    <nav className="relative">
      <div className="max-w-7xl w-full h-16 md:h-16 md:mx-auto px-4">
        <div className="flex justify-between items-center text-sm py-4">
          <div className="flex-shrink-0">
            <img src={logo} alt="Logo" className="h-100%" />
          </div>

          {/* Home Types dropdown centered for small screens */}
          <div
            className="flex md:hidden mx-auto"
            onMouseEnter={() => handleMouseEnter(setIsHomeDropdownOpen)}
            onMouseLeave={() => handleMouseLeave(setIsHomeDropdownOpen)}
            onClick={toggleHomeDropdown}
          >
            <span className="font-medium text-gray-800 cursor-pointer hover:underline">
              Home Types
            </span>
            <img src={dropdownIcon} alt="Dropdown" className="inline-block w-4 h-4 ml-1" />
            {isHomeDropdownOpen && (
              <div className="absolute mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">2 Bedrooms</a>
                <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">3 Bedrooms</a>
                <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Perimeter Walls</a>
                <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">3 Bedroom With Floor Plan</a>
                <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Commercial Buildings</a>
                <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">4 Bedroom With Floor Plan</a>
                <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Studio/DSQ</a>
                <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Rentals/Commercial Buildings</a>
              </div>
            )}
          </div>

          {/* Navigation links for large screens */}
          <div className="hidden md:flex text-[#707070] flex-grow justify-center space-x-12">
            <Link
              to="/"
              className={`font-medium transition duration-200 ${activeLink === '/' ? 'text-yellow-500' : 'text-gray-800 hover:underline hover:underline-yellow-700'}`}
              onClick={() => handleLinkClick('/')}
            >
              Home
            </Link>
            <Link
              to="/projects"
              className={`font-medium transition duration-200 ${activeLink === '/projects' ? 'text-yellow-500' : 'text-gray-800 hover:underline hover:underline-yellow'}`}
              onClick={() => handleLinkClick('/projects')}
            >
              Our Projects
            </Link>
            <Link
              to="/dreams"
              className={`font-medium transition duration-200 ${activeLink === '/dreams' ? 'text-yellow-500' : 'text-gray-800 hover:underline hover:underline-yellow'}`}
              onClick={() => handleLinkClick('/dreams')}
            >
              How To Own
            </Link>
            <div className="relative" onMouseEnter={() => handleMouseEnter(setIsAboutDropdownOpen)} onMouseLeave={() => handleMouseLeave(setIsAboutDropdownOpen)}>
              <span
                className={`font-medium transition duration-400 ${activeLink === '/about' ? 'text-yellow-500' : 'text-gray-800 hover:underline hover:underline-yellow'}`}
              >
                About Us
              </span>
              <img src={dropdownIcon} alt="Dropdown" className="inline-block w-4 h-4 ml-1 cursor-pointer" />
              {isAboutDropdownOpen && (
                <div className="absolute mt-1 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                  <Link to="/board-members" className="block px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={() => handleLinkClick('/board-members')}>Board Members</Link>
                  <Link to="/menu-item-2" className="block px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={() => handleLinkClick('/menu-item-2')}>Menu Item 2</Link>
                    <Link to="/menu-item-3" className="block px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={() => handleLinkClick('/menu-item-3')}>Menu Item 3</Link>
                  {/* More dropdown items */}
                </div>
              )}
            </div>
          </div>

          {/* Hamburger Icon for small screens */}
          <div className="md:hidden mr-auto flex items-center" onClick={toggleMenu}>
            <HiMenu className="h-8 w-8 text-gray-800 cursor-pointer" />
          </div>

          {/* Create Account Link (hidden on small screens) */}
          <Link
            to="/create-account"
            className="hidden md:block bg-yellow-500 text-gray-800 font-medium py-2 px-4 rounded flex items-center hover:bg-yellow-600 transition duration-200"
            onClick={() => handleLinkClick('/create-account')}
          >
            Create Account
          </Link>
        </div>

        {/* Navigation links for small screens */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg rounded-md mt-2">
            <div className="flex justify-between items-center p-3">
              <h2 className="text-lg text-red-700 font-semibold">Menu</h2>
              <HiX className="h-6 w-6 text-gray-800 cursor-pointer" onClick={toggleMenu} />
            </div>
            <div className='ml-3 text-sm'>
              <Link to="/" className={`block text-gray-800 py-2 ${activeLink === '/' ? 'text-yellow-500' : 'hover:underline hover:underline-yellow'}`} onClick={() => handleLinkClick('/')}>
                Home
              </Link>
              <div className="relative">
                <span
                  className={`block text-gray-800 py-2 transition duration-200 ${activeLink === '/about' ? 'text-yellow-500' : 'hover:underline hover:underline-yellow'}`}
                  onClick={toggleAboutDropdown}
                >
                  About Us
                </span>
                {isAboutDropdownOpen && (
                  <div className="mt-1 w-48 bg-white">
                    <Link to="/board-members" className="block px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={() => handleLinkClick('/board-members')}>Board Members</Link>
                    {/* Other dropdown items */}
                  </div>
                )}
              </div>
              <Link to="/projects" className={`block text-gray-800 py-2 ${activeLink === '/projects' ? 'text-yellow-500' : 'hover:underline hover:underline-yellow'}`} onClick={() => handleLinkClick('/projects')}>
                Our Projects
              </Link>
              <Link to="/how-to-own" className={`block text-gray-800 py-2 ${activeLink === '/how-to-own' ? 'text-yellow-500' : 'hover:underline hover:underline-yellow'}`} onClick={() => handleLinkClick('/how-to-own')}>
                How To Own
              </Link>
              <Link to="/create-account" className={`block text-gray-800 py-2 ${activeLink === '/create-account' ? 'text-yellow-500' : 'hover:underline hover:underline-yellow'}`} onClick={() => handleLinkClick('/create-account')}>
                Create Account
              </Link>
              {/* More links */}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
