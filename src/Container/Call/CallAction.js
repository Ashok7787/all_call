
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