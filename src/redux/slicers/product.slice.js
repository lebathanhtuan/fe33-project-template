import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productList: {
    data: [],
    loading: false,
    error: null,
  },
  productDetail: {
    data: {},
    loading: false,
    error: null,
  },
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getProductListRequest: (state, action) => {
      state.productList.loading = true;
      state.productList.error = null;
    },
    getProductListSuccess: (state, action) => {
      const { data } = action.payload;
      state.productList.loading = false;
      state.productList.data = data;
    },
    getProductListFailure: (state, action) => {
      const { error } = action.payload;
      state.productList.loading = false;
      state.productList.error = error;
    },
  },
});

export const {
  getProductListRequest,
  getProductListSuccess,
  getProductListFailure,
} = productSlice.actions;

export default productSlice.reducer;
