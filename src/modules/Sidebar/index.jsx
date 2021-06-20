import React from "react";
import "./styles.css";

import HomeIcon from "@material-ui/icons/Home";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

import SidebarItem from "./components/SidebarItem";
import NewFile from "./components/NewFile";

const index = () => (
  <aside className="sidebar">
    <div className="sidebar_itemsContainer">
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
      <SidebarItem
        icon={<DeleteOutlineIcon />}
        label="Deleted"
        pageName="deleted"
      />
    </div>
    <NewFile />
  </aside>
);

export default index;
