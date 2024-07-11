import { useParams, useNavigate } from "react-router-dom";

function CoursePage() {
  const { collegeName, courseName } = useParams();
  const navigate = useNavigate();

  const handleSemesterClick = (semester) => {
    navigate(`/app/college/${collegeName}/${courseName}/${semester}`);
  };

  return (
    <div>
      <h1>
        {collegeName.toUpperCase()} - {courseName.toUpperCase()}
      </h1>
      <p>Information about the course.</p>
      <ul>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((semester) => (
          <li
            key={semester}
            onClick={() => handleSemesterClick(`sem${semester}`)}
          >
            Semester {semester}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CoursePage;
