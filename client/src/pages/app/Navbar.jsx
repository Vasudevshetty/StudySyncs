import { useNavigate } from "react-router-dom";
import styles from "./styles/app.module.css";
import { useState, useEffect } from "react";

function Navbar({ profileData }) {
  const navigate = useNavigate();
  const [subjectCode, setSubjectCode] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      const collegeSlug = "sjce";
      const courseSlug =
        subjectCode.split("").slice(0, 2).join("").toLowerCase() + "e";

      if (subjectCode.length > 2) {
        const response = await fetch(
          `https://studysyncs.onrender.com/api/v1/semesters/${collegeSlug}/${courseSlug}?query=${subjectCode}`
        );
        const data = await response.json();

        if (response.ok) {
          setSuggestions(data.data);
        } else {
          setSuggestions([]);
        }
      } else {
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [subjectCode]);

  const handleSearch = () => {
    if (subjectCode) {
      const collegeSlug = "sjce"; // or dynamically set this based on your app's context
      const courseSlug =
        subjectCode.split("").slice(0, 2).join("").toLowerCase() + "e";
      const semesterSlug = subjectCode.charAt(2);

      // Navigate to the details page with params
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

    // Navigate to the details page with params
    navigate(
      `colleges/${collegeSlug}/${courseSlug}/sem-${semesterSlug}?subject=${suggestion.code}&module=1`
    );
    setSubjectCode("");
    setShowSuggestions(false);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navLeftblock}>
        <img
          src="/img/home.png"
          alt="home navigation"
          className={styles.navIcon}
          onClick={() => navigate("/")}
        />
        <img
          src="/img/logo-final-light.png"
          alt="logo"
          className={styles.navLogo}
          onClick={() => navigate("/app/colleges/*")}
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
          {showSuggestions && suggestions.length > 0 && (
            <div className={styles.dropdown}>
              {suggestions.map((suggestion) => (
                <div
                  key={suggestion._id}
                  className={styles.fileDropDown}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion.code} - {suggestion.name}
                </div>
              ))}
            </div>
          )}
          {subjectCode && showSuggestions && suggestions.length === 0 && (
            <div className={styles.errorDropdown}>
              <p> No matching subjects found.</p>
            </div>
          )}
        </div>
      </div>

      <div className={styles.navRightblock}>
        <div className={styles.navIconContainer}>
          <img
            src="/img/bookmark.png"
            alt="bookmark"
            className={styles.navIcon}
          />
          <div className={styles.dropdown}>
            {[1, 2, 3].map((item) => (
              <div className={styles.fileDropDown} key={item}>
                <img
                  src={`/img/${item % 2 ? "ppt.png" : "pdf.png"}`}
                  alt="ppt"
                  className={styles.navFileIcon}
                />
                Dummy Bookmark {item}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.navIconContainer}>
          <img
            src="/img/download.png"
            alt="download"
            className={styles.navIcon}
          />
          <div className={styles.dropdown}>
            {[1, 2, 3, 4].map((item) => (
              <div className={styles.fileDropDown} key={item}>
                <img
                  src={`/img/${item % 2 ? "ppt.png" : "pdf.png"}`}
                  alt="ppt"
                  className={styles.navFileIcon}
                />
                Dummy Download {item}
              </div>
            ))}
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
