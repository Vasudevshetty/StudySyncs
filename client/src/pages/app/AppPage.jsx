import Navbar from "./Navbar";
import MainContent from "./MainContent";
import Sidebar from "./Sidebar";
import styles from "./styles/app.module.css";

function AppPage() {
  return (
    <div className={styles.app}>
      <Navbar />
      <div className={styles.appBody}>
        <Sidebar />
        <MainContent />
      </div>
    </div>
  );
}

export default AppPage;
