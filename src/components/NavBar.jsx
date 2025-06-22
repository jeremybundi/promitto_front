import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../loginSlice';
import logo from '../assets/images/logo.jpg';
import { HiMenu, HiX } from 'react-icons/hi';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav className="relative">
      <div className="w-full h-auto shadow-md md:mx-auto px-4">
        <div className="flex justify-between items-center text-sm py-4">
          <div className="flex-shrink-0">
            <img src={logo} alt="Logo" className="h-[50px] w-[70px]" />
          </div>

          <div className="hidden md:flex md:ml-24 flex-grow font-lufga justify-center space-x-10">
            {[
              { label: 'Home', path: 'https://promittoltd.com/' },
              { label: 'About Us', path: '/about-us' },
              { label: 'Our Housing Projects', path: '/' },
              { label: 'How To Own', path: '/how/to/own' },
              { label: 'Contact Us', path: 'https://promittoltd.com/contact-us' },
            ].map(({ label, path }) => {
              const isExternal = path.startsWith("http");
              const isActive = !isExternal && activeLink === path;

              return isExternal ? (
                <a
                  key={path}
                  href={path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative font-lufga font-medium text-[16px] text-gray-400 hover:text-yellow-500 transition duration-200"
                >
                  {label}
                </a>
              ) : (
                <Link
                  key={path}
                  to={path}
                  className={`relative font-lufga font-medium text-[16px] transition duration-200 ${
                    isActive ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'
                  }`}
                  onClick={() => handleLinkClick(path)}
                >
                  {label}
                  {isActive && (
                    <span className="absolute left-0 bottom-[-2px] w-full h-[2px] bg-yellow-500"></span>
                  )}
                </Link>
              );
            })}
          </div>    

          {/* Hamburger Icon for small screens */}
          <div className="md:hidden mr-3 flex items-center" onClick={toggleMenu}>
            {isMenuOpen ? <HiX className="h-8 w-8 text-gray-800 cursor-pointer" /> : <HiMenu className="h-8 w-8 text-gray-800 cursor-pointer" />}
          </div>

          {/* Login, Create Account, or Logout button */}
          <div className="hidden md:flex items-center space-x-4">
            {token ? (
              <button
                onClick={handleLogout}
                className="bg-gray-200 text-gray-600 font-medium py-2 px-4 font-lufga rounded shadow-md flex items-center hover:bg-gray-100 transition duration-200"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-gray-200 text-gray-600 text-xs md:text-[16px] font-poppins py-2 md:py-3 px-6 font-lufga shadow-lg rounded flex items-center hover:bg-gray-100 transition duration-200"
                  onClick={() => handleLinkClick('/login')}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-yellow-500 text-xs md:text-[16px] text-white shadow-lg font-lufga py-2 md:py-3 px-4 rounded flex items-center hover:bg-yellow-600 hover:text-white transition duration-200"
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
          <div className="md:hidden bg-white shadow-xl border border-t rounded-md mt-1">
            <div className="flex justify-between items-center p-3">
              <h2 className="text-lg font-semibold">Menu</h2>
              <HiX className="h-6 w-6 text-gray-800 cursor-pointer" onClick={toggleMenu} />
            </div>
            <div className="ml-3 text-sm">
              {[
                { label: 'Home', path: 'https://promittoltd.com' },
                { label: 'About Us', path: '/about-us' },
                { label: 'Our Housing Projects', path: '/' },
                { label: 'How To Own', path: '/how/to/own' },
                { label: 'Contact Us', path: 'https://promittoltd.com/contact-us' },
              ].map(({ label, path }) => (
                <Link
                  key={path}
                  to={path}
                  className={`block text-gray-800 py-2 transition duration-200 ${
                    activeLink === path ? 'text-yellow-500' : 'hover:text-yellow-500'
                  }`}
                  onClick={() => handleLinkClick(path)}
                >
                  {label}
                </Link>
              ))}

              <div className='flex justify-center mb-3 font-poppins'>
                {/* Login or Logout button for small screens */}
                {token ? (
                  <button
                    onClick={handleLogout}
                    className="block bg-gray-300 font-medium mr-8 px-6 text-sm rounded text-gray-800 py-2 hover:text-yellow-500 transition duration-200"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="block text-gray-600 text-sm mr-8 font-semibold rounded bg-gray-300 px-6 py-2 transition duration-200"
                    onClick={() => handleLinkClick('/login')}
                  >
                    Login
                  </Link>
                )}

                {/* Create Account (always visible) */}
                <Link
                  to="/register"
                  className="block text-white font-medium bg-yellow-900 py-2 px-2 rounded transition duration-200"
                  onClick={() => handleLinkClick('/register')}
                >
                  Create Account
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
