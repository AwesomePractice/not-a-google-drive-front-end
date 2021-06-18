import {
    FILES_LOAD_DATA_SUCCESS
  } from "../actions/actionTypes"

const initialFiles = []
const filesReducer = (files = initialFiles, action) => {
  switch (action.type) {
    case "files/addFavorite":
      // post 
      return files
    case "files/deleteFavorite":
      // post
      return files
    case FILES_LOAD_DATA_SUCCESS:
      console.log("files", files)
      return action.payload
    default:
      return files;
  }
};

export default filesReducer;