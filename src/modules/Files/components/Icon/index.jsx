import PropTypes from "prop-types";

import {
  AiFillFileZip,
  AiFillFilePdf,
  AiFillFileImage,
  AiFillFile,
  AiFillFileText,
  AiFillFolder,
} from "react-icons/ai";

import "./styles.css";

const Icon = ({ isFolder, name }) => {
  const splt = name.split(".");
  const type = splt[splt.length - 1];

  const getIcon = () => {
    switch (type) {
      case "png":
      case "jpg":
      case "gif":
        return <AiFillFileImage className="MuiSvgIcon-root icon" />;
      case "zip":
        return <AiFillFileZip className="MuiSvgIcon-root icon" />;
      case "pdf":
        return <AiFillFilePdf className="MuiSvgIcon-root icon" />;
      case "doc":
      case "docx":
      case "rtf":
      case "txt":
        return <AiFillFileText className="MuiSvgIcon-root icon" />;
      default:
        return isFolder ? (
          <AiFillFolder className="MuiSvgIcon-root icon" />
        ) : (
          <AiFillFile className="MuiSvgIcon-root icon" />
        );
    }
  };
  return <>{getIcon()}</>;
};

Icon.propTypes = {
  isFolder: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
};

export default Icon;
