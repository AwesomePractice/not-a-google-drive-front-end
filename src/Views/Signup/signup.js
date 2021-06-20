/* eslint-disable no-undef */
import React, { useState } from "react";
import PropTypes from "prop-types";
// import Login from "../Login/login";

import "./styles.css";

const url = "http://34.105.195.56";

async function signupUser(credentials) {
  return fetch(`${url}/User/SignUp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json(), document.write(JSON.stringify(credentials)));
}

export default function Signup({ setToken }) {
  const [login, setLogin] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [birthDate, setBirthDate] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await signupUser({
      login,
      firstName,
      lastName,
      birthDate,
      password,
    });
    setToken(token);
  };

  return (
    <div className="signup_wrapper">
      <h1>Sign up to NotAGoogleDrive</h1>
      <form onSubmit={handleSubmit} className="signup_form">
        <label>
          <p>Username</p>
          <input type="text" onChange={(e) => setLogin(e.target.value)} />
        </label>
        <label>
          <p>First Name</p>
          <input type="text" onChange={(e) => setFirstName(e.target.value)} />
        </label>
        <label>
          <p>Last Name</p>
          <input type="text" onChange={(e) => setLastName(e.target.value)} />
        </label>
        <label>
          <p>Birth Date</p>
          <input
            type="date"
            min="1900-01-01"
            onChange={(e) => setBirthDate(e.target.value)}
          />
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

Signup.propTypes = {
  setToken: PropTypes.func.isRequired,
};
