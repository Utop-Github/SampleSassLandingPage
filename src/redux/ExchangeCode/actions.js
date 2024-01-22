import { EXCHANGE_CODE } from "./constants";
export const exchangeCodeHandler = (payload, onSuccess, onError) => ({
  type: EXCHANGE_CODE.HANDLER,
  payload,
  onSuccess,
  onError,
});
export const exchangeCodeSuccess = (payload) => ({
  type: EXCHANGE_CODE.SUCCESS,
  payload,
});
export const exchangeCodeFailed = (payload) => ({
  type: EXCHANGE_CODE.FAILURE,
  payload,
});
