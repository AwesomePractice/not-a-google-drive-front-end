/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-plusplus */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../__shared/actions/fetchData";

// import FileItem from "./components/FileItem";
// import FileCard from "./components/FileCard";
import Path from "./components/Path";
import FilesRow from "./components/FilesRow";
import FileList from "./components/FilesList";

import "./styles.css";
import "../../main.css";

// const noFiles = (
//   <div className="no-files">
//     <p>No files</p>
//   </div>
// );

function searchTree(element, matchingId) {
  if (element.id === matchingId) {
    return element;
  }
  if (element.children != null) {
    let i;
    let result = null;
    for (i = 0; result == null && i < element.children.length; i++) {
      result = searchTree(element.children[i], matchingId);
    }
    return result;
  }
  return null;
}

const Files = () => {
  const page = useSelector((state) => state.page);
  const initialRoot = useSelector((state) => state.files);
  // const root = useSelector((state) => state.rootFolder);
  // const sharedFiles = useSelector((state) => state.sharedFiles);
  const dispatch = useDispatch();

  const [route, setRoute] = useState([{ name: page, id: "" }]);
  //   const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    Promise.all([dispatch(fetchData())]);

    dispatch({ type: "rootFolder/setRoot", payload: initialRoot });
  }, []);

  const handleChange = (folderId) => {
    if (folderId === "") {
      setRoute([{ name: page, id: "" }]);
      dispatch({ type: "rootFolder/setRoot", payload: initialRoot });
    } else {
      const folder = searchTree(initialRoot, folderId);
      dispatch({ type: "rootFolder/setRoot", payload: folder });

      let idx = -1;
      route.forEach((e, i) => {
        if (e.id === folder.id) idx = i;
      });
      idx === -1
        ? setRoute([...route, { name: folder.name, id: folderId }])
        : setRoute(route.slice(0, idx + 1));
    }
  };

  return (
    <div className="fileView">
      <Path path={route} handleChange={handleChange} />
      <FilesRow page={page} />
      <FileList />
    </div>
  );
};

export default Files;
