import * as types from "./CallActionType";
const initialState = {
 
  fetchAllCallList: false,
  fetchAllCallListError: false,
  allCallList:[],

  fetchCallDetailsById: false,
  fetchCallDetailsByIdError: false,

  callDetails:{},
  updateCallDetailsById: false,
  updateCallDetailsByIdError: false,

  
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

              case types.CALL_DETAILS_BY_ID_REQUEST:
              return { ...state, fetchCallDetailsById: true };
            case types.CALL_DETAILS_BY_ID_SUCCESS:
              return {
                ...state,
                fetchCallDetailsById: false,
                callDetails: action.payload,
              };
        
            case types.CALL_DETAILS_BY_ID_FAILURE:
              return {
                ...state,
                fetchCallDetailsById: false,
                fetchCallDetailsByIdError: true,
              };

              case types.PATCH_CALL_DETAILS_BY_ID_REQUEST:
              return { ...state, updateCallDetailsById: true };
            case types.PATCH_CALL_DETAILS_BY_ID_SUCCESS:
              return {
                ...state,
                updateCallDetailsById: false,
              };
        
            case types.PATCH_CALL_DETAILS_BY_ID_FAILURE:
              return {
                ...state,
                updateCallDetailsById: false,
                updateCallDetailsByIdError: true,
              };

    default:
      return state;
  }
};
