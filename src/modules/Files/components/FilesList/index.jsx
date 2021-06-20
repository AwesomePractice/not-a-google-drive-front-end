/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";

import { searchTree } from "../../../../__shared/functions";
import FileItem from "../FileItem";

import "./styles.css";

const noFiles = () => (
  <div className="no-files">
    <p>No files</p>
  </div>
);

const FileList = ({ route, setRoute }) => {
  const page = useSelector((state) => state.page);
  const initialRoot = useSelector((state) => state.files);
  const root = useSelector((state) => state.rootFolder);
  const sharedFiles = useSelector((state) => state.sharedFiles);
  const dispatch = useDispatch();

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
        ?.map(({ id, name, size, favourite, encrypted, compressed }) => (
          <FileItem
            id={id}
            caption={name}
            size={size}
            isFavorite={favourite}
            isEncrypted={encrypted}
            isCompressed={compressed}
            isFolder={false}
            key={id}
          />
        ))
        .concat(
          currentFolders?.map(({ id, name, favourite }) => (
            <FileItem
              id={id}
              caption={name}
              size="-"
              isFavorite={favourite}
              isFolder
              handleChange={handleChange}
              key={id}
            />
          ))
        );
    }

    return noFiles;
  };

  const favoriteFiles_titles = () => {
    if (root) {
      const favoriteFiles = initialRoot.files.filter(
        (item) => item.favourite === true
      );
      if (favoriteFiles.length > 0)
        return favoriteFiles.map(
          ({ id, name, size, favourite, encrypted, compressed }) => (
            <FileItem
              id={id}
              caption={name}
              size={size}
              isFavorite={favourite}
              isEncrypted={encrypted}
              isCompressed={compressed}
              isFolder={false}
              key={id}
            />
          )
        );
      return noFiles;
    }
    return noFiles;
  };

  const sharedFiles_titles = () => {
    if (root && sharedFiles?.length > 0) {
      return sharedFiles.map(({ id, name, size, encrypted, compressed }) => (
        <FileItem
          id={id}
          caption={name}
          timestamp={Date.now()}
          size={size}
          isFavorite={false}
          isEncrypted={encrypted}
          isCompressed={compressed}
          isFolder={false}
          key={id}
        />
      ));
    }
    return noFiles;
  };
  return (
    <>
      <div className="filesView__titles">
        <p>Name</p>
        <p className="filesView__lastmodified">Created at</p>
        <p>File size</p>
      </div>
      {page === "home" && homeFiles_titles()}
      {page === "favorites" && favoriteFiles_titles()}
      {page === "shared" && sharedFiles_titles()}
    </>
  );
};

FileList.propTypes = {
  route: PropTypes.objectOf(PropTypes.string).isRequired,
  setRoute: PropTypes.func.isRequired,
};

export default FileList;
