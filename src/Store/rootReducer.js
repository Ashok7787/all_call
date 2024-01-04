import { combineReducers } from "redux";
import { callReducer } from "../Container/Call/CallReducer";
/**
 *  All of application reducers import goes here...
 */

const appReducer = combineReducers({
 call: callReducer
});

const rootReducer = (state, action) => {
  // if (action.type === LOGOUT_SUCCESS) {
  //   sessionStorage.clear();
  //   state = undefined;
  // }
  return appReducer(state, action);
};
export default rootReducer;
