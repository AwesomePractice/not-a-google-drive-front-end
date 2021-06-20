/* eslint-disable no-undef */
/* eslint-disable no-plusplus */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";

import { searchTree } from "../../../../__shared/functions";
import FileItem from "../FileItem";

import "./styles.css";
import { token } from "../../../../config";

const noFiles = () => (
  <div className="no-files">
    <p>No files</p>
  </div>
);

const checkSearchResult = (id, array) => {
  for (let i = 0; i < array.length; i++) if (array[i].id === id) return false;
  return true;
};

const FileList = ({ route, setRoute }) => {
  const page = useSelector((state) => state.page);
  const initialRoot = useSelector((state) => state.files);
  const root = useSelector((state) => state.rootFolder);
  const sharedFiles = useSelector((state) => state.sharedFiles);
  const search = useSelector((state) => state.search);
  const dispatch = useDispatch();

  const [searchResult, setSearchResult] = useState([]);
  const [favoriteFiles, setFavoriteFiles] = useState([]);
  const [favoriteFolders, setFavoriteFolders] = useState([]);
  useEffect(() => {}, [root, sharedFiles]);

  const searchInRoot = (element) => {
    element?.files?.forEach(
      ({ name, id, favourite, encrypted, compressed }) => {
        if (
          name.toLowerCase().includes(search.toLowerCase()) &&
          checkSearchResult(id, searchResult)
        )
          setSearchResult([
            ...searchResult,
            {
              name,
              id,
              isFolder: false,
              isEncrypted: encrypted,
              isFavorite: favourite,
              isCompressed: compressed,
            },
          ]);
      }
    );
    element?.children?.forEach((folder) => searchInRoot(folder));
  };

  useEffect(() => {
    setSearchResult(
      searchResult.filter(({ name }) =>
        name.toLowerCase().includes(search.toLowerCase())
      )
    );
    searchInRoot(initialRoot);
    if (search === "") setSearchResult([]);
  }, [search]);

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

      fetch("http://34.105.195.56/FileUploader/AllFavouriteFiles", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        response.json().then((data) => {
          setFavoriteFiles(data);
        });
      });

      fetch("http://34.105.195.56/Folder/AllFavouriteFolders", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        response.json().then((data) => {
          setFavoriteFolders(data);
        });
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
      const files = route.length > 1 ? root?.files : favoriteFiles;
      let folders = favoriteFolders;
      if (route.length > 1) {
        folders = root?.children?.map(({ id }) => id);
      }
      if (files?.length > 0 || folders?.length > 0)
        return files
          .map(({ id, name, size, favourite, encrypted, compressed }) => (
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
            folders?.map((id) => {
              const folder = searchTree(initialRoot, id);
              return (
                <FileItem
                  id={id}
                  caption={folder.name}
                  size="-"
                  isFavorite={folder.favourite}
                  isEncrypted={folder.encrypted}
                  isCompressed={folder.compressed}
                  isFolder
                  handleChange={handleChange}
                  key={id}
                />
              );
            })
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
          size={size}
          isFavorite={false}
          isEncrypted={encrypted}
          isCompressed={compressed}
          isFolder={false}
          key={id}
          shared
        />
      ));
    }
    return noFiles;
  };

  const searchResult_titles = () => {
    if (searchResult?.length > 0) {
      return searchResult.map(({ id, name, size, encrypted, compressed }) => (
        <FileItem
          id={id}
          caption={name}
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
      {page === "home" && search === "" && homeFiles_titles()}
      {page === "favorites" && search === "" && favoriteFiles_titles()}
      {page === "shared" && search === "" && sharedFiles_titles()}
      {search !== "" && searchResult_titles()}
    </>
  );
};

FileList.propTypes = {
  route: PropTypes.objectOf(PropTypes.string).isRequired,
  setRoute: PropTypes.func.isRequired,
};

export default FileList;
