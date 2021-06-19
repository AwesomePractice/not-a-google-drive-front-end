/* eslint-disable no-undef */
import React from "react";
import "./main.css";
import PropTypes from "prop-types";

import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";

import token from "../../../../config";

const FileCard = ({ name, id }) => {
  const handleClickDownload = (e) => {
    e.preventDefault();

    fetch(`http://34.105.195.56/FileUploader/DownloadFile?fileId=${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      if (response.ok)
        response.blob().then((data) => {
          const file = window.URL.createObjectURL(data);
          window.location.assign(file);
        });
    });
  };

  return (
    <button type="button" className="fileCard" onClick={handleClickDownload}>
      <div className="fileCard--top">
        <InsertDriveFileIcon style={{ fontSize: 130 }} />
      </div>

      <div className="fileCard--bottom">
        <p>{name}</p>
      </div>
    </button>
  );
};

FileCard.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default FileCard;
