import {
    OWNER_FETCH_OWNER,
    OWNER_LOAD_OWNER_FAIL,
    OWNER_LOAD_OWNER_SUCCESS
} from './actionTypes'

import token from '../config';

export const fetchOwner = () => (dispatch) => {
    dispatch({ type: OWNER_FETCH_OWNER });
  
    const url = "http://34.105.195.56/User/FilesInfo";
  
    fetch(url, { 
        method: 'GET', 
        headers: {
          'Authorization': `Bearer ${token}` 
        }
    })
      .then((res) => res.json())
      .then((data) => {
          console.log("owner", data[0].owner_id);
          return dispatch({ type: OWNER_LOAD_OWNER_SUCCESS, payload: data[0].owner_id });
      })
      .catch((err) => dispatch({ type: OWNER_LOAD_OWNER_FAIL, payload: err }));
  };