import { createContext, useContext, useState, useCallback } from "react";
import { storage } from "../../firebaseConfig";
import { ref, listAll, getDownloadURL } from "firebase/storage";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [college, setCollege] = useState(null);
  const [course, setCourse] = useState({});
  const [subjects, setSubjects] = useState([]);
  const [modules, setModules] = useState([]);
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [isSuggestionsLoading, setIsSuggestionsLoading] = useState(false);

  const fetchSuggestions = useCallback(async (subjectCode, collegeSlug) => {
    const courseSlug =
      subjectCode.split("").slice(0, 2).join("").toLowerCase() + "e";

    if (subjectCode.length > 2) {
      setIsSuggestionsLoading(true);
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_BACKEND_SERVER_URL
          }/semesters/${collegeSlug}/${courseSlug}?query=${subjectCode}`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();

        if (response.ok) {
          setSuggestions(data.data);
        } else {
          setSuggestions([]);
        }
      } catch (error) {
        console.log(error);
        setSuggestions([]);
      } finally {
        setIsSuggestionsLoading(false);
      }
    } else {
      setSuggestions([]);
    }
  }, []);

  const fetchCollege = useCallback(async (collegeSlug) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_SERVER_URL}/colleges`
      );
      const { data } = await response.json();
      setCollege(data.find((data) => data.slug === collegeSlug));
    } catch (error) {
      console.error("Error fetching college data:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchCourse = useCallback(async (courseSlug) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_SERVER_URL}/courses`
      );
      const { data } = await response.json();
      setCourse(data.find((course) => course.slug === courseSlug));
    } catch (error) {
      console.error("Error fetching course data:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchSemesterData = useCallback(
    async (collegeSlug, courseSlug, semesterSlug) => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_SERVER_URL}/semesters`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const { data } = await response.json();
        const semesterData = data.semesters.find(
          (semester) =>
            semester.college.slug === collegeSlug &&
            semester.course.slug === courseSlug &&
            semester.number === +semesterSlug.charAt(4)
        );
        setSubjects(semesterData.subjects);
      } catch (error) {
        console.error("Error fetching semester data:", error);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const fetchFiles = useCallback(
    async (
      collegeSlug,
      courseSlug,
      semesterSlug,
      currentSubjectCode,
      currentModule
    ) => {
      setIsLoading(true);
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
      } catch (error) {
        console.error("Error fetching files: ", error);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const value = {
    college,
    course,
    subjects,
    modules,
    files,
    isLoading,
    fetchCollege,
    fetchCourse,
    fetchSemesterData,
    fetchFiles,
    setModules,
    isSuggestionsLoading,
    suggestions,
    fetchSuggestions,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => useContext(AppContext);
