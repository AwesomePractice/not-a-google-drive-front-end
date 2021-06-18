import {
    FILES_LOAD_DATA_SUCCESS
  } from "../actions/actionTypes"

const initialFiles = []
const filesReducer = (files = initialFiles, action) => {
  switch (action.type) {
    case FILES_LOAD_DATA_SUCCESS:
      return action.payload
    default:
      return files;
  }
};

export default filesReducer;