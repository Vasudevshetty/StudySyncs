import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import styles from "./styles/app.module.css";

function Navbar({ profileData }) {
  const navigate = useNavigate();
  const [subjectCode, setSubjectCode] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef(null); // Ref to the dropdown

  useEffect(() => {
    const fetchSuggestions = async () => {
      const collegeSlug = "sjce";
      const courseSlug =
        subjectCode.split("").slice(0, 2).join("").toLowerCase() + "e";

      if (subjectCode.length > 2) {
        try {
          setIsLoading(true);
          const response = await fetch(
            `https://studysyncs.onrender.com/api/v1/semesters/${collegeSlug}/${courseSlug}?query=${subjectCode}`
          );
          const data = await response.json();

          if (response.ok) {
            setSuggestions(data.data);
            setIsLoading(false);
          } else {
            setSuggestions([]);
            setIsLoading(false);
          }
        } catch (error) {
          console.log(error);
          setIsLoading(false);
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

  // Close dropdown on escape key press
  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  // Close dropdown on clicking outside
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    // Add event listeners
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("click", handleClickOutside);

    // Cleanup event listeners on unmount
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navLeftblock}>
        <img
          src="/img/home.png"
          alt="home navigation"
          className={styles.navHome}
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
          {showSuggestions && isLoading && (
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
          {!isLoading &&
            subjectCode.length > 2 &&
            showSuggestions &&
            suggestions.length === 0 && (
              <div className={styles.errorDropdown} ref={dropdownRef}>
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
