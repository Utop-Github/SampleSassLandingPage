/* eslint-disable eqeqeq */
import { SPIN_GIFT } from "./constants";

const initialState = {
  data: {},
  isLoading: true,
};

const spinGiftReducer = (state = initialState, action) => {
  switch (action?.type) {
    case SPIN_GIFT.HANDLER: {
      return {
        ...state,

        isLoading: true,
      };
    }
    case SPIN_GIFT.SUCCESS: {
      return {
        ...state,
        data: { ...action.payload },
        isLoading: false,
      };
    }
    case SPIN_GIFT.FAILURE: {
      return {
        ...state,
        isLoading: false,
      };
    }

    default:
      return state;
  }
};

export default spinGiftReducer;
