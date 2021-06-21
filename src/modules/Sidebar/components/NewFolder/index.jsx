/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-undef */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./styles.scss";

import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { getToken } from "../../../../__shared/functions";
import { fetchData } from "../../../../__shared/actions/fetchData";

function getModalStyle() {
  return {
    top: `50%`,
    left: `50%`,
    height: `30%`,
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

const NewFolder = () => {
  const classes = useStyles();
  const token = getToken();

  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  const dispatch = useDispatch();
  const folder = useSelector((state) => state.rootFolder);

  function status(response) {
    if (response === 401 || response === 403) {
      localStorage.removeItem("token");
      window.location.reload();
    }
    return response;
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://34.105.195.56/Folder/CreateFolder`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        parentId: folder.id,
        name,
        isFavourite: false,
      }),
    })
      .then(status)
      .then(() => Promise.all([dispatch(fetchData())]));
    setOpen(false);
    setName("");
  };

  return (
    <div className="newFolder">
      <div className="newFolder__container" onClick={handleOpen}>
        <AddIcon />
        <p>New Folder</p>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <p style={{ marginBottom: "20px" }}>Text a name</p>
          <input
            type="text"
            placeholder="New folder"
            className="newFolder__input"
            value={name}
            onChange={handleChange}
            style={{ marginBottom: "30px" }}
          />
          <button
            className="newFolder__submit"
            type="submit"
            onClick={handleSubmit}
          >
            Create
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default NewFolder;
