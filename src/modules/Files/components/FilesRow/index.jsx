/* eslint-disable no-plusplus */
/* eslint-disable camelcase */
import { useEffect } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import FileCard from "../FileCard";

import "./styles.scss";
import { searchTree } from "../../../../__shared/functions";

const FilesRow = ({ page, route }) => {
  const root = useSelector((state) => state.rootFolder);
  const search = useSelector((state) => state.search);
  const initialRoot = useSelector((state) => state.files);

  useEffect(() => {}, [root]);

  const homeFiles_row = () => {
    if (root && search === "") {
      const folder = searchTree(initialRoot, root.id);
      const currentFiles = folder?.files;
      if (currentFiles)
        return currentFiles
          .slice(0, 5)
          .map(({ name, id }) => <FileCard name={name} key={id} id={id} />);
    }

    return null;
  };
  return (
    <>
      {page === "home" && route.length === 1 && homeFiles_row()?.length > 0 && (
        <>
          <p className="files__title">Recent Files</p>
          <div className="files__row">{homeFiles_row()}</div>
        </>
      )}
    </>
  );
};

FilesRow.propTypes = {
  page: PropTypes.string.isRequired,
  route: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
};

export default FilesRow;
