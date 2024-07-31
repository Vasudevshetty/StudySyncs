import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import styles from "./styles/me.module.css";
import Sidebar from "./Sidebar";
import Loader from "./Loader";
import ImageUpload from "../ImageUpload";

function Me({ userData }) {
  const { logout, removeBookmark, removeDownload, isLoading } = useAuth();
  const [showImageUpload, setShowImageUpload] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const handleRemoveBookmark = async (resource) => {
    await removeBookmark(resource);
  };

  const handleRemoveDownload = async (resource) => {
    await removeDownload(resource);
  };

  return (
    <>
      <Sidebar />
      <div className={styles.profile}>
        <div className={styles.profilePicContainer}>
          <h1>{userData?.name}</h1>
          <div className={styles.profilePicWrapper}>
            <div>
              <img
                src={userData.profileImage}
                alt="Profile"
                className={styles.profilePic}
              />
            </div>
            <div className={styles.uploadButtonWrapper}>
              <button
                className={styles.uploadButton}
                onClick={() =>
                  setShowImageUpload((showImageUpload) => !showImageUpload)
                }
              >
                <img src="/img/upload.png" alt="upload" />
              </button>
              {showImageUpload && (
                <ImageUpload setShowImageUpload={setShowImageUpload} />
              )}
            </div>
          </div>
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
            {isLoading.removeBookmark ? (
              <Loader />
            ) : userData.bookmarks.length > 0 ? (
              <ul>
                {userData.bookmarks.map((bookmark, index) => (
                  <li key={index} className={styles.bookmarkItem}>
                    <div>
                      <img
                        src={`/img/${
                          bookmark.type === "ppt" ? "ppt.png" : "pdf.png"
                        }`}
                        alt="Bookmark"
                        className={styles.fileIcon}
                      />
                      {bookmark.title}
                    </div>

                    <button onClick={() => handleRemoveBookmark(bookmark)}>
                      <img
                        src="/img/delete.png"
                        alt="delete"
                        className={styles.deleteIcon}
                      />
                    </button>
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
            {isLoading.removeDownload ? (
              <Loader />
            ) : userData.downloads.length > 0 ? (
              <ul>
                {userData.downloads.map((download, index) => (
                  <li key={index} className={styles.downloadItem}>
                    <a href={download.url} target="_blank" download>
                      <img
                        src={`/img/${
                          download.type === "ppt" ? "ppt.png" : "pdf.png"
                        }`}
                        alt="file"
                        className={styles.fileIcon}
                      />
                      {download.title}
                    </a>
                    <button onClick={() => handleRemoveDownload(download)}>
                      <img
                        src="/img/delete.png"
                        className={styles.deleteIcon}
                        alt="delete"
                      />
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No downloads found.</p>
            )}
          </div>
        </div>

        <div className={styles.btnContainer}>
          <button>
            <img src="/img/edit.png" alt="edit" />
            Edit
          </button>
          <button
            onClick={() =>
              navigate(
                `/app/colleges/${userData.college}/${userData.course}/sem-${userData.currentSemester}`
              )
            }
          >
            <img src="/img/file.png" alt="files" />
            Get study materials
          </button>
          <button onClick={handleLogout}>
            <img src="/img/logout.png" alt="logout" />
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default Me;
