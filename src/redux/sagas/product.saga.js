import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

import {
  getProductListRequest,
  getProductListSuccess,
  getProductListFailure,
} from "redux/slicers/product.slice";

function* getProductListSaga(action) {
  try {
    const { page, limit, categoryId } = action.payload;
    const result = yield axios.get("http://localhost:4000/products", {
      params: {
        _page: page,
        _limit: limit,
        categoryId: categoryId,
      },
    });
    yield put(getProductListSuccess({ data: result.data }));
  } catch (e) {
    yield put(getProductListFailure("Đã có lỗi xảy ra!"));
  }
}

export default function* productSaga() {
  yield takeEvery(getProductListRequest.type, getProductListSaga);
}
