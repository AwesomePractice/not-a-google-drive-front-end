import PropTypes from "prop-types";

import { MdKeyboardArrowRight } from "react-icons/md";

import "./styles.scss";

const Path = ({ path, handleChange }) => (
  <div className="path--container container">
    <p className="path">
      {path.map((item) => (
        <PathItem item={item} handleChange={handleChange} key={item.name} />
      ))}
    </p>
  </div>
);

const PathItem = ({ item, handleChange }) => {
  const handleClick = (e) => {
    e.preventDefault();
    handleChange(item.id);
  };
  return (
    <button type="button" onClick={handleClick} className="path__button">
      {item.name.toUpperCase()}
      <MdKeyboardArrowRight />
    </button>
  );
};

Path.propTypes = {
  path: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  handleChange: PropTypes.func.isRequired,
};

PathItem.propTypes = {
  item: PropTypes.objectOf(PropTypes.string).isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Path;
