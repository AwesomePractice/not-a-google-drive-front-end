/* eslint-disable camelcase */
/* eslint-disable no-undef */
/* eslint-disable no-alert */
import "./App.css";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import HomeView from "./Views/Home/HomeView";
import Login from "./Views/Login/login";
import Signup from "./Views/Signup/signup";

import { getToken } from "./__shared/functions";

// const getToken = () => {
//   const tokenString = localStorage.getItem("token");
//   const userToken = JSON.parse(tokenString);
//   return userToken?.token;
// };

function App() {
  const [token, setToken] = useState(getToken());

  useEffect(() => {}, [token]);

  const handleLogin = (new_token) => {
    localStorage.setItem("token", new_token);
    console.log(localStorage);
    setToken(new_token);
  };

  return (
    <Router>
      <Switch>
        <Route path="/Login">
          {token ? <Redirect to="/Home" /> : <Login setToken={handleLogin} />}
        </Route>
        <Route path="/Signup">
          {token ? <Redirect to="/Home" /> : <Signup setToken={handleLogin} />}
        </Route>
        <Route path="/Home">
          {token ? <HomeView /> : <Redirect to="/Login" />}
        </Route>
        <Route path="/">
          {token ? <Redirect to="/Home" /> : <Redirect to="/Login" />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
