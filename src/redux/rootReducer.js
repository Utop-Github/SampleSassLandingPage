import { combineReducers } from "redux";
import spinGiftReducer from "./SpinGift/reducer";

const rootReducer = combineReducers({
  spinGift: spinGiftReducer,
});

export default rootReducer;
