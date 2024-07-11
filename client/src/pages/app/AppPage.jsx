import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import styles from "./styles/app.module.css";
import College from "./College";
import Course from "./Course";
import Semester from "./Semester";

function AppPage() {
  return (
    <div className={styles.app}>
      <Navbar />
      <div className={styles.appBody}>
        <Sidebar />
        <div className={styles.mainContent}>
          <Routes>
            <Route path="college" element={<College />} />
            <Route
              path="college/:collegeName/:courseName"
              element={<Course />}
            />
            <Route
              path="college/:collegeName/:courseName/:semesterName"
              element={<Semester />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default AppPage;
