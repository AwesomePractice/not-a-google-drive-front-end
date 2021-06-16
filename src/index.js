import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


const initialPage = "home";
const pageReducer = (page = initialPage, action) => {
  switch (action.type) {
    case "page/setPage":
      console.log(action.payload)
      return action.payload ? action.payload : page
    default:
      return page;
  }
};

const store = createStore(
  combineReducers({
    page: pageReducer,
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
