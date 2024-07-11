import { useParams, useNavigate } from "react-router-dom";
import Banner from "./Banner";
import ContentList from "./ContentList";
import Description from "./Description";
import styles from "./styles/app.module.css";

function CoursePage() {
  const { collegeName, courseName } = useParams();
  const navigate = useNavigate();

  const handleSemesterClick = (semester) => {
    navigate(`/app/college/${collegeName}/${courseName}/sem${semester}`);
  };

  return (
    <>
      <div>
        {collegeName.toUpperCase()}/{courseName.toUpperCase()}
      </div>
      <Banner img={courseName === "cse" ? "cse.webp" : "me.jpg"} />

      <div className={styles.content}>
        <ContentList
          content={[1, 2, 3, 4, 5, 6, 7, 8]}
          handleClick={handleSemesterClick}
        />
        <Description content="hello world" />
      </div>
    </>
  );
}

export default CoursePage;
