import { Link, useParams } from "react-router-dom";
import styles from "./styles/app.module.css";

function SemesterPage() {
  const { collegeName, courseName, semesterName } = useParams();

  return (
    <div>
      <div className={styles.breadcrumb}>
        <Link to={`/app/college/`}>{collegeName.toUpperCase()}</Link>/
        <Link to={`/app/college/${collegeName}/${courseName}`}>
          {courseName.toUpperCase()}
        </Link>
        /{semesterName.toUpperCase()}
      </div>
      <div className={styles.content}>
        <div className={styles.moduleBox}>hello</div>
        <div className={styles.filesBox}>world</div>
      </div>
    </div>
  );
}

export default SemesterPage;
