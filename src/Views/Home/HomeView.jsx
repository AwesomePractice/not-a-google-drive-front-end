import { useDispatch } from "react-redux";

import { ImGoogleDrive } from "react-icons/im";
import Header from "../../modules/Header";
import Sidebar from "../../modules/Sidebar";
import Files from "../../modules/Files";

import "./styles.scss";
import { setPage } from "../../__shared/actions/setPage";

const HomeView = () => {
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(setPage("-home"));
  };
  return (
    <div className="homeView--container">
      <button className="logo" type="button" onClick={handleClick}>
        <ImGoogleDrive />
        <span>NotGoogleDrive</span>
      </button>
      <Header />
      <Sidebar />
      <Files />
    </div>
  );
};

export default HomeView;
