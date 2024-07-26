import styles from "./styles/me.module.css";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

function Me({ userData }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <>
      <Sidebar />
      <div className={styles.profile}>
        <div className={styles.profilePicContainer}>
          <h1>
            <span className="highlight">{userData?.name}</span>
          </h1>
          <img
            src={userData.photo}
            alt="Profile"
            className={styles.profilePic}
          />
        </div>
        <div className={styles.profileDetails}>
          <p> {userData?.email}</p>
          <p> {userData?.college}</p>
          <p> {userData?.course}</p>
          <p>
            {userData.currentSemester
              ? "sem-" + userData?.currentSemester
              : null}
          </p>
        </div>

        <div className={styles.resourceData}>
          {/* Bookmarks Section */}
          <div className={styles.bookmarks}>
            <h2>Bookmarks</h2>
            {userData.bookmarks.length > 0 ? (
              <ul>
                {userData.bookmarks.map((bookmark, index) => (
                  <li key={index} className={styles.bookmarkItem}>
                    <img
                      src={`/img/${
                        bookmark.type === "ppt" ? "ppt.png" : "pdf.png"
                      }`}
                      alt="Bookmark"
                      className={styles.fileIcon}
                    />
                    {bookmark.title}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No bookmarks found.</p>
            )}
          </div>

          {/* Downloads Section */}
          <div className={styles.downloads}>
            <h2>Downloads</h2>
            {userData.downloads.length > 0 ? (
              <ul>
                {userData.downloads.map((download, index) => (
                  <li key={index} className={styles.downloadItem}>
                    <img
                      src={`/img/${
                        download.type === "ppt" ? "ppt.png" : "pdf.png"
                      }`}
                      alt="Download"
                      className={styles.fileIcon}
                    />
                    {download.title}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No downloads found.</p>
            )}
          </div>
        </div>

        <div className={styles.btnContainer}>
          <button className="btn">Edit</button>
          <button
            className="btn"
            onClick={() =>
              navigate(
                `/app/colleges/${userData.college}/${userData.course}/sem-${userData.currentSemester}`
              )
            }
          >
            Get study materials
          </button>
          <button className="btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default Me;
