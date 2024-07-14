import { useNavigate } from "react-router-dom";
import styles from "./styles/app.module.css";

function Navbar({ profileData }) {
  const navigate = useNavigate();

  return (
    <nav className={styles.navbar}>
      <div className={styles.navLeftblock}>
        <img
          src="/img/logo-final-light.png"
          alt="logo"
          className={styles.navLogo}
          onClick={() => navigate("/app/colleges/*")}
        />
      </div>

      <div className={styles.navMid}>
        <input
          type="text"
          placeholder="Search with subject code"
          className={styles.navSearch}
        />
        <button className={styles.searchButton}>
          <img src="/img/search.png" alt="search" className={styles.navIcon} />
        </button>
      </div>

      <div className={styles.navRightblock}>
        <div className={styles.navIconContainer}>
          <img
            src="/img/bookmark.png"
            alt="bookmark"
            className={styles.navIcon}
          />
          <div className={styles.dropdown}>
            <p>
              <img
                src="/img/ppt.png"
                alt="ppt"
                className={styles.navFileIcon}
              />
              Bookmark 1
            </p>
            <p>Bookmark 2</p>
            <p>Bookmark 3</p>
          </div>
        </div>

        <div className={styles.navIconContainer}>
          <img
            src="/img/download.png"
            alt="download"
            className={styles.navIcon}
          />
          <div className={styles.dropdown}>
            <p>Download 1</p>
            <p>Download 2</p>
            <p>Download 3</p>
          </div>
        </div>

        <div className={styles.navIconContainer}>
          <img src="/img/dp.jpg" alt="user" className={styles.navUser} />
          <div className={styles.dropdown}>
            <div className={styles.profileData}>
              <div className={styles.profilePic}>
                <img src="/img/dp.jpg" alt="user photo" />
              </div>
              <div>
                <p>{profileData.name}</p>
                <p>{profileData.usn}</p>
                <p>{profileData.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
