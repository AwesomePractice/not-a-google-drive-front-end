/* eslint-disable react/prop-types */
import Header from "../../modules/Header";
import Sidebar from "../../modules/Sidebar";
import Files from "../../modules/Files";

const HomeView = ({ token }) => {
  console.log(token);
  return (
    <>
      <Header />
      <div className="app_main container">
        <Sidebar />
        <Files />
      </div>
    </>
  );
};

export default HomeView;
