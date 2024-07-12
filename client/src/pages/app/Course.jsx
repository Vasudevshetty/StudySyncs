import { useParams, useNavigate, Link } from "react-router-dom";
import Banner from "./Banner";
import ContentList from "./ContentList";
import Description from "./Description";
import styles from "./styles/app.module.css";
import Sidebar from "./Sidebar";

const courses = ["CSE", "ISE", "CIVIL"];

function CoursePage() {
  const { collegeName, courseName } = useParams();
  const navigate = useNavigate();

  const handleSemesterClick = (semester) => {
    navigate(`/app/college/${collegeName}/${courseName}/sem${semester}`);
  };

  return (
    <>
      <Sidebar>
        <>
          {courses.map((course) => (
            <Link
              to={`/app/college/${collegeName}/${course}`}
              className={styles.sidebarLink}
              key={course}
            >
              {course}
            </Link>
          ))}
        </>
      </Sidebar>
      <div className={styles.mainContent}>
        <div className={styles.breadcrumb}>
          <Link to={`/app/college/`}>{collegeName.toUpperCase()}</Link>/{" "}
          {courseName.toUpperCase()}
        </div>
        <Banner
          img={courseName === "cse" ? "cse.webp" : "me.jpg"}
          title="Computer science of engineering"
        />

        <div className={styles.content}>
          <ContentList
            content={[1, 2, 3, 4, 5, 6, 7, 8]}
            handleClick={handleSemesterClick}
          />
          <Description content="hello world" />
        </div>
      </div>
    </>
  );
}

export default CoursePage;
