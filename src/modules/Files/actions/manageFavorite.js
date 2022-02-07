/* eslint-disable import/prefer-default-export */
/* eslint-disable no-undef */
import {
  FILES_MANAGE_FAVORITE,
  FILES_MANAGE_FAVORITE_FAIL,
  FILES_MANAGE_FAVORITE_SUCCESS,
} from "./actionTypes";

import { getToken } from "../../../__shared/functions";
import { fetchData } from "../../../__shared/actions/fetchData";
import {serverBaseUri} from "../../../config"

export const manageFavorite = (id, isFavorite, isFolder) => (dispatch) => {
  dispatch({ type: FILES_MANAGE_FAVORITE });

  const url = `${serverBaseUri}${
    !isFolder
      ? "/FileUploader/SwitchFavouriteFile"
      : "/Folder/SwitchFavouriteFolder"
  }`;
  const token = getToken();

  fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      id,
      isFavourite: isFavorite,
    }),
  })
    .then(() => {
      if (response === 401 || response === 403) {
        localStorage.removeItem("token");
        window.location.reload();
      }
    })
    .then(() => {
      dispatch(fetchData());
      return dispatch({ type: FILES_MANAGE_FAVORITE_SUCCESS });
    })
    .catch(() => dispatch({ type: FILES_MANAGE_FAVORITE_FAIL }));
};
