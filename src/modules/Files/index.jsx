/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-plusplus */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../actions/fetchData";

import FileItem from "./components/FileItem";
import FileCard from "./components/FileCard";
import Path from "./components/Path";

import "./styles.css";
import "../../main.css";

const noFiles = (
  <div className="no-files">
    <p>No files</p>
  </div>
);

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
  const root = useSelector((state) => state.rootFolder);
  const sharedFiles = useSelector((state) => state.sharedFiles);
  const dispatch = useDispatch();

  const [route, setRoute] = useState([{ name: page, id: "" }]);
  //   const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    Promise.all([dispatch(fetchData())]);

    dispatch({ type: "rootFolder/setRoot", payload: initialRoot });
  }, []);

  useEffect(() => {}, [root, sharedFiles]);

  useEffect(() => {
    if (page[0] === "-")
      dispatch({ type: "page/setPage", payload: page.slice(1) });
    setRoute([{ name: page, id: "" }]);
    dispatch({ type: "rootFolder/setRoot", payload: initialRoot });
  }, [page]);

  useEffect(() => {
    if (root) {
      const folder = searchTree(initialRoot, root.id);
      dispatch({
        type: "rootFolder/setRoot",
        payload: folder || initialRoot,
      });
    }
  }, [initialRoot]);

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

  const homeFiles_titles = () => {
    if (root) {
      const folder = searchTree(initialRoot, root.id);
      const currentFiles = folder?.files;
      const currentFolders = folder?.children;

      if (currentFiles?.length === 0 && currentFolders?.length === 0)
        return noFiles;

      return currentFiles
        ?.map(({ id, name, size, favourite }) => (
          <FileItem
            id={id}
            caption={name}
            timestamp={Date.now()}
            size={size}
            isFavorite={favourite}
            icon="file"
            key={id}
          />
        ))
        .concat(
          currentFolders?.map(({ id, name, favourite }) => (
            <FileItem
              id={id}
              caption={name}
              timestamp={Date.now()}
              size="-"
              isFavorite={favourite}
              icon="folder"
              handleChange={handleChange}
              key={id}
            />
          ))
        );
    }

    return noFiles;
  };

  const homeFiles_row = () => {
    if (root) {
      const folder = searchTree(initialRoot, root.id);
      const currentFiles = folder?.files;
      if (currentFiles)
        return currentFiles
          .slice(0, 4)
          .map(({ name, id }) => <FileCard name={name} key={id} id={id} />);
    }

    return null;
  };

  const favoriteFiles_titles = () => {
    if (root) {
      const favoriteFiles = initialRoot.files.filter(
        (item) => item.favourite === true
      );
      if (favoriteFiles.length > 0)
        return favoriteFiles.map(({ id, name, size }) => (
          <FileItem
            id={id}
            caption={name}
            timestamp={Date.now()}
            size={size}
            isFavorite
            icon="file"
            key={id}
          />
        ));
      return noFiles;
    }
    return noFiles;
  };

  const sharedFiles_titles = () => {
    console.log(sharedFiles);
    if (root && sharedFiles?.length > 0) {
      return sharedFiles.map(({ id, name, size }) => (
        <FileItem
          id={id}
          caption={name}
          timestamp={Date.now()}
          size={size}
          isFavorite
          icon="file"
          key={id}
        />
      ));
    }
    return noFiles;
  };

  return (
    <div className="fileView">
      <Path path={route} handleChange={handleChange} />
      {page === "home" && homeFiles_row()?.length > 0 && (
        <div className="fileView_row">{homeFiles_row()}</div>
      )}

      <div className="filesView__titles">
        <p>Name</p>
        <p className="filesView__lastmodified">Last modified</p>
        <p>File size</p>
      </div>
      {page === "home" && homeFiles_titles()}
      {page === "favorites" && favoriteFiles_titles()}
      {page === "shared" && sharedFiles_titles()}
    </div>
  );
};

export default Files;
