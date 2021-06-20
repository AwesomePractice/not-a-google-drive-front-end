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

// import NotGoogleDriveLogo from "./media/logo.png";

function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    return userToken?.token;
  };
  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    localStorage.setItem("token", JSON.stringify(userToken));
    setToken(userToken.token);
  };

  return {
    setToken: saveToken,
    token,
  };
}

function App() {
  const { token, setToken } = useToken();

  useEffect(() => {
    console.log("use effect ", token);
  }, [token]);

  console.log(token);
  console.log(useToken());

  return (
    <Router>
      <Switch>
        <Route path="/Login">
          <Login setToken={setToken} />
        </Route>
        <Route path="/Signup">
          <Signup setToken={setToken} />
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
