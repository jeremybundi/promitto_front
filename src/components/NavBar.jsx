import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../loginSlice';
import logo from '../assets/images/logo.jpg';
import dropdownIcon from '../assets/icons/dropdown.svg';
import { HiMenu, HiX } from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isHomeDropdownOpen, setIsHomeDropdownOpen] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('/');
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav className="relative">
      <div className=" w-full  h-auto shadow-md  md:mx-auto px-4">
        <div className="flex justify-between items-center text-sm py-4">
          <div className="flex-shrink-0 md:ml-">
            <img src={logo} alt="Logo" className="h-[50px] w-[70px]" />
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
          <div className="hidden md:flex text-[#707070] flex-grow md:ml-24 justify-center space-x-12">
            <Link
              to="https://promittoltd.com/"
              className={`font-poppins text-[16px] text-gray-400 transition duration-200 ${activeLink === '/' ? 'text-yellow-500' : 'text-gray-800 hover:underline hover:underline-yellow-700'}`}
              onClick={() => handleLinkClick('/')}
            >
              Home
            </Link>
            <div className="relative" onMouseEnter={() => handleMouseEnter(setIsAboutDropdownOpen)} onMouseLeave={() => handleMouseLeave(setIsAboutDropdownOpen)}>
              <span
                className={`font-poppins text-[16px] text-gray-400 transition duration-400 ${activeLink === '/about' ? 'text-yellow-500' : 'text-gray-800 hover:underline hover:underline-yellow'}`}
              >
                About Us
              </span>
              <img src={dropdownIcon} alt="Dropdown" className="inline-block w-4 h-4 ml-1 cursor-pointer" />
              {isAboutDropdownOpen && (
                <div className="absolute mt-1 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                  <Link to="/https://promittoltd.com/about-us" className="block px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={() => handleLinkClick('/board-members')}>Board Members</Link>
                 {/*} <Link to="/menu-item-2" className="block px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={() => handleLinkClick('/menu-item-2')}>Menu Item 2</Link>
                    <Link to="/menu-item-3" className="block px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={() => handleLinkClick('/menu-item-3')}>Menu Item 3</Link>
                  {/* More dropdown items */}
                </div>
              )}
            </div>
            <Link
              to="/"
              className={`font-poppins text-[16px] text-gray-400 transition duration-200 ${activeLink === '/projects' ? 'text-yellow-500' : 'text-gray-800 hover:underline hover:underline-yellow'}`}
              onClick={() => handleLinkClick('/projects')}
            >
              Our Housing Projects
            </Link>
            <Link
              to="https://promittoltd.com/how-to-own"
              className={`ffont-poppins text-[16px] text-gray-400 transition duration-200 ${activeLink === '/dreams' ? 'text-yellow-500' : 'text-gray-800 hover:underline hover:underline-yellow'}`}
              onClick={() => handleLinkClick('/dreams')}
            >
              How To Own
            </Link>
            <Link
              to="https://promittoltd.com/contact-us"
              className={`ffont-poppins text-[16px] text-gray-400 transition duration-200 ${activeLink === '/dreams' ? 'text-yellow-500' : 'text-gray-800 hover:underline hover:underline-yellow'}`}
              onClick={() => handleLinkClick('/dreams')}
            >
              Contact Us
            </Link>
          
          </div>

          {/* Hamburger Icon for small screens */}
          <div className="md:hidden mr-3 flex items-center" onClick={toggleMenu}>
            <HiMenu className="h-8 w-8 text-gray-800 cursor-pointer" />
          </div>

              {/* Login, Create Account, or Logout button */}
              <div className="flex items-center space-x-4">
            {token ? (
              <button
                onClick={handleLogout}
                className="bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded shadow-md flex items-center hover:bg-gray-100 transition duration-200"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hidden md:block bg-gray-200 text-gray-800 font-medium py-2 px-6 shadow-lg rounded flex items-center hover:bg-gray-100 transition duration-200"
                  onClick={() => handleLinkClick('/login')}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="hidden md:block bg-yellow-500 text-gray-800 shadow-lg font-medium py-2 px-6 rounded flex items-center hover:bg-yellow-600 transition duration-200"
                  onClick={() => handleLinkClick('/register')}
                >
                  Create Account
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Navigation links for small screens */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg rounded-md mt-2">
            <div className="flex justify-between items-center p-3">
              <h2 className="text-lg text-red-700 font-semibold">Menu</h2>
              <HiX className="h-6 w-6 text-gray-800 cursor-pointer" onClick={toggleMenu} />
            </div>
            <div className='ml-3 text-sm'>
              <Link to="/https://promittoltd.com" className={`block text-gray-800 py-2 ${activeLink === '/' ? 'text-yellow-500' : 'hover:underline hover:underline-yellow'}`} onClick={() => handleLinkClick('/')}>
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
                    <Link to="https://promittoltd.com/about-us" className="block px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={() => handleLinkClick('/board-members')}>Board Members</Link>
                    {/* Other dropdown items */}
                  </div>
                )}
              </div>
              <Link to="/projects" className={`block text-gray-800 py-2 ${activeLink === '/projects' ? 'text-yellow-500' : 'hover:underline hover:underline-yellow'}`} onClick={() => handleLinkClick('/projects')}>
                Our Projects
              </Link>
              <Link to="https://promittoltd.com/how-to-own" className={`block text-gray-800 py-2 ${activeLink === '/how-to-own' ? 'text-yellow-500' : 'hover:underline hover:underline-yellow'}`} onClick={() => handleLinkClick('/how-to-own')}>
                How To Own
              </Link>
              <Link to="/login" className={`block text-gray-800 py-2 ${activeLink === '/how-to-own' ? 'text-yellow-500' : 'hover:underline hover:underline-yellow'}`} onClick={() => handleLinkClick('/how-to-own')}>
                Login
              </Link>
              <Link to="/register" className={`block text-gray-800 py-2 ${activeLink === '/create-account' ? 'text-yellow-500' : 'hover:underline hover:underline-yellow'}`} onClick={() => handleLinkClick('/create-account')}>
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
