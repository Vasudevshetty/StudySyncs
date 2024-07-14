import { useState, useEffect } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { storage } from "../../../firebaseConfig";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import styles from "./styles/app.module.css";
import Loader from "./Loader";

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

  const [subjects, setSubjects] = useState([]);
  const [modules, setModules] = useState([]);
  const [files, setFiles] = useState([]);

  const [loadingSubjects, setLoadingSubjects] = useState(false);
  const [loadingModules, setLoadingModules] = useState(false);
  const [loadingFiles, setLoadingFiles] = useState(false);

  const [currentModule, setCurrentModule] = useState(currentModuleNumber || 1);

  useEffect(() => {
    async function fetchSemesterData() {
      setLoadingSubjects(true);
      setLoadingModules(true);
      try {
        const response = await fetch(
          "https://studysyncs.onrender.com/api/v1/semesters"
        );
        const { data } = await response.json();
        const semesterData = data.semesters[0];
        setSubjects(semesterData.subjects);
        setLoadingSubjects(false);
        setLoadingModules(false);
      } catch (error) {
        console.error(error);
        setLoadingSubjects(false);
        setLoadingModules(false);
      }
    }
    fetchSemesterData();
  }, []);

  useEffect(() => {
    if (subjects.length && !currentSubjectCode) {
      const firstSubject = subjects[0];
      navigate(
        `?subject=${firstSubject.code}&module=${firstSubject.modules[0].number}`
      );
    }
  }, [subjects, currentSubjectCode, navigate]);

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
  }, [subjects, currentSubjectCode, currentModuleNumber]);

  useEffect(() => {
    if (currentSubjectCode && currentModule) {
      navigate(`?subject=${currentSubjectCode}&module=${currentModule}`);
    }
  }, [currentSubjectCode, currentModule, navigate]);

  useEffect(() => {
    const fetchFiles = async () => {
      setLoadingFiles(true);
      try {
        const storageRef = ref(
          storage,
          `${collegeSlug}/${courseSlug}/${semesterSlug}/${currentSubjectCode}/module-${currentModule}`
        );
        const listResult = await listAll(storageRef);

        const fileList = listResult.items.map(async (itemRef) => {
          const url = await getDownloadURL(itemRef);
          return {
            name: itemRef.name,
            fullPath: itemRef.fullPath,
            url,
          };
        });

        const fileData = await Promise.all(fileList);
        setFiles(fileData);
        setLoadingFiles(false);
      } catch (error) {
        console.error("Error fetching files: ", error);
        setLoadingFiles(false);
      }
    };

    if (currentSubjectCode && currentModule) {
      fetchFiles();
    }
  }, [
    collegeSlug,
    courseSlug,
    semesterSlug,
    currentSubjectCode,
    currentModule,
  ]);

  return (
    <div className={styles.mainContent}>
      <div className={styles.breadcrumb}>
        <div>
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
          {loadingSubjects ? (
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
          {loadingModules ? (
            <Loader />
          ) : (
            modules.map((module) => (
              <Module
                module={module}
                key={module.number}
                currentModule={currentModule}
                setCurrentModule={setCurrentModule}
              />
            ))
          )}
        </div>
        <div className={styles.filesBox}>
          {loadingFiles ? (
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
      <span className={styles.fileName}>{file.name}</span>
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
      {module.name}
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
      {subject.name}
    </div>
  );
}
