import { useState, useEffect } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import styles from "./styles/app.module.css";

// Dummy data
const dummyModules = {
  Subject1: ["Module 1", "Module 2", "Module 3", "Module 4", "Module 5"],
  Subject2: ["Module 6", "Module 7", "Module 8", "Module 9", "Module 10"],
  Subject3: ["Module 11", "Module 12", "Module 13", "Module 14", "Module 15"],
  Subject4: ["Module 16", "Module 17", "Module 18", "Module 19", "Module 20"],
};

const dummyFiles = {
  "Module 1": ["file1.pdf", "file2.ppt"],
  "Module 2": ["file3.pdf", "file4.ppt"],
  "Module 3": ["file5.pdf", "file6.ppt"],
  "Module 4": ["file7.pdf", "file8.ppt"],
  "Module 5": ["file9.pdf", "file10.ppt"],
  "Module 6": ["file1.pdf", "file2.ppt"],
  "Module 7": ["file3.pdf", "file4.ppt"],
  "Module 8": ["file5.pdf", "file6.ppt"],
  "Module 9": ["file7.pdf", "file8.ppt"],
  "Module 10": ["file9.pdf", "file10.ppt"],
  "Module 11": ["file1.pdf", "file2.ppt"],
  "Module 12": ["file3.pdf", "file4.ppt"],
  "Module 13": ["file5.pdf", "file6.ppt"],
  "Module 14": ["file7.pdf", "file8.ppt"],
  "Module 15": ["file9.pdf", "file10.ppt"],
  "Module 16": ["file1.pdf", "file2.ppt"],
  "Module 17": ["file3.pdf", "file4.ppt"],
  "Module 18": ["file5.pdf", "file6.ppt"],
  "Module 19": ["file7.pdf", "file8.ppt"],
  "Module 20": ["file9.pdf", "file10.ppt"],
};

function getFileType(fileName) {
  const extension = fileName.split(".").pop();
  return extension;
}

function SemesterPage() {
  const { collegeName, courseName, semesterName } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const currentSubject = query.get("subject") || "Subject1";
  const [currentModule, setCurrentModule] = useState("Module 1");
  const [modules, setModules] = useState(dummyModules[currentSubject]);

  useEffect(() => {
    // Update the URL parameters
    navigate(`?subject=${currentSubject}&module=${currentModule}`);
  }, [currentSubject, currentModule, navigate]);

  useEffect(() => {
    // Update modules based on selected subject
    setModules(dummyModules[currentSubject]);
    setCurrentModule(dummyModules[currentSubject][0]); // Set default module
  }, [currentSubject]);

  return (
    <>
      <div className={styles.mainContent}>
        <div className={styles.breadcrumb}>
          <Link to={`/app/college/`}>{collegeName.toUpperCase()}</Link>/
          <Link to={`/app/college/${collegeName}/${courseName}`}>
            {courseName.toUpperCase()}
          </Link>
          / {semesterName.toUpperCase()}
        </div>
        <div className={styles.content}>
          <div className={styles.subjectBox}>
            {/* Subject selection block */}
            {Object.keys(dummyModules).map((subject) => (
              <div
                key={subject}
                className={`${styles.subject} ${
                  subject === currentSubject ? styles.selected : ""
                }`}
                onClick={() => navigate(`?subject=${subject}`)}
              >
                {subject}
              </div>
            ))}
          </div>
          <div className={styles.moduleBox}>
            {modules.map((module) => (
              <div
                key={module}
                className={`${styles.module} ${
                  module === currentModule ? styles.selected : ""
                }`}
                onClick={() => setCurrentModule(module)}
              >
                {module}
              </div>
            ))}
          </div>
          <div className={styles.filesBox}>
            {dummyFiles[currentModule]?.map((file) => (
              <div key={file} className={styles.file}>
                <img
                  src={`/img/${getFileType(file)}.png`}
                  alt={getFileType(file)}
                  className={styles.fileIcon}
                />
                <span className={styles.fileName}>{file}</span>
                {/* Placeholder link for files */}
                <a
                  href={`/files/${file}`}
                  download
                  className={styles.downloadLink}
                >
                  Download
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default SemesterPage;
