import { createSlice } from "@reduxjs/toolkit";
import qs from "qs";

const locationSearch = qs.parse(window.location.search, {
  ignoreQueryPrefix: true,
});
console.log("🚀 ~ file: common.slice.js:7 ~ locationSearch:", locationSearch);

const initialState = {
  theme: "light",
  filterParams: {
    categoryId: locationSearch.categoryId
      ? locationSearch.categoryId.map((id) => parseInt(id))
      : [],
    keyword: locationSearch.keyword || "",
    sort: locationSearch.sort || undefined,
  },
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      const { theme } = action.payload;
      state.theme = theme;
    },
    setFilterParams: (state, action) => {
      state.filterParams = action.payload;
    },
    clearFilterParams: (state) => {
      state.filterParams = {
        categoryId: [],
        keyword: "",
        sort: undefined,
      };
    },
  },
});

export const { setTheme, setFilterParams, clearFilterParams } =
  commonSlice.actions;

export default commonSlice.reducer;
