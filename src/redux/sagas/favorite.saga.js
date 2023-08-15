import { takeEvery, put, select } from "redux-saga/effects";
import axios from "axios";

import {
  getFavoriteListRequest,
  getFavoriteListSuccess,
  getFavoriteListFailure,
  favoriteProductRequest,
  favoriteProductSuccess,
  favoriteProductFailure,
  unFavoriteProductRequest,
  unFavoriteProductSuccess,
  unFavoriteProductFailure,
} from "redux/slicers/favorite.slice";

function* getFavoriteListSaga(action) {
  try {
    const { userId, page, limit } = action.payload;
    const result = yield axios.get("http://localhost:4000/favorites", {
      params: {
        userId: userId,
        _expand: "product",
        _page: page,
        _limit: limit,
      },
    });
    yield put(
      getFavoriteListSuccess({
        data: result.data,
        meta: {
          page: page,
          limit: limit,
          total: parseInt(result.headers["x-total-count"]),
        },
      })
    );
  } catch (e) {
    yield put(getFavoriteListFailure({ error: "Lỗi" }));
  }
}

function* favoriteProductSaga(action) {
  try {
    const result = yield axios.post(
      "http://localhost:4000/favorites",
      action.payload
    );
    yield put(favoriteProductSuccess({ data: result.data }));
  } catch (e) {
    yield put(favoriteProductFailure({ error: "Lỗi" }));
  }
}

function* unFavoriteProductSaga(action) {
  try {
    const { id, userId } = action.payload;
    yield axios.delete(`http://localhost:4000/favorites/${id}`);
    if (userId) {
      const { favoriteList } = yield select((state) => state.favorite);
      if (
        favoriteList.meta.total - 1 <=
        (favoriteList.meta.page - 1) * favoriteList.meta.limit
      ) {
        yield put(
          getFavoriteListRequest({
            userId: userId,
            page: favoriteList.meta.page - 1,
            limit: favoriteList.meta.limit,
          })
        );
      } else {
        yield put(
          getFavoriteListRequest({
            userId: userId,
            page: favoriteList.meta.page,
            limit: favoriteList.meta.limit,
          })
        );
      }
    }
    yield put(unFavoriteProductSuccess({ id: id }));
  } catch (e) {
    yield put(unFavoriteProductFailure({ error: "Lỗi" }));
  }
}

export default function* favoriteSaga() {
  yield takeEvery(getFavoriteListRequest.type, getFavoriteListSaga);
  yield takeEvery(favoriteProductRequest.type, favoriteProductSaga);
  yield takeEvery(unFavoriteProductRequest.type, unFavoriteProductSaga);
}
