import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: {
    data: {},
    loading: true,
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
  updateUserInfoData: {
    load: false,
    error: "",
  },
  changePasswordData: {
    load: false,
    error: "",
  },
  changeAvatarData: {
    load: false,
    error: "",
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // login
    loginRequest: (state, action) => {
      state.loginData.loading = true;
      state.loginData.error = null;
    },
    loginSuccess: (state, action) => {
      const { data } = action.payload;
      state.loginData.loading = false;
      state.userInfo.data = data;
      state.userInfo.loading = false;
    },
    loginFailure: (state, action) => {
      const { error } = action.payload;
      state.loginData.loading = false;
      state.loginData.error = error;
      state.userInfo.loading = false;
    },
    // register
    registerRequest: (state, action) => {
      state.registerData.loading = true;
      state.registerData.error = null;
    },
    registerSuccess: (state, action) => {
      state.registerData.loading = false;
    },
    registerFailure: (state, action) => {
      const { error } = action.payload;
      state.registerData.loading = false;
      state.registerData.error = error;
    },
    // logout
    logoutRequest: (state, action) => {
      localStorage.removeItem("accessToken");
      state.userInfo.data = {};
    },
    // getUserInfo
    getUserInfoRequest: (state, action) => {
      state.userInfo.loading = true;
      state.userInfo.error = null;
    },
    getUserInfoSuccess: (state, action) => {
      const { data } = action.payload;
      state.userInfo.data = data;
      state.userInfo.loading = false;
    },
    getUserInfoFailure: (state, action) => {
      const { error } = action.payload;
      state.userInfo.loading = false;
      state.userInfo.error = error;
    },
    // updateUserInfo
    updateUserInfoRequest: (state, action) => {
      state.updateUserInfoData.loading = true;
      state.updateUserInfoData.error = null;
    },
    updateUserInfoSuccess: (state, action) => {
      const { data } = action.payload;
      state.updateUserInfoData.data = data;
      state.updateUserInfoData.loading = false;
    },
    updateUserInfoFailure: (state, action) => {
      const { error } = action.payload;
      state.updateUserInfoData.loading = false;
      state.updateUserInfoData.error = error;
    },
    // changePassword
    changePasswordRequest: (state, action) => {
      state.changePasswordData.loading = true;
      state.changePasswordData.error = null;
    },
    changePasswordSuccess: (state, action) => {
      state.changePasswordData.loading = false;
    },
    changePasswordFailure: (state, action) => {
      const { error } = action.payload;
      state.changePasswordData.loading = false;
      state.changePasswordData.error = error;
    },
    // changeAvatar
    changeAvatarRequest: (state, action) => {
      state.changeAvatarData.loading = true;
      state.changeAvatarData.error = null;
    },
    changeAvatarSuccess: (state, action) => {
      const { avatar } = action.payload;
      state.changeAvatarData.loading = false;
      state.userInfo.data.avatar = avatar;
    },
    changeAvatarFailure: (state, action) => {
      const { error } = action.payload;
      state.changeAvatarData.loading = false;
      state.changeAvatarData.error = error;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
  logoutRequest,
  getUserInfoRequest,
  getUserInfoSuccess,
  getUserInfoFailure,
  updateUserInfoRequest,
  updateUserInfoSuccess,
  updateUserInfoFailure,
  changePasswordRequest,
  changePasswordSuccess,
  changePasswordFailure,
  changeAvatarRequest,
  changeAvatarSuccess,
  changeAvatarFailure,
} = authSlice.actions;

export default authSlice.reducer;
