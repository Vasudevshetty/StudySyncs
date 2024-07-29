import { useEffect } from "react";
import { useAppContext } from "../../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";
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
        <div className={styles.breadcrumb}>
          <div>
            <Link to="/">HOME / </Link>
            {college.slug.toUpperCase()}
          </div>
        </div>
        <Banner img={`/college/${college.bgImgUrl}`} title={college.name} />
        <div className={styles.content}>
          <ContentList
            content={college.courses || []}
            isLoading={isLoading.collegej}
            handleClick={handleCourseClick}
          />
          <Description
            isLoading={isLoading.college}
            content={college.description}
          />
        </div>
      </div>
    </>
  );
}

export default College;
