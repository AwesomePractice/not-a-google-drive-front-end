/* eslint-disable no-undef */
import React, { useState } from "react";
import PropTypes from "prop-types";
// import Signup from "../Signup/signup";

import "./styles.css";

const url = "http://34.105.195.56";

async function loginUser(credentials) {
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

  const handleSubmit = async (e) => {
    setRole("string");
    e.preventDefault();
    const token = await loginUser({
      login,
      password,
      role,
    });
    setToken(token);
  };

  return (
    <div className="login_wrapper">
      <h1>Log in to NotAGoogleDrive</h1>
      <form onSubmit={handleSubmit} className="login_form">
        <label>
          <p>Username</p>
          <input type="text" onChange={(e) => setLogin(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
