/* eslint-disable import/prefer-default-export */
/* eslint-disable no-undef */
import {
  FILES_DELETE_FILE,
  FILES_DELETE_FILE_FAIL,
  FILES_DELETE_FILE_SUCCESS,
} from "./actionTypes";

import token from "../../../config";
import { fetchData } from "../../../actions/fetchData";

export const deleteItem = (id, icon) => (dispatch) => {
  dispatch({ type: FILES_DELETE_FILE });

  const url = `http://34.105.195.56${
    icon === "file" ? "/FileUploader/DeleteFile" : "/Folder/DeleteFolder"
  }`;

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
    .then(() => {
      dispatch(fetchData());
      return dispatch({ type: FILES_DELETE_FILE_SUCCESS });
    })
    .catch(() => dispatch({ type: FILES_DELETE_FILE_FAIL }));
};
