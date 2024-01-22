import { SPIN_GIFT } from "./constants";
export const spinGiftHandler = (payload, onSuccess, onError) => ({
  type: SPIN_GIFT.HANDLER,
  payload,
  onSuccess,
  onError,
});
export const spinGiftSuccess = (payload) => ({
  type: SPIN_GIFT.SUCCESS,
  payload,
});
export const spinGiftFailed = (payload) => ({
  type: SPIN_GIFT.FAILURE,
  payload,
});
