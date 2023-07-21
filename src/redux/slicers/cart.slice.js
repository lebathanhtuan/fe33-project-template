import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartList: JSON.parse(localStorage.getItem("cartList")) || [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCartRequest: (state, action) => {
      const { data } = action.payload;
      let newCartList = [...state.cartList];
      const existProductIndex = state.cartList.findIndex(
        (item) => item.productId === data.productId
      );
      if (existProductIndex !== -1) {
        const newProduct = {
          ...state.cartList[existProductIndex],
          quantity: state.cartList[existProductIndex].quantity + data.quantity,
        };
        newCartList.splice(existProductIndex, 1, newProduct);
      } else {
        newCartList = [data, ...state.cartList];
      }
      localStorage.setItem("cartList", JSON.stringify(newCartList));
      state.cartList = newCartList;
    },
    updateCartRequest: (state, action) => {
      const { productId, value } = action.payload;
      const existProductIndex = state.cartList.findIndex(
        (item) => item.productId === productId
      );
      const newProduct = {
        ...state.cartList[existProductIndex],
        quantity: value,
      };
      state.cartList.splice(existProductIndex, 1, newProduct);
    },
    deleteCartRequest: (state, action) => {
      const { productId } = action.payload;
      state.cartList = state.cartList.filter(
        (item) => item.productId !== productId
      );
    },
  },
});

export const { addToCartRequest, updateCartRequest, deleteCartRequest } =
  cartSlice.actions;

export default cartSlice.reducer;
