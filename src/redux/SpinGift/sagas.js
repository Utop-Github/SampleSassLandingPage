import { call, delay, put, takeLatest } from "redux-saga/effects";

import { SPIN_GIFT } from "./constants";
import { spinGiftAPI } from "../../utils/api";
import { spinGiftFailed, spinGiftSuccess } from "./actions";

export function* spinGiftSaga(obj) {
  const { payload, onSuccess, onError } = obj;

  try {
    const res = yield call(spinGiftAPI, payload);
    if (res?.status >= 200 && res?.status <= 300) {
      yield put(spinGiftSuccess(res.data));
      onSuccess?.(res);
    } else {
      yield put(spinGiftFailed());
      onError?.();
    }
  } catch (err) {
    yield put(spinGiftFailed(err));
    onError?.(err);
  }
}

export default function* rootChild() {
  yield takeLatest(SPIN_GIFT.HANDLER, spinGiftSaga);
}
