import { REQUEST_OTP } from "./constants";
export const requestOTPHandler = (payload, onSuccess, onError) => ({
  type: REQUEST_OTP.HANDLER,
  payload,
  onSuccess,
  onError,
});
export const requestOTPSuccess = (payload) => ({
  type: REQUEST_OTP.SUCCESS,
  payload,
});
export const requestOTPFailed = (payload) => ({
  type: REQUEST_OTP.FAILURE,
  payload,
});
