/* eslint-disable no-undef */
/* eslint-disable no-alert */
import "./App.css";
import { useState } from "react";
// import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from "./modules/Header";
import Sidebar from "./modules/Sidebar";
import Files from "./modules/Files";
import Login from "./Views/Login/login";
// import Signup from "./Views/Signup/signup";

import NotGoogleDriveLogo from "./media/logo.png";

// import { auth, provider } from "./firebase";

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

// function setToken(userToken) {
//   sessionStorage.setItem("token", JSON.stringify(userToken));
// }

// function getToken() {
//   const tokenString = sessionStorage.getItem("token");
//   const userToken = JSON.parse(tokenString);
//   return userToken?.token;
// }

function App() {
  // const token = getToken();
  const { token, setToken } = useToken();
  //   {
  //   displayName: "Test User",
  //   email: "test1@test.com",
  //   emailVerified:true,
  //   phoneNumber: null,
  //   photoUrl: "https://lh3.googleusercontent.com/proxy/_XVbri_0HrrbESGRS0qOvgOyiJXgqM0v-PN0XSvI7WwxKI9mh6i78WgDb5NHnC7cR67bvufQBZq7-tPDTZg0XSBTDEUD4rxm1K4pyJHSV6QnvvC6o7LuniW-Y8yn"
  // }

  if (!token) {
    <Login setToken={setToken} />;
  }

  // const handleLogin = () => {
  //   if (!token) {
  //     auth
  //       .signInWithPopup(provider)
  //       .then((result) => {
  //         setToken(result.user);
  //       })
  //       .catch((error) => {
  //         alert(error.message);
  //       });
  //   } else if (token) {
  //     auth
  //       .signOut()
  //       .then(() => {
  //         setToken(null);
  //       })
  //       .catch((err) => alert(err.message));
  //   }
  // };

  return (
    <div className="app">
      {true ? (
        <>
          <Header />
          <div className="app_main container">
            <Sidebar />
            <Files />
          </div>
        </>
      ) : (
        <div className="app_login">
          <img src={NotGoogleDriveLogo} alt="Google Drive" />
          <button type="button" onClick={handleLogin}>
            Log in to NotAGoogleDrive
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
