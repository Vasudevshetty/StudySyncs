import { useState, useEffect } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { storage } from "../../../firebaseConfig";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import styles from "./styles/app.module.css";
import FullPageLoader from "./FullPageLoader";

function getFileType(fileName) {
  const extension = fileName.split(".").pop();
  return extension === "pptx" ? "ppt" : "pdf";
}

function SemesterPage() {
  const { collegeName, courseName, semesterName } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const currentSubjectCode = query.get("subject");
  const currentModuleNumber = parseInt(query.get("module"));

  const [semester, setSemester] = useState({});
  const [modules, setModules] = useState([]);
  const [currentModule, setCurrentModule] = useState(currentModuleNumber || 1);
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://studysyncs.onrender.com/api/v1/semesters"
        );
        const { data } = await response.json();
        setSemester(data.semesters[0]);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (semester.subjects) {
      const firstSubject = semester.subjects[0];
      if (!currentSubjectCode && firstSubject) {
        navigate(
          `?subject=${firstSubject.code}&module=${firstSubject.modules[0].number}`
        );
      }
    }
  }, [semester, currentSubjectCode, navigate]);

  useEffect(() => {
    if (semester.subjects && currentSubjectCode) {
      const selectedSubject = semester.subjects.find(
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
  }, [semester, currentSubjectCode, currentModuleNumber]);

  useEffect(() => {
    if (currentSubjectCode && currentModule) {
      navigate(`?subject=${currentSubjectCode}&module=${currentModule}`);
    }
  }, [currentSubjectCode, currentModule, navigate]);

  useEffect(() => {
    const fetchFiles = async () => {
      setIsLoading(true);
      try {
        const storageRef = ref(
          storage,
          `${collegeName}/${courseName}/${semesterName}/${currentSubjectCode}/module-${currentModule}`
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
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching files: ", error);
        // Handle error (e.g., set state for error message)
      }
    };

    if (currentSubjectCode && currentModule) {
      fetchFiles();
    }
  }, [
    collegeName,
    courseName,
    semesterName,
    currentSubjectCode,
    currentModule,
  ]);

  const subjects = Array.isArray(semester.subjects) ? semester.subjects : [];

  if (isLoading) return <FullPageLoader />;

  return (
    <>
      <div className={styles.mainContent}>
        <div className={styles.breadcrumb}>
          <div>
            <Link to={`/app/college/`}>{collegeName.toUpperCase()}</Link>/{" "}
            <Link to={`/app/college/${collegeName}/${courseName}`}>
              {courseName.toUpperCase()}
            </Link>
            / {semesterName.toUpperCase()}
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
            {subjects.map((subject) => (
              <Subject
                subject={subject}
                currentSubjectCode={currentSubjectCode}
                key={subject.code}
                setCurrentModule={setCurrentModule}
              />
            ))}
          </div>
          <div className={styles.moduleBox}>
            {modules.map((module) => (
              <Module
                module={module}
                key={module.number}
                currentModule={currentModule}
                setCurrentModule={setCurrentModule}
              />
            ))}
          </div>
          <div className={styles.filesBox}>
            {files.map((file) => (
              <File file={file} key={file.name} />
            ))}
          </div>
        </div>
      </div>
    </>
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
