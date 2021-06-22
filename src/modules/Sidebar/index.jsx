import React from "react";

import HomeIcon from "@material-ui/icons/Home";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import StarBorderIcon from "@material-ui/icons/StarBorder";

import SidebarItem from "./components/SidebarItem";
import NewFile from "./components/NewFile";
import NewFolder from "./components/NewFolder";

import "./styles.scss";

const index = () => (
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
        <NewFolder />
        <NewFile />
      </div>
    </div>
  </aside>
);

export default index;
