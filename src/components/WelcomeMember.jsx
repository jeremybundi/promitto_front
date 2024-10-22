import React from 'react';

const WelcomeMember = () => {
  return (
    <div className="flex flex-col items-center h-auto  rounded-xljustify-center">
      <h1 className="text-3xl font-bold text-[#F2B807] mb-4">Welcome to Promitto Members Portal</h1>
      <p className="text-sm mt-3 text-gray-600 text-center" data-aos="fade-up">
        Please select an appropriate account profile and log into your Promitto Account
      </p>

      <div className="flex space-x-12 mt-16 justify-center">
        {/* Client login card */}
        <div className="h-48 w-48 border rounded-xl bg-gray-50 flex flex-col items-center shadow-xl justify-center space-y-4 text-center cursor-pointer transition-colors duration-300 hover:border-[#F2B807] group">
          {/* New User Icon with Star */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="800px"
            height="800px"
            viewBox="0 0 24 24"
            className="h-12 w-12 transition-colors duration-300 group-hover:fill-[#F2B807] group-hover:stroke-[#F2B807]"
            fill="none" // No fill color by default
            stroke="#4A5568" // Gray 600 color
            strokeWidth="2"
          >
            <path 
              d="M10.5 21H4C4 17.4735 6.60771 14.5561 10 14.0709M16.4976 16.2119C15.7978 15.4328 14.6309 15.2232 13.7541 15.9367C12.8774 16.6501 12.7539 17.843 13.4425 18.6868C13.8312 19.1632 14.7548 19.9983 15.4854 20.6353C15.8319 20.9374 16.0051 21.0885 16.2147 21.1503C16.3934 21.203 16.6018 21.203 16.7805 21.1503C16.9901 21.0885 17.1633 20.9374 17.5098 20.6353C18.2404 19.9983 19.164 19.1632 19.5527 18.6868C20.2413 17.843 20.1329 16.6426 19.2411 15.9367C18.3492 15.2307 17.1974 15.4328 16.4976 16.2119ZM15 7C15 9.20914 13.2091 11 11 11C8.79086 11 7 9.20914 7 7C7 4.79086 8.79086 3 11 3C13.2091 3 15 4.79086 15 7Z" 
              stroke="#4A5568" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>

          {/* Text */}
          <p className="text-gray-500 transition-colors duration-300 group-hover:text-[#F2B807]">
            Login as a Client
          </p>
        </div>

        {/* Administrator login card */}
        <div className="h-48 w-48 border rounded-xl flex flex-col bg-gray-50 items-center justify-center space-y-4 text-center cursor-pointer transition-colors duration-300 hover:border-[#F2B807] group">
          {/* The icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="800px"
            height="800px"
            viewBox="0 0 24 24"
            className="h-12 w-12 transition-colors duration-300 group-hover:stroke-[#F2B807] group-hover:fill-[#F2B807]"
            fill="none" 
            stroke="#4A5568" 
            strokeWidth="2"
          >
            <path d="M20 18L17 18M17 18L14 18M17 18V15M17 18V21M11 21H4C4 17.134 7.13401 14 11 14C11.695 14 12.3663 14.1013 13 14.2899M15 7C15 9.20914 13.2091 11 11 11C8.79086 11 7 9.20914 7 7C7 4.79086 8.79086 3 11 3C13.2091 3 15 4.79086 15 7Z" 
              stroke="#4A5568" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>

          {/* Text */}
          <p className="text-gray-500 transition-colors duration-300 group-hover:text-[#F2B807]">
            Login as Account Manager
          </p>
        </div>
      </div>

      <div className="mt-9">
        <button className="bg-[#F2B807] text-black py-3 px-48 rounded-xl">Proceed</button>
      </div>
      <p className='text-xs mt-8'>
        Don't have an Account? Join us today by{' '}
        <a href="/create-account" className="text-[#F2B807] underline hover:underline">Creating an Account</a> with us below.
      </p>
    </div>
  );
};

export default WelcomeMember;
