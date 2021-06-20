/* eslint-disable no-undef */
import React, { useState } from "react";
import PropTypes from "prop-types";

import "./styles.css";
import logo from "../../media/logo.png";

const url = "http://34.105.195.56";

async function loginUser(credentials) {
  console.log("credentials", credentials);
  return fetch(`${url}/User/SignIn`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

export default function Login({ setToken }) {
  const [login, setLogin] = useState();
  const [password, setPassword] = useState();
  const [role, setRole] = useState("string");

  // useEffect(() => {}, [login, password]);

  const handleSubmit = async (e) => {
    setRole("string");
    e.preventDefault();
    const token = await loginUser({
      login,
      password,
      role,
    });
    setToken(token?.access_token);
  };

  return (
    <div className="login_wrapper">
      <img src={logo} alt="NotAGoogleDrive" className="login__logo" />
      <h1 className="login__header">Log in to NotAGoogleDrive</h1>
      <form onSubmit={handleSubmit} className="login_form">
        <label className="login__useranem">
          <p>Username</p>
          <input type="text" onChange={(e) => setLogin(e.target.value)} />
        </label>
        <label className="login__password">
          <p>Password</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div>
          <button type="submit" className="login__submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
