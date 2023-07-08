import { createSlice } from "@reduxjs/toolkit";
import { light } from "themes";

const initialState = {
  theme: light,
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      const { theme } = action.payload;
      state.theme = theme;
    },
  },
});

export const { setTheme } = commonSlice.actions;

export default commonSlice.reducer;
