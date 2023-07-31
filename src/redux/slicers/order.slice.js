import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderList: {
    data: [],
    loading: false,
    error: "",
  },
  orderProductData: {
    loading: false,
    error: null,
  },
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    // getOrderList
    getOrderListRequest: (state, action) => {
      state.orderList.loading = true;
      state.orderList.error = null;
    },
    getOrderListSuccess: (state, action) => {
      const { data } = action.payload;
      state.orderList.loading = false;
      state.orderList.data = data;
    },
    getOrderListFailure: (state, action) => {
      const { error } = action.payload;
      state.orderList.loading = false;
      state.orderList.error = error;
    },
    // orderProduct
    orderProductRequest: (state, action) => {
      state.orderProductData.loading = true;
      state.orderProductData.error = null;
    },
    orderProductSuccess: (state, action) => {
      state.orderProductData.loading = false;
    },
    orderProductFailure: (state, action) => {
      const { error } = action.payload;
      state.orderProductData.loading = false;
      state.orderProductData.error = error;
    },
  },
});

export const {
  getOrderListRequest,
  getOrderListSuccess,
  getOrderListFailure,
  orderProductRequest,
  orderProductSuccess,
  orderProductFailure,
} = orderSlice.actions;

export default orderSlice.reducer;
