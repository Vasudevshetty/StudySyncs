import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Loader from "./Loader";
import styles from "./styles/app.module.css";
import { useAuth } from "../../contexts/AuthContext";
import { useAppContext } from "../../contexts/AppContext";

function Navbar() {
  const { userData, logout } = useAuth();
  const { fetchSuggestions, suggestions, isSuggestionsLoading } =
    useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const isOnMePage = location.pathname === "/app/me";

  const [subjectCode, setSubjectCode] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (userData && userData.college) {
      fetchSuggestions(subjectCode, userData.college);
    }
  }, [subjectCode, userData, fetchSuggestions]);

  const handleSearch = () => {
    if (subjectCode) {
      const collegeSlug = "sjce"; // or dynamically set this based on your app's context
      const courseSlug =
        subjectCode.split("").slice(0, 2).join("").toLowerCase() + "e";
      const semesterSlug = subjectCode.charAt(2);

      navigate(
        `colleges/${collegeSlug}/${courseSlug}/sem-${semesterSlug}?subject=${subjectCode.toUpperCase()}&module=1`
      );
      setSubjectCode("");
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    const collegeSlug = "sjce"; // or dynamically set this based on your app's context
    const courseSlug =
      suggestion.code.split("").slice(0, 2).join("").toLowerCase() + "e";
    const semesterSlug = suggestion.code.charAt(2);

    navigate(
      `colleges/${collegeSlug}/${courseSlug}/sem-${semesterSlug}?subject=${suggestion.code}&module=1`
    );
    setSubjectCode("");
    setShowSuggestions(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navLeftblock}>
        <img
          src="/img/logo-final-light.png"
          alt="logo"
          className={styles.navLogo}
          onClick={() => navigate(`/app/colleges/${userData.college}`)}
        />
      </div>

      <div className={styles.navMid}>
        <div className={styles.serachContainer}>
          <input
            type="text"
            placeholder="Enter subject code [ex: ec330]"
            className={styles.navSearch}
            value={subjectCode}
            onChange={(e) => {
              setSubjectCode(e.target.value);
              setShowSuggestions(true);
            }}
          />
          <button className={styles.searchButton} onClick={handleSearch}>
            <img
              src="/img/search.png"
              alt="search"
              className={styles.navIcon}
            />
          </button>
          {showSuggestions && isSuggestionsLoading && (
            <div className={styles.dropdown} ref={dropdownRef}>
              <Loader />
            </div>
          )}

          {showSuggestions && suggestions.length > 0 && (
            <div className={styles.dropdown} ref={dropdownRef}>
              {suggestions.map((suggestion) => (
                <div
                  key={suggestion._id}
                  className={styles.fileDropDown}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <div className={styles.codeDetails}>
                    <span className={styles.codeBadge}>{suggestion.code}</span>{" "}
                    - <span className={styles.codeName}>{suggestion.name}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
          {!isSuggestionsLoading &&
            subjectCode.length > 2 &&
            showSuggestions &&
            suggestions.length === 0 && (
              <div className={styles.errorDropdown} ref={dropdownRef}>
                <p>No matching subjects found.</p>
              </div>
            )}
        </div>
      </div>

      <div className={styles.navRightblock}>
        <div
          className={`${styles.navIconContainer} ${
            isOnMePage ? styles.nonHoverable : ""
          }`}
        >
          <img
            src="/img/bookmark.png"
            alt="bookmark"
            className={styles.navIcon}
          />
          <div className={styles.dropdown}>
            {userData.bookmarks.length > 0 ? (
              userData.bookmarks.map((item) => (
                <div className={styles.fileDropDown} key={item._id}>
                  <img
                    src={`/img/${item.type === "ppt" ? "ppt.png" : "pdf.png"}`}
                    alt="file"
                    className={styles.navFileIcon}
                  />
                  {item.title}
                </div>
              ))
            ) : (
              <p>No bookmarks available.</p>
            )}
          </div>
        </div>

        <div
          className={`${styles.navIconContainer} ${
            isOnMePage ? styles.nonHoverable : ""
          }`}
        >
          <img
            src="/img/download.png"
            alt="download"
            className={styles.navIcon}
          />
          <div className={styles.dropdown}>
            {userData.downloads.length > 0 ? (
              userData.downloads.map((item) => (
                <div className={styles.fileDropDown} key={item._id}>
                  <img
                    src={`/img/${item.type === "ppt" ? "ppt.png" : "pdf.png"}`}
                    alt="file"
                    className={styles.navFileIcon}
                  />
                  {item.title}
                </div>
              ))
            ) : (
              <p>No downloads available.</p>
            )}
          </div>
        </div>

        <div
          className={`${styles.navIconContainer} ${
            isOnMePage ? styles.nonHoverable : ""
          }`}
        >
          <img src={userData.photo} alt="user" className={styles.navUser} />
          <div className={styles.dropdown}>
            <div className={styles.profileData}>
              <div className={styles.profilePic}>
                <img
                  src={userData.photo || "/img/guest.png"}
                  alt="user photo"
                />
              </div>
              <div>
                <p>{userData.name}</p>
                <p>{userData.email}</p>
              </div>
            </div>
            <div className={styles.profileActions}>
              <button onClick={() => navigate("me")}>
                <img src="/img/profile.png" alt="profile" />
                Profile
              </button>
              <button onClick={handleLogout}>
                <img src="/img/logout.png" alt="" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
