// NavigationButtons.jsx
import React from 'react';

const NavigationButtons = ({ currentTab, onPrevious, onNext }) => {
  return (
    <div className="flex justify-between mt-4">
      {/* Previous Button */}
      <button
        type="button"
        className={`bg-[#F2B807] py-2 px-4 text-xl rounded-xl flex items-center w-auto ${currentTab === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={onPrevious}
        disabled={currentTab === 0} // Disable when on the first tab
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 mr-2">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7M19 19l-7-7 7-7" />
        </svg>
        Previous
      </button>

      {/* Next Button */}
      <button
        type="button"
        className={`bg-[#F2B807] py-2 px-4 text-xl rounded-xl flex items-center w-auto ${currentTab === 3 ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={onNext}
        disabled={currentTab === 3} // Disable when on the last tab
      >
        Next
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 ml-2">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default NavigationButtons;
