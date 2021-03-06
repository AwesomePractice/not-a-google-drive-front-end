/* eslint-disable no-undef */
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import HomeIcon from "@material-ui/icons/Home";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import StarBorderIcon from "@material-ui/icons/StarBorder";

import SidebarItem from "./components/SidebarItem";
import NewFile from "./components/NewFile";
import NewFolder from "./components/NewFolder";

import "./styles.scss";

const Sidebar = () => {
  const owner = useSelector((state) => state.owner);

  useEffect(() => {}, [owner]);
  
  return (
    <aside className="sidebar">
      <div className="sidebar--container">
        <SidebarItem icon={<HomeIcon />} label="Home page" pageName="home" />
        <SidebarItem
          icon={<PeopleAltIcon />}
          label="Shared with me"
          pageName="shared"
        />
        <SidebarItem
          icon={<StarBorderIcon />}
          label="Favorites"
          pageName="favorites"
        />

        <div className="sidebar__buttons--container">
          <p
            className="myId"
            title="Copy"
          >{`My id: ${owner.id}`}</p>
          <NewFolder />
          <NewFile />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
