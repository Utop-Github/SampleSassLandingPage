import { all, fork } from "redux-saga/effects";
import requestOTPSaga from "./RequestOTP/sagas";
import exchangeCodeSaga from "./ExchangeCode/sagas";
import spinGiftSaga from "./SpinGift/sagas";

export default function* rootSaga() {
  yield all([fork(requestOTPSaga)]);
  yield all([fork(exchangeCodeSaga)]);
  yield all([fork(spinGiftSaga)]);
}
