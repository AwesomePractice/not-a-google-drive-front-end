/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./styles.scss";

import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { AiFillCloseCircle } from "react-icons/ai";
import { getToken } from "../../../../__shared/functions";
import { fetchData } from "../../../../__shared/actions/fetchData";
import {serverBaseUri} from "../../../../config"

function getModalStyle() {
  return {
    top: `50%`,
    left: `50%`,
    height: `35%`,
    display: `flex`,
    alignItems: `center`,
    justifyContent: `center`,
    flexDirection: `column`,
    transform: `translate(-50%, -50%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const NewFile = () => {
  const classes = useStyles();
  const token = getToken();

  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [encrypted, setEncrypted] = useState(false);
  const [compressed, setCompressed] = useState(false);
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();
  const folder = useSelector((state) => state.rootFolder);

  useEffect(() => {
    setEncrypted(false);
    setCompressed(false);
  }, [open]);

  function status(response) {
    if (response === 401 || response === 403) {
      localStorage.removeItem("token");
      window.location.reload();
    }
    return response;
  }

  const handleChangeEncrypted = (e) => {
    setEncrypted(e.target.checked);
  };

  const handleChangeCompressed = (e) => {
    setCompressed(e.target.checked);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    setUploading(true);

    const body = new FormData();
    body.append("fileUpload", file);

    if (body)
      fetch(
        `${serverBaseUri}/FileUploader/UploadFile?compressed=${compressed}&encrypted=${encrypted}&favourite=false&folderId=${folder.id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body,
        }
      )
        .then(status)
        .then(() => Promise.all([dispatch(fetchData())]));

    setUploading(false);
    setOpen(false);
    setFile(null);
  };

  return (
    <button className="newFile sidebar__button" type="button">
      <div
        className="newFile--container sidebar__button--container"
        onClick={handleOpen}
      >
        <p>New file</p>
        <AddIcon />
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <AiFillCloseCircle className="modal__close" onClick={handleClose} />
          <p style={{ marginBottom: "20px" }}>
            Select files you want to upload:
          </p>
          {uploading ? (
            <p>Uploading...</p>
          ) : (
            <>
              <input
                type="file"
                onChange={handleChange}
                style={{ marginBottom: "15px" }}
              />
              <div className="modal__checkbox--contanier">
                <input
                  type="checkbox"
                  name="encrypted"
                  onChange={handleChangeEncrypted}
                  className="modal__checkbox"
                />
                <label htmlFor="encrypted" style={{ marginRight: "25px" }}>
                  Encrypted
                </label>

                <input
                  type="checkbox"
                  name="compressed"
                  onChange={handleChangeCompressed}
                  className="modal__checkbox"
                />
                <label htmlFor="compressed">Compressed</label>
              </div>
              <button
                type="button"
                onClick={handleUpload}
                className="modal__upload"
              >
                Upload
              </button>
            </>
          )}
        </div>
      </Modal>
    </button>
  );
};

export default NewFile;
