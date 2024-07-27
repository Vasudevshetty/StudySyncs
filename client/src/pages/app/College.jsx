import { useEffect } from "react";
import { useAppContext } from "../../contexts/AppContext";
import { useNavigate } from "react-router-dom";
import Banner from "./Banner";
import ContentList from "./ContentList";
import Description from "./Description";
import Sidebar from "./Sidebar";
import styles from "./styles/app.module.css";
import Loader from "./Loader";

function College({ collegeSlug }) {
  const { college, isLoading, fetchCollege } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCollege(collegeSlug);
  }, [collegeSlug, fetchCollege]);

  const handleCourseClick = (courseName) => {
    navigate(`/app/colleges/${college.slug}/${courseName}`);
  };

  return !college ? (
    <Loader />
  ) : (
    <>
      <Sidebar />
      <div className={styles.mainContent}>
        <div className={styles.breadcrumb}>{college.slug.toUpperCase()}</div>
        <Banner img={`/college/${college.bgImgUrl}`} title={college.name} />
        <div className={styles.content}>
          <ContentList
            content={college.courses || []}
            isLoading={isLoading}
            handleClick={handleCourseClick}
          />
          <Description isLoading={isLoading} content={college.description} />
        </div>
      </div>
    </>
  );
}

export default College;
