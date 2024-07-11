import { useNavigate } from "react-router-dom";
import styles from "./styles/app.module.css";

const colleges = [
  { name: "sjce", courses: ["cse", "me", "ece"] },
  { name: "vvce", courses: ["eee", "civil", "ise"] },
];

function College() {
  return (
    <>
      <Banner />
      <ContentList college={colleges[0]} />
    </>
  );
}

export default College;

function Banner() {
  return (
    <div className={styles.banner}>
      <div className={styles.bannerBg}></div>
    </div>
  );
}

function ContentList({ college }) {
  const navigate = useNavigate();
  function handleCourseClick(collegeName, courseName) {
    navigate(`/app/college/${collegeName}/${courseName}`);
  }

  return (
    <ul>
      <div>
        <h2>{college.name.toUpperCase()}</h2>
        <ul>
          {college.courses.map((course) => (
            <li
              key={course}
              onClick={() => handleCourseClick(college.name, course)}
            >
              {course.toUpperCase()}
            </li>
          ))}
        </ul>
      </div>
    </ul>
  );
}
