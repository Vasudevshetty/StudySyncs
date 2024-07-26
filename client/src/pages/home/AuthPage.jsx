import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import styles from "./styles/AuthPage.module.css";

const AuthPage = () => {
  const { signup, skipAuth } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    college: "",
    course: "",
    currentSemester: "",
    password: "",
    passwordConfirm: "",
  });
  const [colleges, setColleges] = useState([]);
  const [courses, setCourses] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch colleges initially
    const fetchColleges = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_SERVER_URL}/colleges`
        );
        const data = await response.json();
        setColleges(data.data);
      } catch (error) {
        console.error("Error fetching colleges:", error);
      }
    };

    fetchColleges();
  }, []);

  useEffect(() => {
    // Fetch courses and semesters when college is selected
    const fetchRelatedData = async () => {
      if (!formData.college) return;

      const collegeSlug = formData.college;
      try {
        const courseResponse = await fetch(
          `${import.meta.env.VITE_BACKEND_SERVER_URL}/courses`
        );
        const courseData = await courseResponse.json();
        setCourses(
          courseData.data.filter(
            (course) => course.college.slug === collegeSlug
          )
        );
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchRelatedData();
  }, [formData.college]);

  useEffect(() => {
    // Fetch semesters when course is selected
    const fetchSemesters = async () => {
      if (!formData.course) return;

      try {
        const collegeSlug = formData.college;
        const courseSlug = formData.course;

        const semesterResponse = await fetch(
          `${import.meta.env.VITE_BACKEND_SERVER_URL}/semesters`
        );
        const semesterData = await semesterResponse.json();
        setSemesters(
          semesterData.data.semesters.filter(
            (semester) =>
              semester.college.slug === collegeSlug &&
              semester.course.slug === courseSlug
          )
        );
      } catch (error) {
        console.error("Error fetching semesters:", error);
      }
    };

    fetchSemesters();
  }, [formData.college, formData.course]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(formData);
      navigate("/app/colleges/*"); // Redirect to home page on successful signup
    } catch (error) {
      console.error("Signup failed:", error.message);
    }
  };

  const handleSkip = () => {
    skipAuth();
    navigate("/app/colleges/*"); // Redirect to app page
  };

  return (
    <div className={styles.authPage}>
      <div className={styles.authContainer}>
        <h2 className="modal__header">
          <span className="highlight">Sign Up</span>
        </h2>
        <form className={styles.authForm} onSubmit={handleSubmit}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label>College:</label>
          <select
            name="college"
            value={formData.college}
            onChange={handleChange}
            required
          >
            <option value="">Select a college</option>
            {colleges?.map((college) => (
              <option key={college._id} value={college.slug}>
                {college.name}
              </option>
            ))}
          </select>
          <label>Course:</label>
          <select
            name="course"
            value={formData.course}
            onChange={handleChange}
            required
          >
            <option value="">Select a course</option>
            {courses?.map((course) => (
              <option key={course._id} value={course.slug}>
                {course.name}
              </option>
            ))}
          </select>
          <label>Current Semester:</label>
          <select
            name="currentSemester"
            value={formData.currentSemester}
            onChange={handleChange}
            required
          >
            <option value="">Select a semester</option>
            {semesters?.map((semester) => (
              <option key={semester._id} value={semester.slug}>
                {semester.number}
              </option>
            ))}
          </select>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <label>Confirm Password:</label>
          <input
            type="password"
            name="passwordConfirm"
            value={formData.passwordConfirm}
            onChange={handleChange}
            required
          />
          <button type="submit" className="btn btn-signup">
            Sign Up
          </button>
          <button type="button" className="btn btn-skip" onClick={handleSkip}>
            Skip
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
