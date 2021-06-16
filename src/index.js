import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import token from "./config"


const initialPage = "home";
const pageReducer = (page = initialPage, action) => {
  switch (action.type) {
    case "page/setPage":
      return action.payload ? action.payload : page
    default:
      return page;
  }
};

const initialFiles = fetch('http://34.105.195.56/User/FilesInfo', { 
  method: 'GET', 
  headers: new Headers({
    'Authorization': token, 
  })
});

const filesReducer = (files = initialFiles, action) => {
  switch (action.type) {
    case "favorites/addFavorite":
      // post 
      return [...files, action.payload]
    case "favorites/deleteFavorite":
      // post
      return files.filter((el) => el !== action.payload)
    default:
      return files;
  }
};

const store = createStore(
  combineReducers({
    page: pageReducer,
    files: filesReducer
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
