import { useNavigate } from "react-router-dom";
import Banner from "./Banner";
import ContentList from "./ContentList";
import Description from "./Description";
import styles from "./styles/app.module.css";

const college = {
  name: "vvce",
  courses: ["cse", "me", "ece", "civil", "ei", "csbs", "ise"],
};

function College() {
  const navigate = useNavigate();

  function handleCourseClick(courseName) {
    navigate(`/app/college/${college.name}/${courseName}`);
  }

  return (
    <>
      <Banner img="background.jpeg" />
      <div className={styles.content}>
        <ContentList
          content={college.courses}
          handleClick={handleCourseClick}
        />
        <Description content="hello world" />
      </div>
    </>
  );
}

export default College;
