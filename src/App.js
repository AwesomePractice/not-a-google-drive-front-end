/* eslint-disable no-undef */
/* eslint-disable no-alert */
import "./App.css";
import { useState } from "react";
import Header from "./modules/Header";
import Sidebar from "./modules/Sidebar";
import Files from "./modules/Files";

import NotGoogleDriveLogo from "./media/logo.png";

import { auth, provider } from "./firebase";

function App() {
  const [user, setUser] = useState();
  //   {
  //   displayName: "Test User",
  //   email: "test1@test.com",
  //   emailVerified:true,
  //   phoneNumber: null,
  //   photoUrl: "https://lh3.googleusercontent.com/proxy/_XVbri_0HrrbESGRS0qOvgOyiJXgqM0v-PN0XSvI7WwxKI9mh6i78WgDb5NHnC7cR67bvufQBZq7-tPDTZg0XSBTDEUD4rxm1K4pyJHSV6QnvvC6o7LuniW-Y8yn"
  // }

  const handleLogin = () => {
    if (!user) {
      auth
        .signInWithPopup(provider)
        .then((result) => {
          setUser(result.user);
        })
        .catch((error) => {
          alert(error.message);
        });
    } else if (user) {
      auth
        .signOut()
        .then(() => {
          setUser(null);
        })
        .catch((err) => alert(err.message));
    }
  };

  return (
    <div className="app">
      {user ? (
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
