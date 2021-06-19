import { FILES_DELETE_FILE, FILES_DELETE_FILE_FAIL, FILES_DELETE_FILE_SUCCESS } from './actionTypes'

import token from '../config';
import { fetchData } from './fetchData';

export const deleteFile = (id) => (dispatch) => {
    dispatch({ type: FILES_DELETE_FILE });
    
    console.log(id)
    const url = "http://34.105.195.56/FileUploader/DeleteFile"
  
    fetch(url, { 
        method: 'POST', 
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
            "id" : id
        })
    })
      .then((res) => {
          dispatch(fetchData())
          return dispatch({type: FILES_DELETE_FILE_SUCCESS})
      })
      .catch((err) => dispatch({ type: FILES_DELETE_FILE_FAIL}))
  };