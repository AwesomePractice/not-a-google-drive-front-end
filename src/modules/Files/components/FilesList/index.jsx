/* eslint-disable no-undef */
/* eslint-disable no-plusplus */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";

import { searchTree, getToken } from "../../../../__shared/functions";
import FileItem from "../FileItem";

import "./styles.scss";
import { SEACRH_SET_SEARCH } from "../../../Header/actions/actionTypes";
import {serverBaseUri} from "../../../../config"

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
  const search = useSelector((state) => state.search);
  const dispatch = useDispatch();

  const [searchResult, setSearchResult] = useState([]);
  const [favoriteFiles, setFavoriteFiles] = useState([]);
  const [favoriteFolders, setFavoriteFolders] = useState([]);
  const [allFiles, setAllFiles] = useState([]);
  const [allFolders, setAllFolders] = useState([]);
  const [sort, setSort] = useState("");

  const token = getToken();

  useEffect(() => {}, [root, sharedFiles]);

  useEffect(() => {}, [sort]);

  useEffect(() => {
    Promise.all([
      fetch(`${serverBaseUri}/FileUploader/AllMyFiles`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        if (response.ok) response.json().then((data) => setAllFiles(data));
        else localStorage.removeItem("token");
      }),

      fetch(`${serverBaseUri}/Folder/AllMyFolders`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        if (response.ok) response.json().then((data) => setAllFolders(data));
        else localStorage.removeItem("token");
      }),
    ]);
  }, [initialRoot]);

  useEffect(() => {
    setSearchResult(
      allFiles
        ?.map((item) => ({ ...item, isFolder: false }))
        .filter(({ name }) => name.toLowerCase().includes(search.toLowerCase()))
        .concat(
          allFolders
            ?.map((item) => ({
              ...item,
              isFolder: true,
              encrypted: false,
              compressed: false,
              size: "-",
            }))
            .filter(({ name }) =>
              name.toLowerCase().includes(search.toLowerCase())
            )
        )
    );
    if (search === "") setSearchResult([]);
  }, [search, allFolders, allFiles]);

  useEffect(() => {
    dispatch({ type: SEACRH_SET_SEARCH, payload: "" });
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

      fetch(`${serverBaseUri}/FileUploader/AllFavouriteFiles`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        if (response !== 401 && response !== 403)
          response.json().then((data) => {
            setFavoriteFiles(data);
          });
        else {
          localStorage.removeItem("token");
          window.location.reload();
        }
      });

      fetch(`${serverBaseUri}/Folder/AllFavouriteFolders`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        if (response !== 401 && response !== 403)
          response.json().then((data) => {
            setFavoriteFolders(data);
          });
        else {
          localStorage.removeItem("token");
          window.location.reload();
        }
      });
    }
  }, [initialRoot]);

  const handleChange = (folderId) => {
    dispatch({ type: SEACRH_SET_SEARCH, payload: "" });
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

  const compare = (a, b) => {
    switch (sort) {
      case "name":
        return a.name > b.name;
      case "size":
        return a.size > b.size;
      case "date": {
        const aDate = new Date(parseInt(a.id.substring(0, 8), 16) * 1000);
        const bDate = new Date(parseInt(b.id.substring(0, 8), 16) * 1000);
        return aDate > bDate;
      }
      default:
        return true;
    }
  };

  const homeFiles_titles = () => {
    if (root) {
      const folder = searchTree(initialRoot, root.id);
      const currentFiles = folder?.files;
      const currentFolders = folder?.children;

      if (currentFiles?.length > 0 || currentFolders?.length > 0)
        return currentFiles
          ?.sort(compare)
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
            currentFolders
              ?.sort(compare)
              ?.map(({ id, name, favourite }) => (
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
      return noFiles();
    }

    return noFiles();
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
      return noFiles();
    }
    return noFiles();
  };

  const sharedFiles_titles = () => {
    if (root && sharedFiles?.length > 0) {
      return sharedFiles.map(({ id, name, size, encrypted, compressed }) => (
        <FileItem
          id={id}
          caption={name}
          size={size || "-"}
          isFavorite={false}
          isEncrypted={encrypted}
          isCompressed={compressed}
          isFolder={false}
          key={id}
          shared
        />
      ));
    }
    return noFiles();
  };

  const searchResult_titles = () => {
    if (searchResult?.length > 0) {
      return searchResult
        .sort(compare)
        .map(
          ({ id, name, size, encrypted, compressed, isFolder, favourite }) => (
            <FileItem
              id={id}
              caption={name}
              size={size || "-"}
              isFavorite={favourite}
              isEncrypted={encrypted}
              isCompressed={compressed}
              isFolder={isFolder}
              key={id}
              shared
              handleChange={isFolder ? handleChange : null}
            />
          )
        );
    }
    return noFiles();
  };

  const handleClickName = (e) => {
    e.preventDefault();
    setSort("name");
  };

  const handleClickDate = (e) => {
    e.preventDefault();
    setSort("date");
  };

  const handleClickSize = (e) => {
    e.preventDefault();
    setSort("size");
  };

  return (
    <>
      <div className="filesView__titles">
        <button type="button" onClick={handleClickName}>
          Name
        </button>
        <button type="button" onClick={handleClickDate}>
          Created at
        </button>
        <button type="button" onClick={handleClickSize}>
          File size
        </button>
      </div>

      {page === "home" && search === "" && homeFiles_titles()}

      {page === "favorites" && search === "" && favoriteFiles_titles()}

      {page === "shared" && search === "" && sharedFiles_titles()}

      {search !== "" && searchResult_titles()}
    </>
  );
};

FileList.propTypes = {
  route: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  setRoute: PropTypes.func.isRequired,
};

export default FileList;
