import { combineReducers } from "redux"

import pageReducer from './reducers/pageReducer'
import ownerReducer from './reducers/ownerReducer'
import filesReducer from './reducers/filesReducer'

const rootReducer =  combineReducers({
    page: pageReducer,
    files: filesReducer,
    owner: ownerReducer
  })

export default rootReducer