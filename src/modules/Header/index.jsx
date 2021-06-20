import React, { useEffect } from "react";
import "./styles.css";
import { useSelector, useDispatch } from "react-redux";

import SearchIcon from "@material-ui/icons/Search";
import PersonIcon from "@material-ui/icons/Person";
import NotGoogleDriveLogo from "../../media/logo.png";

import { fetchOwner } from "./actions/fetchOwner";
import { SEACRH_SET_SEARCH } from "./actions/actionTypes";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const Header = () => {
  const owner = useSelector((state) => state.owner);
  const search = useSelector((state) => state.search);
  const dispatch = useDispatch();

  useEffect(() => {
    Promise.all([dispatch(fetchOwner())]);
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    dispatch({ type: SEACRH_SET_SEARCH, payload: e.target.value });
  };

  return (
    <div className="header container">
      <div className="header_logo">
        <img src={NotGoogleDriveLogo} alt="NotGoogleDrive" />
        <span>NotGoogleDrive</span>
      </div>
      <div className="header_searchContainer">
        <div className="header_searchbar">
          <input
            type="text"
            placeholder="Search in Drive"
            className="header__input"
            value={search}
            onChange={handleChange}
          />
          <SearchIcon />
        </div>
      </div>
      <div className="header_icons">
        <PersonIcon />
        {owner
          ? `Hello, ${capitalizeFirstLetter(
              owner.name
            )} ${capitalizeFirstLetter(owner.surname)}`
          : "Hello!"}
      </div>
    </div>
  );
};

export default Header;
