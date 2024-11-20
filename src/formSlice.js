import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  personalDetails: {},
  nextOfKin: {},
  remittanceDetails: {
    phoneNumber: '',
    transactionCode: '',
  }, 
  employmentDetails: {},
  businessDetails: {},
  propertyDetails: {},
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    savePersonalDetails: (state, action) => {
      state.personalDetails = action.payload;
    },
    saveNextOfKin: (state, action) => {
      state.nextOfKin = action.payload; 
    },
    saveRemittanceDetails: (state, action) => {
      // Save only accountNumber and transactionCode without the payment method
      state.remittanceDetails = action.payload;
  
    },
    saveEmploymentDetails: (state, action) => {
      state.employmentDetails = action.payload; 
    },
    saveBusinessDetails: (state, action) => {
      state.businessDetails = action.payload; 
    },
    savePropertyDetails: (state, action) => {
      state.propertyDetails = action.payload; 
    },
  },
});

export const { 
  savePersonalDetails, 
  saveNextOfKin, 
  saveRemittanceDetails, 
  saveEmploymentDetails,  
  saveBusinessDetails,
  savePropertyDetails 
} = formSlice.actions;

export default formSlice.reducer;
