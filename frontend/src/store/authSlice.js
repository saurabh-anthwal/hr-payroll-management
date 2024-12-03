// src/store/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  password: '',
  error: '',
  otp: '',
  newPassword: '',
  showOtpForm: false,
  currentForm: 'login', // Can be 'login' or 'otp'
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setOtp: (state, action) => {
      state.otp = action.payload;
    },
    setNewPassword: (state, action) => {
      state.newPassword = action.payload;
    },
    setShowOtpForm: (state, action) => {
      state.showOtpForm = action.payload;
    },
    setCurrentForm: (state, action) => {
      state.currentForm = action.payload;
    },
    clearAuthState: (state) => {
      state.email = '';
      state.password = '';
      state.error = '';
      state.otp = '';
      state.newPassword = '';
      state.showOtpForm = false;
      state.currentForm = 'login';
    },
  },
});

export const {
  setEmail,
  setPassword,
  setError,
  setOtp,
  setNewPassword,
  setShowOtpForm,
  setCurrentForm,
  clearAuthState,
} = authSlice.actions;

export default authSlice.reducer;
