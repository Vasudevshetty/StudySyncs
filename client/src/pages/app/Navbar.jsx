import { useNavigate } from "react-router-dom";
import styles from "./styles/app.module.css";

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className={styles.navbar}>
      <div className={styles.navLeftblock}>
        <img
          src="/img/logo-final-light.png"
          alt="logo"
          className={styles.navLogo}
          onClick={() => navigate("/app/college/*")}
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
        <img src="/img/bookmark.png" alt="user" className={styles.navIcon} />
        <img src="/img/download.png" alt="user" className={styles.navIcon} />
        <img src="/img/user.png" alt="user" className={styles.navUser} />
      </div>
    </nav>
  );
}

export default Navbar;
