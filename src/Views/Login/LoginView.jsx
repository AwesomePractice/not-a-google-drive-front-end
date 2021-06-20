/* eslint-disable no-undef */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import "./styles.css";
import logo from "../../media/logo.png";

const url = "http://34.105.195.56";

async function loginUser(credentials) {
  console.log("credentials", credentials);
  const response = await fetch(`${url}/User/SignIn`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  if (response === 401 || response === 403) {
    localStorage.removeItem("token");
  }
  window.location.reload();
  return response.json();
}

export default function LoginView({ setToken }) {
  const [login, setLogin] = useState();
  const [password, setPassword] = useState();
  const [role, setRole] = useState("string");

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
        <label className="login__username">
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
      <Link to="/Signup" className="login__signup">
        Dont have an accout? Sign up!
      </Link>
    </div>
  );
}

LoginView.propTypes = {
  setToken: PropTypes.func.isRequired,
};
