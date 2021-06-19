import {
    FILES_FETCH_DATA,
    FILES_LOAD_DATA_FAIL,
    FILES_LOAD_DATA_SUCCESS
} from './actionTypes'

import token from '../config';

export const fetchData = () => (dispatch) => {
    dispatch({ type: FILES_FETCH_DATA });
  
    const url = "http://34.105.195.56/User/FilesInfo";
  
    fetch(url, { 
        method: 'GET', 
        headers: {
          'Authorization': `Bearer ${token}` 
        }
    })
      .then((res) => res.json())
      .then((data) => {
          console.log("data", data[0].root_folder);
          return dispatch({ type: FILES_LOAD_DATA_SUCCESS, payload: data[0].root_folder });
      })
      .catch((err) => dispatch({ type: FILES_LOAD_DATA_FAIL, payload: err }));
  };