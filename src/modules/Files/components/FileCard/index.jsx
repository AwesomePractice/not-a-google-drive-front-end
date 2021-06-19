import React from "react";
import "./main.css";
import PropTypes from "prop-types";

import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";

const FileCard = ({ name }) => (
  <div className="fileCard">
    <div className="fileCard--top">
      <InsertDriveFileIcon style={{ fontSize: 130 }} />
    </div>

    <div className="fileCard--bottom">
      <p>{name}</p>
    </div>
  </div>
);

FileCard.propTypes = {
  name: PropTypes.string.isRequired,
};

export default FileCard;
