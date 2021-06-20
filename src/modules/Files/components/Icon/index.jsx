import PropTypes from "prop-types";

import FileIcon from "@material-ui/icons/InsertDriveFile";
import FolderIcon from "@material-ui/icons/Folder";
import PhotoIcon from "@material-ui/icons/Photo";
import PdfIcon from "@material-ui/icons/PictureAsPdf";
import DescriptionIcon from "@material-ui/icons/Description";

const Icon = ({ isFolder, name }) => {
  const splt = name.split(".");
  const type = splt[splt.length - 1];

  const getIcon = () => {
    switch (type) {
      case "png":
      case "jpg":
      case "gif":
        return <PhotoIcon />;
      case "pdf":
        return <PdfIcon />;
      case "doc":
      case "docx":
      case "rtf":
      case "txt":
        return <DescriptionIcon />;
      default:
        return isFolder ? <FolderIcon /> : <FileIcon />;
    }
  };
  return <>{getIcon()}</>;
};

Icon.propTypes = {
  isFolder: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
};

export default Icon;
