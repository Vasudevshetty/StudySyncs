import { Link, useNavigate } from "react-router-dom";
import Banner from "./Banner";
import ContentList from "./ContentList";
import Description from "./Description";
import Sidebar from "./Sidebar";
import styles from "./styles/app.module.css";
import { useState } from "react";

const dummyCollege = {
  name: "sjce",
  courses: ["cse", "me", "ece", "civil", "ei", "csbs", "ise"],
  description:
    "Sri Jayachamarajendra College of Engineering (SJCE) is a prestigious institution located in Mysuru, India. Established in 1963, SJCE is renowned for its commitment to academic excellence, state-of-the-art facilities, and vibrant campus life. The college offers a wide range of undergraduate and postgraduate programs in engineering and technology. With a focus on innovation, research, and holistic development, SJCE nurtures talented engineers who excel globally.",
};

function College() {
  // eslint-disable-next-line no-unused-vars
  const [college, setCollege] = useState(dummyCollege);
  const navigate = useNavigate();

  function handleCourseClick(courseName) {
    navigate(`/app/college/${college.name}/${courseName}`);
  }

  return (
    <>
      <Sidebar>
        <Link to="/app/college/" className={styles.sidebarLink}>
          SJCE
        </Link>
        <Link to="/app/college/" className={styles.sidebarLink}>
          Other College
        </Link>
      </Sidebar>
      <div className={styles.mainContent}>
        <div className={styles.breadcrumb}>{college.name.toUpperCase()}</div>
        <Banner
          img="background.jpeg"
          title="Sri JayaChamrajendra College of Engineering"
        />
        <div className={styles.content}>
          <ContentList
            content={college.courses}
            handleClick={handleCourseClick}
          />
          <Description content={college.description} />
        </div>
      </div>
    </>
  );
}

export default College;
