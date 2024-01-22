import { call, delay, put, takeLatest } from "redux-saga/effects";

import { requestOTPFailed, requestOTPSuccess } from "./actions";

import { REQUEST_OTP } from "./constants";
import { requestOTPAPI } from "../../utils/api";

export function* requestOTPSaga(obj) {
  const { payload, onSuccess, onError } = obj;

  try {
    const res = yield call(requestOTPAPI, payload);
    if (res?.status >= 200 && res?.status <= 300) {
      yield put(requestOTPSuccess(res.data));
      onSuccess?.(res);
    } else {
      yield put(requestOTPFailed());
      onError?.();
    }
  } catch (err) {
    yield put(requestOTPFailed(err));
    onError?.(err);
  }
}

export default function* rootChild() {
  yield takeLatest(REQUEST_OTP.HANDLER, requestOTPSaga);
}
