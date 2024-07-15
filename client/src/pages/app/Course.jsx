import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Banner from "./Banner";
import ContentList from "./ContentList";
import Description from "./Description";
import Sidebar from "./Sidebar";
import styles from "./styles/app.module.css";

function CoursePage() {
  const { collegeSlug, courseSlug } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [course, setCourse] = useState({});

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://studysyncs.onrender.com/api/v1/courses"
        );
        const { data } = await response.json();
        setCourse(data.find((course) => course.slug === courseSlug));
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching course data:", error);
        setIsLoading(false);
      }
    }
    fetchData();
  }, [courseSlug]);

  const handleSemesterClick = (semesterNo) => {
    navigate(`/app/colleges/${collegeSlug}/${courseSlug}/sem-${semesterNo}`);
  };

  const semesters = Array.isArray(course.semesters) ? course.semesters : [];

  return (
    <>
      <Sidebar></Sidebar>
      <div className={styles.mainContent}>
        <div className={styles.breadcrumb}>
          <div>
            <Link to={`/app/colleges/${collegeSlug}`}>
              {collegeSlug.toUpperCase()}
            </Link>
            / {courseSlug.toUpperCase()}
          </div>
        </div>
        <Banner
          img={`course/${course.bgImgUrl}`}
          title={`${course.name}`}
          isLoading={isLoading}
        />
        <div className={styles.content}>
          <ContentList
            content={semesters}
            handleClick={handleSemesterClick}
            isLoading={isLoading}
          />
          <Description content={course.description} isLoading={isLoading} />
        </div>
      </div>
    </>
  );
}

export default CoursePage;
