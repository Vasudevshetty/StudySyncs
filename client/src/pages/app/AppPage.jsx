import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import styles from "./styles/app.module.css";
import College from "./College";
import Course from "./Course";
import Semester from "./Semester";
import Me from "./Me";

function AppPage() {
  const profileData = JSON.parse(localStorage.getItem("profileData")) || {};

  return (
    <div className={styles.app}>
      <Navbar profileData={profileData} />
      <div className={styles.appBody}>
        <Routes>
          <Route path="colleges/:collegeSlug" element={<College />} />
          <Route
            path="colleges/:collegeSlug/:courseSlug"
            element={<Course />}
          />
          <Route
            path="colleges/:collegeSlug/:courseSlug/:semesterSlug"
            element={<Semester />}
          />
          <Route path="me" element={<Me />} />
        </Routes>
      </div>
    </div>
  );
}

export default AppPage;
