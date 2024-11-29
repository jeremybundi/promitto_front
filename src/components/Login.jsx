import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { loginSuccess } from '../loginSlice'; 
import { useNavigate } from 'react-router-dom'; 
import loginImage from '../assets/images/screen.png';

function Login() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

// Function to handle email submission and send OTP
const handleSendOtp = async () => {
  setErrorMessage(''); 
  try {
    const response = await axios.post('https://api3.promittoltd.com/users/login', 
      { email },
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
    
    if (response.data.status === 'success') {
      //console.log('OTP sent successfully:', response.data);
      setShowOtpForm(true);
    } else {
      setErrorMessage(response.data.message || 'Failed to send OTP');
    }
  } catch (error) {
    setErrorMessage('Error sending OTP. Please try again.');
  }
};

const handleVerifyOtp = async () => {
  setErrorMessage('');
  try {
    const response = await axios.post('https://api3.promittoltd.com/users/verify-otp', 
      { email, otp },
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
    
    if (response.data.status === 'success') {
      const { token, user, message } = response.data;
      dispatch(loginSuccess({ token, user, message }));

      // Redirect based on user role
      if (user.role === 'Account Manager') {
        navigate('/admin');  
      } else {
        navigate('/public/view');  
      }

      //console.log(response.data);
    } else {
      setErrorMessage(response.data.message || 'OTP verification failed');
    }
  } catch (error) {
    setErrorMessage('Error verifying OTP. Please try again.');
  }
};


  return (
    <div className="flex items-center justify-center">
      <div className="flex bg-white rounded-2xl mt-6 shadow-lg mb-36 md:mb-16 overflow-hidden w-3/4 max-w-4xl">
        {/* Left Side - Form */}
        <div className="md:p-16 p-4 w-full ">
          <h2 className="md:text-2xl text-lg font-poppins  font-semibold text-[#F2B807] mb-4">Login</h2>

          {/* Email input form */}
          {!showOtpForm ? (
            <>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 p-2 md:w-3/4 w-full border  font-poppins rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300"
                placeholder="Enter your email"
              />
              <div className="flex mt-4">
                <button
                  onClick={handleSendOtp}
                  className="md:px-8 px-2 py-1 md:py-1 bg-[#F2B807]  font-bold text-black rounded-md md:text-xs text-[10px] hover:bg-yellow-400 transition-colors"
                >
                  Get code
                </button>
                <p className="md:text-sm text-[9px] mt-2  md:ml-3 ml-2">
                    Do not have an account?{" "}
                    <a href="/register" className="text-[#F2B807] underline">
                      Register
                    </a>{" "}
                    with Promitto today
                  </p>             
                   </div>
            </>
          ) : (
            <>
              {/* OTP input form */}
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter the 6 digit code"
              />
              <div className="flex mt-4">
                <button
                  onClick={handleVerifyOtp}
                  className="md:px-16 px-3 py-2 bg-[#F2B807] font-bold text-black rounded-lg text-sm hover:bg-yellow-300 transition-colors"
                >
                  Submit
                </button>
              </div>
            </>
          )}
          {/* Error message display */}
          {errorMessage && (
            <div className="text-red-500 mt-2">
              {errorMessage}
            </div>
          )}
        </div>

        {/* Right Side - Image */}
        <div className="hidden sm:block w-1/2">
          <img src={loginImage} alt="Login Illustration" className="object-cover h-full w-full" />
        </div>
      </div>
    </div>
  );
}

export default Login;
