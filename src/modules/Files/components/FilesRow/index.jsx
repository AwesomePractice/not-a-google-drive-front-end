/* eslint-disable no-plusplus */
/* eslint-disable camelcase */
import { useEffect } from "react";
import { useSelector } from "react-redux";

import FileCard from "../FileCard";

import "./styles.css";
import { searchTree } from "../../../../__shared/functions";

const FilesRow = () => {
  const page = useSelector((state) => state.page);
  const root = useSelector((state) => state.rootFolder);
  const initialRoot = useSelector((state) => state.files);

  useEffect(() => {}, [root]);

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
  return (
    <>
      {page === "home" && homeFiles_row()?.length > 0 && (
        <div className="fileView_row">{homeFiles_row()}</div>
      )}
    </>
  );
};

export default FilesRow;
