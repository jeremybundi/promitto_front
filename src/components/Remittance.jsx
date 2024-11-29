import React, { useState } from 'react';
import userIcon from '../assets/icons/user.svg';
import tickIcon from '../assets/icons/dropdown.svg';
import { useDispatch } from 'react-redux';
import { saveRemittanceDetails } from '../formSlice';

const Remittance = ({ onNext, onPrevious }) => {
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  //const [paymentMethod, setPaymentMethod] = useState('Mpesa');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [transactionCode, setTransactionCode] = useState('');

  const dispatch = useDispatch();

  const handleConfirmPayment = () => {
    const remittanceData = {
     // paymentMethod,
      phoneNumber,
      transactionCode,
    };

    // Dispatch the action to save remittance details in Redux store
    dispatch(saveRemittanceDetails(remittanceData));
    console.log(remittanceData);

    // Proceed to the next step
    onNext();
  };

  // Handler for M-Pesa button click
  const handleMpesaClick = () => {
    setShowPaymentDetails(true);
  };

  // Handler for TUMA button click
  const handleTumaClick = () => {
    setShowPaymentDetails(false); // Adjust based on TUMA implementation
  };

  return (
    <div className="md:p-6 p-2 text-center items-center w-auto space-y-3 font-poppins rounded-lg">
      <p className="text-xl font-semibold mb-4">Choose your desired Payment method</p>
      <p className="text-xs">Kindly proceed to pay KES 30,000 for your account application fees to cater for NEEMA,</p>
      <p className="text-xs">site visit, bill of quantities, county charges, valuation, physical planning, NCA, and other</p>
      <p className="text-xs">building approvals and licenses</p>

      <div className='flex items-center justify-center'>
        {/* Payment Button with M-Pesa Logo */}
        <button 
          className="border border-[#53C064] bg-[#F1FCFB] mr-4 px-4 rounded-3xl flex items-center justify-center space-x-2"
          onClick={handleMpesaClick}
        >
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/1/15/M-PESA_LOGO-01.svg" 
            alt="M-Pesa Logo" 
            className="h-11 w-32"
          />
        </button>

        {/* Payment Button with TUMA Logo */}
        <div 
          className="border border-[#a29eee] h-12 w-44 bg-[#F1F2FC] px-4 rounded-3xl font-bold font-serif text-purple-500 flex items-center justify-center space-x-2"
          onClick={handleTumaClick}
        >
          TUMA
        </div>
      </div>

      {/* Payment Details Section */}
      {showPaymentDetails && (
        <div className="md:w-[600px] w-full h-auto border border-[#53C064] items-center md:py-11 md:px-16 p-3 rounded-3xl md:mx-auto bg-[#f9f9f9]">
          <p className='text-start font-bold mb-2'>Payment Details</p>
          <div className='flex mb-3'>
            <div className="md:h-12 md:w-52 md:mr-8 mr-4 border border-[#53C064] bg-[#F1FCFB] md:py-7 px-1 rounded-md flex items-center justify-center">
              <svg
                width="32"
                height="32"
                viewBox="0 0 42 42"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <rect width="36" height="36" fill="url(#pattern0_118_1663)" />
                <defs>
                  <pattern
                    id="pattern0_118_1663"
                    patternContentUnits="objectBoundingBox"
                    width="1"
                    height="1"
                  >
                    <use xlinkHref="#image0_118_1663" transform="scale(0.01)" />
                  </pattern>
                  <image
                    id="image0_118_1663"
                    width="100"
                    height="100"
                    xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAD3klEQVR4nO2dTU8UQRCG24vEu3pQ/D+c1OliD96UaoUoa+JZDypnidFE/4hZLybVEEU8rHjw6g8A/EDgipjexQQcXGZ7epyu7nqSukw23W/VO9XzsTuzSgmCIAiCIAiMmep1J8DiXW1xVVuzC9bsxxzamt2BVsL5zufOaZUSnTezF8GaT20XGbzNwTWXg0qnM/iaAX9MIfMxiU5xy1TbxYRQsWTuKO5oMh9aL6QNFfhecUdb3Gm/kCZIuFwUd9ouIgQOxZ22CwhiiBgSNW3v0SAdIoZETdt7NEiHiCFR0/YeDdIhow1RzADm+pNLCJjrTy4hYK4/uYSAuf7kEgLm+pNLCJjrTy4hYK4/uYSAuf7kEgLm+pNLCJjrTy4hYK4/uYQ04ffDobjD3ZDkEEMiQwyJDDEkE0Mggi+rQkSoengXrqlxgWmEqod34ZoaF5hGqHp4F66pcYFphKqHd+GaGheOxlcVCZrMNzHExmOI05K9IdqaRRUJTkuWhmgyG4PlgfBJTI+eOS3OlANt69kYogJQvJs7DxYX3EOew6dwza57ttBt6yzfOBdiDjGkIgWZaSCz/a+lRZP5CRa1qokYUt2MXyedomrCvbqmiCFVlqkRnVEyxeJWneUrW0M6K/fOgDXPwZofw8Bnblt5HFwY+4KOzCP/+TI1RFt8eUwxXxwzztgvNXAH+hrz5WqIKb9Phcx2aZwxlqtR41SeL19DcPOYPXsjhCHujMt7vmwNIfOgVCCL90ufs7g2fodg33e+bA1R++oUkJnThMsuppdw1m37+2Pamscehjz0nS9fQyriTmGHF30VlyuLW9fo1lnliRhSAXexN7zoO+nYgXuaZq7Wm0s6pLopFrdGdUZhTVF/HjGkMm4pchd97qA9eIuROwMj7LttdZapLA0BwvXBzz2tWYzt9jsQPh3+FNVs5GOIjfMLKmfGKK2ZGIKbKhLkO3UrhkTXIcAoQtXDu3BNjQtMI1Q9vAvX1LjANELVw7twTY0LTCNUPbwL998FCEcRQyJDDIkMMSQyuBsCZL4cDsUd9oZY3vqTSwiY608uIWCuP7mEgLn+5BIC5vqTSwiY608uIWCuv0TbN++A+83A0LRdQBBDxJCoaXuPBukQMSRq2t6jQTqkMUNe+fxBcEFmUhP2QulQ3AlViILMpK+GK0vXL4khYkichNozNWHPp0sOuuO1dEiKf05M5Yc92aEtriZkyIriTkGm23YhIVAU9uZtxZ2pXnfC69FjG1kQ9mN6EKgW7vqBtSmE/ctvZy6olBi8WY1w3q3DHA702uKO0+qWqWQ6QxAEQRAEQeXKb4xGloaImE0NAAAAAElFTkSuQmCC"
                  />
                </defs>
              </svg>
              <div className='ml-2 font-semibold text-start'>
                <p className='text-xs text-[#3AB54B]'>Paybill No.</p>
                <p className='text-xs'>4091763</p>
              </div>
            </div>
            <div className="h-12 w-52 border border-[#53C064] py-7 bg-[#F1FCFB] rounded-md flex items-center justify-center">
              <img src={userIcon} alt="User Icon" className="h-6 w-6" />
              <div className='ml-2 font-semibold text-xs text-start'>
                <p className='text-[#3AB54B] text-xs '>Account No. </p>
                <p className='text-xs'> ID/Passport No.</p>
              </div>
            </div>
          </div>
          <div className='text-start mb-5'>
            <p className='font-bold'>Instructions</p>
            <div className='text-xs '>
            <div className="flex items-start mt-3">
              <img src={tickIcon} alt="Tick" className="h-4 w-4 mr-2" style={{ fill: '#3AB54B' }} />
              <p>Use the above Paybill Number (4091763) to pay KES 30,000/= to Promitto Ltd.</p>
            </div>

            <div className="flex items-start mt-2">
              <img src={tickIcon} alt="Tick" className="h-4 w-4 mr-2" style={{ fill: '#3AB54B' }} />
              <p>Once you have received a message from MPesa, enter your phone number and the 10 digit Transaction code e.g. AD00098FR1</p>
            </div>

            <div className="flex items-start mt-2">
              <img src={tickIcon} alt="Tick" className="h-4 w-4 mr-2" style={{ fill: '#3AB54B' }} />
              <p>Click Confirm Payment button to finish.</p>
            </div>
          </div>
          </div>
               
            
        
            {/*label and input for phone and mpesa reference*/}
            <div className="mb-4 text-start">
            <label htmlFor="phoneNumber" className="block text-sm text-[#3AB54B] font-medium  mb-1">
              Enter your phone number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="e.g. 0712345678"
              className="mt-1 block md:w-full w-2/3 border border-[#53C064] rounded-md shadow-sm focus:outline-none focus:border-2 focus:border-[#3AB54B] p-2"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
            </div>

            <div className="mb-4 text-start">
            <label htmlFor="transactionCode" className="block text-sm font-medium text-[#3AB54B] mb-1">
              Enter MPesa transaction code
            </label>
            <input
              type="text"
              id="transactionCode"
              name="transactionCode"
              placeholder="e.g. RXCE45322P"
              className="mt-1 block md:w-full w-2/3 border border-[#53C064] rounded-md shadow-sm focus:outline-none focus:border-2 focus:border-[#3AB54B] p-2"
              value={transactionCode}
              onChange={(e) => setTransactionCode(e.target.value)}
              required
            />

            </div>
  
           
            <button class=" bg-white border text-xs border-[#53C064] mt-8  font-bold md:py-3 py-2 md:px-4 px-1 rounded-3xl flex justify-center  text-[#3AB54B]"
                           onClick={handleConfirmPayment}
             >
                Confirm Payment

                <img 
              src="https://upload.wikimedia.org/wikipedia/commons/1/15/M-PESA_LOGO-01.svg" 
              alt="M-Pesa Logo" 
              className="h-5 w-16"
            />
            </button>
            </div>

            
      )} 
      <div className='flex md:mx-56 md:space-x-[200px] justify-between'>
        <button class=" bg-gray-200 text-sm  mt-8  font-medium  py-2 md:px-4 px-2 rounded flex justify-center  "
                           onClick={onPrevious}
             >
                Previous
            </button>
            <button class= " text-sm  bg-[#F2B807] mt-8 rounded font-medium py-2 md:px-4 px-2 flex justify-center  text-white"
                           onClick={handleConfirmPayment}
             >
                Save & Continue
            </button>
        

            </div>
    </div>
  );
};

export default Remittance;