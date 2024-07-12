import { useParams, useNavigate, Link } from "react-router-dom";
import Banner from "./Banner";
import ContentList from "./ContentList";
import Description from "./Description";
import styles from "./styles/app.module.css";
import Sidebar from "./Sidebar";

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
          <Link
            to={`/app/college/${collegeName}/cse`}
            className={styles.sidebarLink}
          >
            CSE
          </Link>
          <Link
            to={`/app/college/${collegeName}/ise`}
            className={styles.sidebarLink}
          >
            ISE
          </Link>
          <Link
            to={`/app/college/${collegeName}/mech`}
            className={styles.sidebarLink}
          >
            MECH
          </Link>
          <Link
            to={`/app/college/${collegeName}/civil`}
            className={styles.sidebarLink}
          >
            CIVIL
          </Link>
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
