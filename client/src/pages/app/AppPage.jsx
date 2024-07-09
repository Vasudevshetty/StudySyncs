import Navbar from "./Navbar";
import MainContent from "./MainContent";
import Sidebar from "./Sidebar";
import "../../../public/app.css";

function AppPage() {
  return (
    <div className="app">
      <Navbar />
      <div className="app__body">
        <Sidebar />
        <MainContent />
      </div>
    </div>
  );
}

export default AppPage;
