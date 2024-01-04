
import axios from "axios";
import * as types from "./CallActionType";
import { base_url } from "../../Config/Auth";


export const getAllCall = () => (dispatch) => {
    dispatch({
      type: types.ALL_CALL_LIST_REQUEST,
    });
    axios
      .get(`${base_url}/activities`)
      .then((res) => {
        console.log(res);       
        dispatch({
          type: types.ALL_CALL_LIST_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.ALL_CALL_LIST_FAILURE,
          payload: err,
        });
      });
  };

  export const getAllCallDetailsById = (id) => (dispatch) => {
    dispatch({
      type: types.CALL_DETAILS_BY_ID_REQUEST,
    });
    axios
      .get(`${base_url}/activities/${id}`)
      .then((res) => {
        console.log(res);       
        dispatch({
          type: types.CALL_DETAILS_BY_ID_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.CALL_DETAILS_BY_ID_FAILURE,
          payload: err,
        });
      });
  };

  export const updateCallDetailsById = (id,data) => (dispatch) => {
    dispatch({
      type: types.PATCH_CALL_DETAILS_BY_ID_REQUEST,
    });
    axios
      .patch(`${base_url}/activities/${id}`,data)
      .then((res) => {
        console.log(res);  
        dispatch(getAllCall());
        dispatch({
          type: types.PATCH_CALL_DETAILS_BY_ID_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.PATCH_CALL_DETAILS_BY_ID_FAILURE,
          payload: err,
        });
      });
  };