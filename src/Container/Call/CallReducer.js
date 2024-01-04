import * as types from "./CallActionType";
const initialState = {
 
  fetchAllCallList: false,
  fetchAllCallListError: false,
  allCallList:[]

  
};
export const callReducer = (state = initialState, action) => {
  switch (action.type) {
   
            case types.ALL_CALL_LIST_REQUEST:
              return { ...state, fetchAllCallList: true };
            case types.ALL_CALL_LIST_SUCCESS:
              return {
                ...state,
                fetchAllCallList: false,
                allCallList: action.payload,
              };
        
            case types.ALL_CALL_LIST_FAILURE:
              return {
                ...state,
                fetchAllCallList: false,
                fetchAllCallListError: true,
              };

    default:
      return state;
  }
};
