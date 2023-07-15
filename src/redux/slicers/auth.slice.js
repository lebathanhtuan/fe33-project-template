import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: {
    data: {},
    loading: false,
    error: null,
  },
  loginData: {
    loading: false,
    error: null,
  },
  registerData: {
    loading: false,
    error: null,
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest: (state, action) => {},
    loginSuccess: (state, action) => {},
    loginFailure: (state, action) => {},
    registerRequest: (state, action) => {},
    registerSuccess: (state, action) => {},
    registerFailure: (state, action) => {},
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
} = authSlice.actions;

export default authSlice.reducer;
