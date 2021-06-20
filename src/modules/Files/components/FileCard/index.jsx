/* eslint-disable no-undef */
import React from "react";
import "./styles.css";
import PropTypes from "prop-types";

import Icon from "../Icon";

import { getToken } from "../../../../__shared/functions";

const FileCard = ({ name, id }) => {
  const token = getToken();

  const handleClickDownload = (e) => {
    e.preventDefault();

    fetch(`http://34.105.195.56/FileUploader/DownloadFile?fileId=${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      if (response !== 401 && response !== 403)
        response.blob().then((data) => {
          const file = window.URL.createObjectURL(data);
          window.location.assign(file);
        });
      else {
        localStorage.removeItem("token");
        window.location.reload();
      }
    });
  };

  return (
    <button type="button" className="fileCard" onClick={handleClickDownload}>
      <div className="fileCard--top">
        <Icon name={name} isFolder={false} />
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
