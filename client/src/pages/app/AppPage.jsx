// src/pages/AppPage.js
import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import styles from "./styles/app.module.css";
import College from "./College";
import Course from "./Course";
import Semester from "./Semester";
import Me from "./Me";

function AppPage() {
  // const [userData, setUserData] = useState(null);
  // const [bookmarks, setBookmarks] = useState([]);
  // const [downloads, setDownloads] = useState([]);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const response = await fetch(
  //         `${import.meta.env.VITE_BACKEND_SERVER_URL}/users/me`,
  //         {
  //           method: "GET",
  //           credentials: "include",
  //         }
  //       );
  //       if (response.ok) {
  //         const data = await response.json();
  //         setUserData(data.data.user);

  //         // Fetch bookmarks and downloads
  //         const bookmarksResponse = await fetch(
  //           `${import.meta.env.VITE_BACKEND_SERVER_URL}/users/bookmarks`,
  //           { method: "GET", credentials: "include" }
  //         );
  //         const bookmarksData = await bookmarksResponse.json();
  //         setBookmarks(bookmarksData.data);

  //         const downloadsResponse = await fetch(
  //           `${import.meta.env.VITE_BACKEND_SERVER_URL}/users/downloads`,
  //           { method: "GET", credentials: "include" }
  //         );
  //         const downloadsData = await downloadsResponse.json();
  //         setDownloads(downloadsData.data);
  //       } else {
  //         navigate("/"); // Redirect to login if not authenticated
  //       }
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //       navigate("/login");
  //     }
  //   };

  //   fetchUserData();
  // }, [navigate]);

  return (
    <div className={styles.app}>
      {/* <Navbar userData={userData} bookmarks={bookmarks} downloads={downloads} /> */}
      <Navbar />
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
          <Route
            path="me"
            element={
              <Me
                // userData={userData}
                // bookmarks={bookmarks}
                // downloads={downloads}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default AppPage;
