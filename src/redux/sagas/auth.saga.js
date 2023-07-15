import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

import {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
} from "redux/slicers/auth.slice";

function* loginSaga(action) {
  try {
    yield put(loginSuccess({ data: "" }));
  } catch (e) {
    yield put(loginFailure("Đã có lỗi xảy ra!"));
  }
}

function* registerSaga(action) {
  try {
    yield put(registerSuccess({ data: "" }));
  } catch (e) {
    yield put(registerFailure("Đã có lỗi xảy ra!"));
  }
}

export default function* categorySaga() {
  yield takeEvery(loginRequest.type, loginSaga);
  yield takeEvery(registerRequest.type, registerSaga);
}
