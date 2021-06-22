/* eslint-disable camelcase */
/* eslint-disable no-undef */
/* eslint-disable no-alert */
import "./App.scss";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import HomeView from "./Views/Home/HomeView";
import LoginView from "./Views/Login/LoginView";
import SignupView from "./Views/Signup/SignupView";

import { getToken } from "./__shared/functions";

function App() {
  const [token, setToken] = useState(getToken());

  useEffect(() => {}, [token]);

  const handleLogin = (new_token) => {
    localStorage.setItem("token", new_token);
    setToken(new_token);
  };

  return (
    <Router>
      <Switch>
        <Route path="/Login">
          {token ? (
            <Redirect to="/Home" />
          ) : (
            <LoginView setToken={handleLogin} />
          )}
        </Route>
        <Route path="/Signup">
          {token ? <Redirect to="/Home" /> : <SignupView />}
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
