/* eslint-disable consistent-return */
/* eslint-disable no-undef */
import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";

import "./styles.css";

const url = "http://34.105.195.56";

export default function SignupView() {
  const [login, setLogin] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [birthDate, setBirthDate] = useState();
  const [password, setPassword] = useState();
  const [user, setUser] = useState(false);

  const signupUser = (credentials) => {
    fetch(`${url}/User/SignUp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }).then((response) => {
      if (response === 401 || response === 403) {
        localStorage.removeItem("token");
      }
      if (response.ok)
        response.text().then((text) => {
          setUser(true);
          alert(text);
        });
      else {
        response.text().then((text) => {
          alert(text);
        });
      }
      window.location.reload();
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    signupUser({
      login,
      firstName,
      lastName,
      birthDate,
      password,
    });
  };

  return (
    <>
      {user ? (
        <Redirect to="/Login" />
      ) : (
        <div className="signup_wrapper">
          <h1 className="signup__header">Sign up to NotAGoogleDrive</h1>
          <form onSubmit={handleSubmit} className="signup_form">
            <label className="signup__field">
              <p>Username</p>
              <input
                type="text"
                onChange={(e) => setLogin(e.target.value)}
                required
              />
            </label>
            <label className="signup__field">
              <p>First Name</p>
              <input
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </label>
            <label className="signup__field">
              <p>Last Name</p>
              <input
                type="text"
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </label>
            <label className="signup__field">
              <p>Birth Date</p>
              <input
                type="date"
                min="1900-01-01"
                onChange={(e) => setBirthDate(e.target.value)}
              />
            </label>
            <label className="signup__field signup__field--last">
              <p>Password</p>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <div>
              <button className="signup__submit" type="submit">
                Submit
              </button>
            </div>
          </form>
          <Link to="/Login" className="signup__login">
            Already have an account? Login!
          </Link>
        </div>
      )}
    </>
  );
}
