import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import College from "./College";
import Course from "./Course";
import Semester from "./Semester";
import Me from "./Me";
import Loader from "./Loader";
import { useAuth } from "../../contexts/AuthContext";
import styles from "./styles/app.module.css";
import { AppProvider } from "../../contexts/AppContext";

function AppPage() {
  const { userData, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className={styles.app}>
        <Loader />
      </div>
    );
  }

  return (
    <AppProvider>
      <div className={styles.app}>
        <Navbar />
        <div className={styles.appBody}>
          <Routes>
            <Route
              path="colleges/:collegeSlug"
              element={<College collegeSlug={userData.college} />}
            />
            <Route
              path="colleges/:collegeSlug/:courseSlug"
              element={<Course />}
            />
            <Route
              path="colleges/:collegeSlug/:courseSlug/:semesterSlug"
              element={<Semester />}
            />
            <Route path="me" element={<Me userData={userData} />} />
          </Routes>
        </div>
      </div>
    </AppProvider>
  );
}

export default AppPage;
