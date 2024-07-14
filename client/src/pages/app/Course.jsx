import { useParams, useNavigate, Link } from "react-router-dom";
import Banner from "./Banner";
import ContentList from "./ContentList";
import Description from "./Description";
import styles from "./styles/app.module.css";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import FullPageLoader from "./FullPageLoader";

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
        setCourse(data[0]);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const handleSemesterClick = (semesterNo) => {
    navigate(`/app/colleges/${collegeSlug}/${courseSlug}/sem-${semesterNo}`);
  };

  const semesters = Array.isArray(course.semesters) ? course.semesters : [];
  if (isLoading) return <FullPageLoader />;

  return (
    <>
      <Sidebar>
        <Link to="/">
          <div className={styles.homeIcon}>
            <img src="/img/home.png" alt="home icon" />
            <span>Home</span>
          </div>
        </Link>
      </Sidebar>
      <div className={styles.mainContent}>
        <div className={styles.breadcrumb}>
          <Link to={`/app/colleges/${collegeSlug}`}>
            {collegeSlug.toUpperCase()}
          </Link>
          / {courseSlug.toUpperCase()}
        </div>
        <Banner
          img={`course/${course.bgImgUrl}`}
          title="Computer science of engineering"
        />

        <div className={styles.content}>
          <ContentList content={semesters} handleClick={handleSemesterClick} />
          <Description content={course.description} />
        </div>
      </div>
    </>
  );
}

export default CoursePage;
