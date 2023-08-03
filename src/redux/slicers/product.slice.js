import { createSlice } from "@reduxjs/toolkit";

import {
  favoriteProductSuccess,
  unFavoriteProductSuccess,
} from "redux/slicers/favorite.slice";

const initialState = {
  productList: {
    data: [],
    meta: {},
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
    // getProductList
    getProductListRequest: (state, action) => {
      state.productList.loading = true;
      state.productList.error = null;
    },
    getProductListSuccess: (state, action) => {
      const { data, meta, more } = action.payload;
      state.productList.loading = false;
      state.productList.data = more
        ? [...state.productList.data, ...data]
        : data;
      state.productList.meta = meta;
    },
    getProductListFailure: (state, action) => {
      const { error } = action.payload;
      state.productList.loading = false;
      state.productList.error = error;
    },
    // getProductDetail
    getProductDetailRequest: (state, action) => {
      state.productDetail.loading = true;
      state.productDetail.error = null;
    },
    getProductDetailSuccess: (state, action) => {
      const { data } = action.payload;
      state.productDetail.loading = false;
      state.productDetail.data = data;
    },
    getProductDetailFailure: (state, action) => {
      const { error } = action.payload;
      state.productDetail.loading = false;
      state.productDetail.error = error;
    },
  },
  extraReducers: {
    [favoriteProductSuccess.type]: (state, action) => {
      const { data } = action.payload;
      state.productDetail.data.favorites.push(data);
    },
    [unFavoriteProductSuccess.type]: (state, action) => {
      const { id } = action.payload;
      state.productDetail.data.favorites =
        state.productDetail.data.favorites.filter((item) => item.id !== id);
    },
  },
});

export const {
  getProductListRequest,
  getProductListSuccess,
  getProductListFailure,
  getProductDetailRequest,
  getProductDetailSuccess,
  getProductDetailFailure,
} = productSlice.actions;

export default productSlice.reducer;
