import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import styles from "./styles/app.module.css";
import College from "./College";
import Course from "./Course";
import Semester from "./Semester";

function AppPage() {
  return (
    <div className={styles.app}>
      <Navbar />
      <div className={styles.appBody}>
        <Routes>
          <Route path="colleges/:collegeSlug" element={<College />} />
          <Route path="colleges/:collegeSlug/:courseSlug" element={<Course />} />
          <Route
            path="colleges/:collegeSlug/:courseSlug/:semesterSlug"
            element={<Semester />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default AppPage;
