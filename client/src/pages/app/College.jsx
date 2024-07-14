import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Banner from "./Banner";
import ContentList from "./ContentList";
import Description from "./Description";
import Sidebar from "./Sidebar";
import styles from "./styles/app.module.css";
import Loader from "./Loader";

function College() {
  const [college, setCollege] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://studysyncs.onrender.com/api/v1/colleges"
        );
        const { data } = await response.json();
        setCollege(data[0]);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching college data:", error);
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (college) navigate(`/app/colleges/${college.slug}`);
  }, [college, navigate]);

  const handleCourseClick = (courseName) => {
    navigate(`/app/colleges/${college.slug}/${courseName}`);
  };

  return !college ? (
    <Loader />
  ) : (
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
