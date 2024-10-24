import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  personalDetails: {},
  nextOfKin: {},
  remittanceDetails: {}, // Add remittanceDetails to the initial state
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    savePersonalDetails: (state, action) => {
      state.personalDetails = action.payload;
    },
    saveNextOfKin: (state, action) => {
      state.nextOfKin = action.payload; // Save Next of Kin data
    },
    saveRemittanceDetails: (state, action) => {
      state.remittanceDetails = action.payload; // Save Remittance details
    },
  },
});

export const { savePersonalDetails, saveNextOfKin, saveRemittanceDetails } = formSlice.actions;

export default formSlice.reducer;
