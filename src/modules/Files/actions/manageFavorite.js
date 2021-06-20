/* eslint-disable import/prefer-default-export */
/* eslint-disable no-undef */
import {
  FILES_MANAGE_FAVORITE,
  FILES_MANAGE_FAVORITE_FAIL,
  FILES_MANAGE_FAVORITE_SUCCESS,
} from "./actionTypes";

import { token } from "../../../config";
import { fetchData } from "../../../__shared/actions/fetchData";

export const manageFavorite = (id, isFavorite, isFolder) => (dispatch) => {
  dispatch({ type: FILES_MANAGE_FAVORITE });

  const url = `http://34.105.195.56${
    !isFolder
      ? "/FileUploader/SwitchFavouriteFile"
      : "/Folder/SwitchFavouriteFolder"
  }`;

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
      dispatch(fetchData());
      return dispatch({ type: FILES_MANAGE_FAVORITE_SUCCESS });
    })
    .catch(() => dispatch({ type: FILES_MANAGE_FAVORITE_FAIL }));
};
