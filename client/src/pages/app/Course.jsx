import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../../contexts/AppContext";
import Banner from "./Banner";
import ContentList from "./ContentList";
import Description from "./Description";
import Sidebar from "./Sidebar";
import styles from "./styles/app.module.css";

function CoursePage() {
  const { collegeSlug, courseSlug } = useParams();
  const navigate = useNavigate();
  const { course, isLoading, fetchCourse } = useAppContext();

  useEffect(() => {
    fetchCourse(courseSlug);
  }, [courseSlug, fetchCourse]);

  const handleSemesterClick = (semesterNo) => {
    navigate(`/app/colleges/${collegeSlug}/${courseSlug}/sem-${semesterNo}`);
  };

  return (
    <>
      <Sidebar />
      <div className={styles.mainContent}>
        <div className={styles.breadcrumb}>
          <div>
            <Link to="/">HOME/ </Link>
            <Link to={`/app/colleges/${collegeSlug}`}>
              {collegeSlug.toUpperCase()}
            </Link>
            / {courseSlug.toUpperCase()}
          </div>
        </div>
        <Banner
          img={`course/${course.bgImgUrl}`}
          title={`${course.name}`}
          isLoading={isLoading.course}
        />
        <div className={styles.content}>
          <ContentList
            content={course.semesters}
            handleClick={handleSemesterClick}
            isLoading={isLoading.course}
          />
          <Description
            content={course.description}
            isLoading={isLoading.course}
          />
        </div>
      </div>
    </>
  );
}

export default CoursePage;
