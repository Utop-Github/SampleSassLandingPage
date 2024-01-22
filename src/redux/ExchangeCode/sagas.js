import { call, delay, put, takeLatest } from "redux-saga/effects";

import { exchangeCodeFailed, exchangeCodeSuccess } from "./actions";

import { EXCHANGE_CODE } from "./constants";
import { exchangeCodeAPI } from "../../utils/api";

export function* exchangeCodeSaga(obj) {
  const { payload, onSuccess, onError } = obj;

  try {
    const res = yield call(exchangeCodeAPI, payload);
    if (res?.status >= 200 && res?.status <= 300) {
      yield put(exchangeCodeSuccess(res.data));
      onSuccess?.(res);
    } else {
      yield put(exchangeCodeFailed());
      onError?.();
    }
  } catch (err) {
    yield put(exchangeCodeFailed(err));
    onError?.(err);
  }
}

export default function* rootChild() {
  yield takeLatest(EXCHANGE_CODE.HANDLER, exchangeCodeSaga);
}
