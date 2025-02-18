// fileSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uploadedFileUrl: null,
  fileName: "",
};

const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    setUploadedFileUrl: (state, action) => {
      state.uploadedFileUrl = action.payload;
    },
    setFileName: (state, action) => {
      state.fileName = action.payload;
    },
  },
});

export const { setUploadedFileUrl, setFileName } = fileSlice.actions;

export default fileSlice.reducer;
