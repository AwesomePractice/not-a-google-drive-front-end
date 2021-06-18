import { FILES_FETCH_DATA, FILES_MANAGE_FAVORITE, FILES_MANAGE_FAVORITE_FAIL, FILES_MANAGE_FAVORITE_SUCCESS } from './actionTypes'

import token from '../config';
import { fetchData } from './fetchData';

export const manageFavorite = (id, isFavorite) => (dispatch) => {
    dispatch({ type: FILES_MANAGE_FAVORITE });
  
    const url = "http://34.105.195.56/FileUploader/SwitchFavouriteFile"
  
    fetch(url, { 
        method: 'POST', 
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-type': 'application/json'
        },
        body: {
            "fileId" : id,
            "isFavorite" : isFavorite
        }
    })
      .then((res) => {
          return dispatch({type: FILES_MANAGE_FAVORITE_SUCCESS})
      })
      .catch((err) => dispatch({ type: FILES_MANAGE_FAVORITE_FAIL}))
  };