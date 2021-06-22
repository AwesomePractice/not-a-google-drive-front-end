/* eslint-disable no-undef */
/* eslint-disable import/prefer-default-export */
import {
  OWNER_FETCH_OWNER,
  OWNER_LOAD_OWNER_FAIL,
  OWNER_LOAD_OWNER_SUCCESS,
} from "./actionTypes";

import { getToken } from "../../../__shared/functions";
import { fetchOwnerInfo } from "./fetchOwnerInfo";

export const fetchOwner = () => (dispatch) => {
  dispatch({ type: OWNER_FETCH_OWNER });

  const url = "http://34.105.195.56/User/FilesInfo";
  const token = getToken();

  fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          Promise.all([dispatch(fetchOwnerInfo(data[0].owner_id))]);
          return dispatch({
            type: OWNER_LOAD_OWNER_SUCCESS,
            payload: data[0].owner_id,
          });
        });
      } else if (response === 401 || response === 403) {
        localStorage.removeItem("token");
        window.location.reload();
      } else {
        catchError(response);
      }
    })
    .catch((err) => dispatch({ type: OWNER_LOAD_OWNER_FAIL, payload: err }));
};
