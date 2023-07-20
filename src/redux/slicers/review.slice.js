import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reviewList: {
    data: [],
    loading: false,
    error: null,
  },
  createReviewData: {
    loading: false,
    error: null,
  },
};

export const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    // getReviewList
    getReviewListRequest: (state, action) => {
      state.reviewList.loading = true;
      state.reviewList.error = null;
    },
    getReviewListSuccess: (state, action) => {
      const { data } = action.payload;
      state.reviewList.loading = false;
      state.reviewList.data = data;
    },
    getReviewListFailure: (state, action) => {
      const { error } = action.payload;
      state.reviewList.loading = false;
      state.reviewList.error = error;
    },
    // createReview
    createReviewRequest: (state, action) => {
      state.createReviewData.loading = true;
      state.createReviewData.error = null;
    },
    createReviewSuccess: (state, action) => {
      state.createReviewData.loading = false;
    },
    createReviewFailure: (state, action) => {
      const { error } = action.payload;
      state.createReviewData.loading = false;
      state.createReviewData.error = error;
    },
  },
});

export const {
  getReviewListRequest,
  getReviewListSuccess,
  getReviewListFailure,
  createReviewRequest,
  createReviewSuccess,
  createReviewFailure,
} = reviewSlice.actions;

export default reviewSlice.reducer;
