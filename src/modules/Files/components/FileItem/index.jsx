/* eslint-disable camelcase */
/* eslint-disable no-undef */
/* eslint-disable no-console */
import React from "react";
import "./styles.scss";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import StarOutlineIcon from "@material-ui/icons/StarOutline";
import StarIcon from "@material-ui/icons/Star";
import CancelIcon from "@material-ui/icons/Cancel";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { RiShareFill } from "react-icons/ri";

import { manageFavorite } from "../../actions/manageFavorite";
import { deleteItem } from "../../actions/deleteItem";
import Icon from "../Icon";

import { getToken } from "../../../../__shared/functions";
import { fetchData } from "../../../../__shared/actions/fetchData";

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const decapsulateDateFromId = (id) => {
  const decapsulatedDate = parseInt(id.substring(0, 8), 16) * 1000;
  // const date = new Date(decapsulatedDate);
  return new Date(decapsulatedDate);
};

const FileItem = ({
  id,
  caption,
  size,
  isFavorite,
  isFolder,
  handleChange,
  isEncrypted,
  isCompressed,
  shared,
}) => {
  const date = decapsulateDateFromId(id);
  const fileDate = `${date.getDate()} ${
    monthNames[date.getMonth() + 1]
  } ${date.getFullYear()}`;

  const token = getToken();

  const getReadableFileSizeString = (fileSizeInBytes) => {
    if (fileSizeInBytes === "-") return "-";

    let i = -1;
    const byteUnits = [" kB", " MB", " GB", " TB", "PB", "EB", "ZB", "YB"];
    do {
      // eslint-disable-next-line no-param-reassign
      fileSizeInBytes /= 1024;
      // eslint-disable-next-line no-plusplus
      i++;
    } while (fileSizeInBytes > 1024);

    return Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i];
  };

  const dispatch = useDispatch();

  const handleClickFavorite = (e) => {
    e.preventDefault();

    Promise.all([dispatch(manageFavorite(id, !isFavorite, isFolder))]);
    Promise.all([dispatch(fetchData())]);
  };

  const handleClickFolder = (e) => {
    e.preventDefault();

    handleChange(id);
  };

  const handleClickDelete = (e) => {
    e.preventDefault();

    Promise.all([dispatch(deleteItem(id, isFolder))]);
  };

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
          const tempLink = document.createElement("a");
          tempLink.href = file;
          tempLink.setAttribute("download", caption);
          tempLink.click();
        });
      else {
        localStorage.removeItem("token");
        window.location.reload();
      }
    });
  };

  const fileItemStarClass = shared
    ? "fileItem__star--disable"
    : "fileItem__star";

  const fileItemDeleteClass = shared
    ? "fileItem__delete--disable fileItem__button--disable"
    : "fileItem__delete fileItem__button";

  const fileItemShareClass = shared
    ? "fileItem__share fileItem__button--disable"
    : "fileItem__share fileItem__button";

  return (
    <div className="fileItem">
      {!isFolder ? (
        <button
          type="button"
          className="fileItem__icon"
          title="Download file"
          onClick={handleClickDownload}
        >
          <Icon
            name={caption}
            isFolder={isFolder}
            isCompressed={isCompressed}
          />
        </button>
      ) : (
        <button
          type="button"
          className="fileItem__icon"
          onClick={handleClickFolder}
        >
          <Icon
            name={caption}
            isFolder={isFolder}
            isCompressed={isCompressed}
          />
        </button>
      )}

      <button
        type="button"
        className={fileItemStarClass}
        onClick={handleClickFavorite}
      >
        {isFavorite ? (
          <StarIcon className="fileItem__star" />
        ) : (
          <StarOutlineIcon className="fileItem__star" />
        )}
      </button>

      {!isFolder ? (
        <button
          type="button"
          className="fileItem__name"
          title="Download file"
          onClick={handleClickDownload}
        >
          <p>{caption}</p>
        </button>
      ) : (
        <button
          type="button"
          className="fileItem__name"
          onClick={handleClickFolder}
        >
          <p>{caption}</p>
        </button>
      )}

      {isEncrypted ? (
        <VpnKeyIcon className="fileItem_encrypted" />
      ) : (
        <div className="fileItem_encrypted" />
      )}
      <p className="fileItem__date">{fileDate}</p>
      <p className="fileItem__size">{getReadableFileSizeString(size)}</p>

      <button
        type="button"
        className={fileItemDeleteClass}
        onClick={handleClickDelete}
      >
        <CancelIcon />
      </button>
      <button type="button" className={fileItemShareClass}>
        <RiShareFill />
      </button>
    </div>
  );
};

FileItem.propTypes = {
  id: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  isFavorite: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
    .isRequired,
  isFolder: PropTypes.bool.isRequired,
  handleChange: PropTypes.func,
  isEncrypted: PropTypes.bool,
  isCompressed: PropTypes.bool,
  shared: PropTypes.bool,
};

FileItem.defaultProps = {
  handleChange: null,
  isEncrypted: false,
  isCompressed: false,
  shared: false,
};

export default FileItem;
