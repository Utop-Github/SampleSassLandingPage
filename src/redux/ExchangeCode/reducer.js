/* eslint-disable eqeqeq */
import { REQUEST_OTP } from "./constants";

const initialState = {
  data: {},
  isLoading: true,
};

const requestOTPReducer = (state = initialState, action) => {
  switch (action?.type) {
    case REQUEST_OTP.HANDLER: {
      return {
        ...state,

        isLoading: true,
      };
    }
    case REQUEST_OTP.SUCCESS: {
      return {
        ...state,
        isLoading: false,
      };
    }

    default:
      return state;
  }
};

export default requestOTPReducer;
