import { useParams } from "react-router-dom";

function SemesterPage() {
  const { collegeName, courseName, semesterName } = useParams();

  return (
    <div>
      <h1>
        {collegeName.toUpperCase()} - {courseName.toUpperCase()} -{" "}
        {semesterName.toUpperCase()}
      </h1>
      <p>Information about the semester.</p>
      {/* You can add more details about the semester here */}
    </div>
  );
}

export default SemesterPage;
