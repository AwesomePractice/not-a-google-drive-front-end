import Header from "../../modules/Header";
import Sidebar from "../../modules/Sidebar";
import Files from "../../modules/Files";

const HomeView = () => (
  <>
    <Header />
    <div className="app_main container">
      <Sidebar />
      <Files />
    </div>
  </>
);

export default HomeView;
