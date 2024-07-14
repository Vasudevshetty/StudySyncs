import { Link, useNavigate } from "react-router-dom";
import Banner from "./Banner";
import ContentList from "./ContentList";
import Description from "./Description";
import Sidebar from "./Sidebar";
import styles from "./styles/app.module.css";
import { useEffect, useState } from "react";
import FullPageLoader from "./FullPageLoader";

function College() {
  const [college, setCollege] = useState(null); // Initialize as null
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
        console.log(error);
        setIsLoading(false); // Ensure loading state is reset
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

  if (isLoading) {
    return <FullPageLoader />;
  }

  if (!college) {
    return <div>No college data found</div>;
  }

  return (
    <>
      <Sidebar>
        <Link to="/">Home</Link>
      </Sidebar>
      <div className={styles.mainContent}>
        <div className={styles.breadcrumb}>{college.slug.toUpperCase()}</div>
        <Banner
          img={`/college/${college.bgImgUrl}`}
          title="Sri JayaChamrajendra College of Engineering"
        />
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
