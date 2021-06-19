import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./main.css";
import PropTypes from "prop-types";

const SidebarItem = ({ icon, label, pageName }) => {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.page);

  const handleClick = (e) => {
    e.preventDefault();
    dispatch({ type: "page/setPage", payload: `-${pageName}` });
  };

  return (
    <button type="button" className="sidebarItem" onClick={handleClick}>
      {page === pageName ? (
        <div className="sidebarItem_main selected">
          {icon}
          <p> {label} </p>
        </div>
      ) : (
        <div className="sidebarItem_main">
          {icon}
          <p> {label} </p>
        </div>
      )}
    </button>
  );
};

SidebarItem.propTypes = {
  icon: PropTypes.element.isRequired,
  label: PropTypes.string.isRequired,
  pageName: PropTypes.string.isRequired,
};

export default SidebarItem;
