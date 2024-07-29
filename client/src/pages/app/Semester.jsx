import { useState, useEffect } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import styles from "./styles/app.module.css";
import Loader from "./Loader";
import { useAppContext } from "../../contexts/AppContext";
import { useAuth } from "../../contexts/AuthContext";

function getFileType(fileName) {
  const extension = fileName.split(".").pop();
  return extension === "pptx" ? "ppt" : "pdf";
}

function SemesterPage() {
  const { collegeSlug, courseSlug, semesterSlug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const currentSubjectCode = query.get("subject");
  const currentModuleNumber = parseInt(query.get("module"));

  const {
    subjects,
    modules,
    files,
    isLoading,
    fetchSemesterData,
    fetchFiles,
    setModules,
  } = useAppContext();
  const { isAuth } = useAuth();
  const [currentModule, setCurrentModule] = useState(currentModuleNumber || 1);

  useEffect(() => {
    fetchSemesterData(collegeSlug, courseSlug, semesterSlug);
  }, [semesterSlug, collegeSlug, courseSlug, fetchSemesterData]);

  useEffect(() => {
    if (subjects.length && !currentSubjectCode) {
      const firstSubject = subjects[0];
      navigate(
        `?subject=${firstSubject.code}&module=${firstSubject.modules[0].number}`
      );
      if (isAuth)
        fetchFiles(
          collegeSlug,
          courseSlug,
          semesterSlug,
          currentSubjectCode,
          currentModule
        );
    }
  }, [
    subjects,
    currentSubjectCode,
    navigate,
    fetchFiles,
    collegeSlug,
    courseSlug,
    semesterSlug,
    currentModule,
    isAuth,
  ]);

  useEffect(() => {
    if (subjects.length && currentSubjectCode) {
      const selectedSubject = subjects.find(
        (subject) => subject.code === currentSubjectCode
      );
      if (selectedSubject) {
        setModules(selectedSubject.modules);
        if (
          !currentModuleNumber ||
          !selectedSubject.modules.find(
            (module) => module.number === currentModuleNumber
          )
        ) {
          setCurrentModule(selectedSubject.modules[0].number);
        }
      }
    }
  }, [subjects, currentSubjectCode, currentModuleNumber, setModules]);

  useEffect(() => {
    if (currentSubjectCode && currentModule) {
      navigate(`?subject=${currentSubjectCode}&module=${currentModule}`);
      if (isAuth)
        fetchFiles(
          collegeSlug,
          courseSlug,
          semesterSlug,
          currentSubjectCode,
          currentModule
        );
    }
  }, [
    currentSubjectCode,
    currentModule,
    navigate,
    fetchFiles,
    collegeSlug,
    courseSlug,
    semesterSlug,
    isAuth,
  ]);

  return (
    <div className={styles.mainContent}>
      <div className={styles.breadcrumb}>
        <div>
          <Link to="/">HOME / </Link>
          <Link to={`/app/colleges/${collegeSlug}`}>
            {collegeSlug.toUpperCase()}
          </Link>
          /{" "}
          <Link to={`/app/colleges/${collegeSlug}/${courseSlug}`}>
            {courseSlug.toUpperCase()}
          </Link>
          / {semesterSlug.toUpperCase()}
        </div>
        <div>
          {
            subjects.find((subject) => subject.code === currentSubjectCode)
              ?.name
          }
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.subjectBox}>
          {isLoading.subjects ? (
            <Loader />
          ) : (
            subjects.map((subject) => (
              <Subject
                subject={subject}
                currentSubjectCode={currentSubjectCode}
                key={subject.code}
                setCurrentModule={setCurrentModule}
              />
            ))
          )}
        </div>
        <div className={styles.moduleBox}>
          {isLoading.subjects ? (
            <Loader />
          ) : (
            modules.map((module) => (
              <Module
                module={module}
                key={module.name}
                currentModule={currentModule}
                setCurrentModule={setCurrentModule}
              />
            ))
          )}
        </div>
        <div className={styles.filesBox}>
          {isLoading.files ? (
            <Loader />
          ) : (
            files.map((file) => <File file={file} key={file.name} />)
          )}
        </div>
      </div>
    </div>
  );
}

export default SemesterPage;

function File({ file }) {
  return (
    <div className={styles.file}>
      <img
        src={`/img/${getFileType(file.name)}.png`}
        alt={getFileType(file.name)}
        className={styles.fileIcon}
      />
      <div className={styles.fileNameWrapper}>
        <span className={styles.fileName}>{file.name}</span>
      </div>
      <a
        target="_blank"
        href={file.url}
        download
        className={styles.downloadLink}
      >
        Download
      </a>
    </div>
  );
}

function Module({ module, currentModule, setCurrentModule }) {
  const handleClick = () => {
    setCurrentModule(module.number);
  };

  return (
    <div
      className={`${styles.module} ${
        module.number === currentModule ? styles.selected : ""
      }`}
      onClick={handleClick}
    >
      <div className={styles.codeDetails}>
        <span className={styles.codeBadge}>M-{module.number}</span>
        <span className={styles.codeName}>{module.name}</span>
      </div>
    </div>
  );
}

function Subject({ subject, currentSubjectCode, setCurrentModule }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`?subject=${subject.code}`);
    setCurrentModule(subject.modules[0].number);
  };

  return (
    <div
      className={`${styles.subject} ${
        subject.code === currentSubjectCode ? styles.selected : ""
      }`}
      onClick={handleClick}
    >
      <div className={styles.codeDetails}>
        <span className={styles.codeBadge}>{subject.code}</span>
        <span>{subject.name}</span>
      </div>
    </div>
  );
}
