/* eslint-disable no-undef */
/* eslint-disable import/prefer-default-export */
import {
  OWNER_FETCH_OWNER_INFO,
  OWNER_LOAD_OWNER_INFO_FAIL,
  OWNER_LOAD_OWNER_INFO_SUCCESS,
} from "./actionTypes";

import { getToken } from "../../../__shared/functions";

export const fetchOwnerInfo = (id) => (dispatch) => {
  dispatch({ type: OWNER_FETCH_OWNER_INFO });

  const url = "http://34.105.195.56/User/UserInfo";
  const token = getToken();

  fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      id,
    }),
  })
    .then((res) => res.json())
    .then((data) =>
      dispatch({
        type: OWNER_LOAD_OWNER_INFO_SUCCESS,
        payload: { name: data.FirstName, surname: data.LastName },
      })
    )
    .catch((err) =>
      dispatch({ type: OWNER_LOAD_OWNER_INFO_FAIL, payload: err })
    );
};
