/* eslint-disable no-undef */
import React, { useEffect } from "react";
import "./styles.scss";
import { useSelector, useDispatch } from "react-redux";

import SearchIcon from "@material-ui/icons/Search";

import { fetchOwner } from "./actions/fetchOwner";
import { SEACRH_SET_SEARCH } from "./actions/actionTypes";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function logOut() {
  localStorage.removeItem("token");
  window.location.reload();
}

const Header = () => {
  const owner = useSelector((state) => state.owner);
  const search = useSelector((state) => state.search);
  const dispatch = useDispatch();

  useEffect(() => {
    Promise.all([dispatch(fetchOwner())]);
  }, []);

  useEffect(() => {}, [owner]);

  const handleChange = (e) => {
    e.preventDefault();
    dispatch({ type: SEACRH_SET_SEARCH, payload: e.target.value });
  };

  return (
    <div className="header container">
      <span className="header__user">
        {owner ? (
          <>
            Hi,
            <span className="header__user--accent">
              {` ${capitalizeFirstLetter(owner.name)}`}
              {` ${capitalizeFirstLetter(owner.surname)}`}
            </span>
          </>
        ) : (
          "Hi!"
        )}
      </span>
      <div className="header__searchbar--container">
        <div className="header__searchbar">
          <input
            type="text"
            placeholder="Search in Drive"
            value={search}
            onChange={handleChange}
          />
          <SearchIcon />
        </div>
      </div>
      <button type="button" onClick={logOut} className="header__logout">
        Log Out
      </button>
    </div>
  );
};

export default Header;
