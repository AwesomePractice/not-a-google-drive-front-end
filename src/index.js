import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from "redux"
import { Provider } from "react-redux"
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

import pageReducer from './reducers/pageReducer'
import ownerReducer from './reducers/ownerReducer'
import filesReducer from './reducers/filesReducer'


const store = createStore(
  combineReducers({
    page: pageReducer,
    files: filesReducer,
    owner: ownerReducer
  })
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
