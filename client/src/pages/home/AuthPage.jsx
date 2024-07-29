import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import styles from "./styles/AuthPage.module.css";
import Loader from "../app/Loader";

const AuthPage = () => {
  const { signup, skipAuth, isLoading } = useAuth();
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
        const courseResponse = await fetch(
          `${import.meta.env.VITE_BACKEND_SERVER_URL}/courses`
        );
        const { data: courseData } = await courseResponse.json();
        setSemesters(
          courseData.find((course) => course.slug === formData.course).semesters
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
      navigate("/app/me"); // Redirect to home page on successful signup
    } catch (error) {
      console.error("Signup failed:", error.message);
    }
  };

  const handleSkip = () => {
    skipAuth();
    navigate("/app/me"); // Redirect to app page
  };

  return (
    <div className={styles.authPage}>
      <Link to="/" className={styles.logo}>
        <img src="/img/logo-final-light.png" alt="logo" />
      </Link>
      <div className={styles.authContainer}>
        <h1>Sign in</h1>
        {isLoading ? (
          <Loader />
        ) : (
          <form className={styles.authForm} onSubmit={handleSubmit}>
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
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
            </div>
            <div>
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
            </div>
            <div>
              <label>Current Semester:</label>
              <select
                name="currentSemester"
                value={formData.currentSemester}
                onChange={handleChange}
                required
              >
                <option value="">Select a semester</option>
                {semesters?.map((semester) => (
                  <option key={semester._id} value={semester.number}>
                    {semester.number}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Confirm Password:</label>
              <input
                type="password"
                name="passwordConfirm"
                value={formData.passwordConfirm}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <button type="submit">
                <img src="/img/signup.png" alt="signup" />
                Sign Up
              </button>
              <button type="button" onClick={handleSkip}>
                <img src="/img/next.png" alt="signup" />
                Skip
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
