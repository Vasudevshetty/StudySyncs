// src/pages/Me.js
import { useState, useEffect } from "react";
import styles from "./styles/me.module.css";
import Sidebar from "./Sidebar";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";

function Me() {
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user profile data
    const fetchProfileData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_SERVER_URL}/users/me`,
          {
            method: "GET",
            credentials: "include", // Ensure cookies are sent with the request
          }
        );
        const data = await response.json();
        if (data.status === "success") {
          setIsLoading(false);
          setProfileData(data.data.user);
        } else {
          setIsLoading(false);
          console.error("Error fetching profile data:", data.message);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Sidebar />
          <div className={styles.profile}>
            <div className={styles.profilePicContainer}>
              <h1>
                <span className="highlight">{profileData?.name}</span>
              </h1>
              <img
                src={profileData?.profilePic || "/img/dp.jpg"}
                alt="Profile"
                className={styles.profilePic}
              />
            </div>
            <div className={styles.profileDetails}>
              <p> {profileData?.email}</p>
              <p> {profileData?.college}</p>
              <p> {profileData?.course}</p>
              <p>sem-{profileData?.currentSemester}</p>
            </div>
            <div className={styles.btnContainer}>
              <button className="btn">Edit</button>
              <button
                className="btn"
                onClick={() => navigate(`/app/colleges/*`)}
              >
                Get study materials{" "}
              </button>
              <button className="btn">Logout</button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Me;
