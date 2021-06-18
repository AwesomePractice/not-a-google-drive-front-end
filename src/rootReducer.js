import { combineReducers } from "redux"

import pageReducer from './reducers/pageReducer'
import ownerReducer from './reducers/ownerReducer'
import filesReducer from './reducers/filesReducer'
import rootFolderReducer from "./reducers/rootFolderReducer"

const rootReducer =  combineReducers({
    page: pageReducer,
    files: filesReducer,
    owner: ownerReducer,
    rootFolder: rootFolderReducer
  })

export default rootReducer