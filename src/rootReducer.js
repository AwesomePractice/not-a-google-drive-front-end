import { combineReducers } from "redux";

import pageReducer from "./reducers/pageReducer";
import ownerReducer from "./reducers/ownerReducer";
import filesReducer from "./reducers/filesReducer";
import rootFolderReducer from "./reducers/rootFolderReducer";
import sharedFilesReducer from "./reducers/sharedFilesReducer";

const rootReducer = combineReducers({
  page: pageReducer,
  files: filesReducer,
  owner: ownerReducer,
  rootFolder: rootFolderReducer,
  sharedFiles: sharedFilesReducer,
});

export default rootReducer;
