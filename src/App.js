/* eslint-disable no-undef */
/* eslint-disable no-alert */
import "./App.css";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Header from "./modules/Header";
import Sidebar from "./modules/Sidebar";
import Files from "./modules/Files";
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

  // if (!token) {
  //   <Login setToken={setToken} />;
  // }
  return (
    <Router>
      <Switch>
        <Route
          path="/Home"
          render={() => (token ? <Home /> : <Login setToken={setToken} />)}
          // render={() => (token ? <Home /> : <Home />)}
        />
        <Route path="/Login">
          <Login setToken={setToken} />
        </Route>
        <Route path="/Signup">
          <Signup setToken={setToken} />
        </Route>
        <Route path="/">
          <Redirect to="/Home" />
        </Route>
      </Switch>
    </Router>
  );
}

function Home() {
  return (
    <div className="app">
      {token ? (
        <>
          <Header />
          <div className="app_main container">
            <Sidebar />
            <Files />
          </div>
        </>
      ) : (
        // <div className="app_login">
        //   <img src={NotGoogleDriveLogo} alt="Google Drive" />
        //   <button type="button" onClick={handleLogin}>
        //     Log in to NotAGoogleDrive
        //   </button>
        // </div>
        <Login />
      )}
    </div>
  );
}

export default App;
