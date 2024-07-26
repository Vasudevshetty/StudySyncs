import styles from "./styles/me.module.css";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";

function Me({ userData }) {
  const navigate = useNavigate();

  return (
    <>
      <Sidebar />
      <div className={styles.profile}>
        <div className={styles.profilePicContainer}>
          <h1>
            <span className="highlight">{userData?.name}</span>
          </h1>
          <img
            src={userData?.profilePic || "/img/dp.jpg"}
            alt="Profile"
            className={styles.profilePic}
          />
        </div>
        <div className={styles.profileDetails}>
          <p> {userData?.email}</p>
          <p> {userData?.college}</p>
          <p> {userData?.course}</p>
          <p>sem-{userData?.currentSemester}</p>
        </div>
        <div className={styles.btnContainer}>
          <button className="btn">Edit</button>
          <button className="btn" onClick={() => navigate(`/app/colleges/*`)}>
            Get study materials{" "}
          </button>
          <button className="btn">Logout</button>
        </div>
      </div>
    </>
  );
}

export default Me;
