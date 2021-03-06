/* eslint-disable import/prefer-default-export */
/* eslint-disable no-undef */
import {
  FILES_DELETE_FILE,
  FILES_DELETE_FILE_FAIL,
  FILES_DELETE_FILE_SUCCESS,
} from "./actionTypes";

import {serverBaseUri} from "../../../config"

import { getToken } from "../../../__shared/functions";
import { fetchData } from "../../../__shared/actions/fetchData";

export const deleteItem = (id, isFolder) => (dispatch) => {
  dispatch({ type: FILES_DELETE_FILE });

  const url = `${serverBaseUri}${
    !isFolder ? "/FileUploader/DeleteFile" : "/Folder/DeleteFolder"
  }`;
  const token = getToken();

  function status(response) {
    if (response === 401 || response === 403) {
      localStorage.removeItem("token");
      window.location.reload();
    }
    return response;
  }

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
    .then(status)
    .then(() => {
      dispatch(fetchData());
      return dispatch({ type: FILES_DELETE_FILE_SUCCESS });
    })
    .catch(() => dispatch({ type: FILES_DELETE_FILE_FAIL }));
};
