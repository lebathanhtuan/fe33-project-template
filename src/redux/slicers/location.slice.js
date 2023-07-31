import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cityList: {
    data: [],
    loading: false,
    error: "",
  },
  districtList: {
    data: [],
    loading: false,
    error: "",
  },
  wardList: {
    data: [],
    loading: false,
    error: "",
  },
};

export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    // getCityList
    getCityListRequest: (state, action) => {
      state.cityList.loading = true;
      state.cityList.error = null;
    },
    getCityListSuccess: (state, action) => {
      const { data } = action.payload;
      state.cityList.loading = false;
      state.cityList.data = data;
    },
    getCityListFailure: (state, action) => {
      const { error } = action.payload;
      state.cityList.loading = false;
      state.cityList.error = error;
    },
    // getDistrictList
    getDistrictListRequest: (state, action) => {
      state.districtList.loading = true;
      state.districtList.error = null;
    },
    getDistrictListSuccess: (state, action) => {
      const { data } = action.payload;
      state.districtList.loading = false;
      state.districtList.data = data;
    },
    getDistrictListFailure: (state, action) => {
      const { error } = action.payload;
      state.districtList.loading = false;
      state.districtList.error = error;
    },
    // getWardList
    getWardListRequest: (state, action) => {
      state.wardList.loading = true;
      state.wardList.error = null;
    },
    getWardListSuccess: (state, action) => {
      const { data } = action.payload;
      state.wardList.loading = false;
      state.wardList.data = data;
    },
    getWardListFailure: (state, action) => {
      const { error } = action.payload;
      state.wardList.loading = false;
      state.wardList.error = error;
    },
  },
});

export const {
  getCityListRequest,
  getCityListSuccess,
  getCityListFailure,
  getDistrictListRequest,
  getDistrictListSuccess,
  getDistrictListFailure,
  getWardListRequest,
  getWardListSuccess,
  getWardListFailure,
} = locationSlice.actions;

export default locationSlice.reducer;
