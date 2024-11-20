// src/store/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  user: null,
  status: 'idle',  // idle | loading | success | failed
  message: '',
};

const loginSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { token, user, message } = action.payload;
      state.token = token;
      state.user = user;
      state.status = 'success';
      state.message = message;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.status = 'idle';
      state.message = '';
    },
  },
});

export const { loginSuccess, logout } = loginSlice.actions;
export default loginSlice.reducer;
