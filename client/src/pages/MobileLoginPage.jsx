import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import styles from "./home/styles/AuthPage.module.css";
import Loader from "./app/Loader";

function MobileLoginPage() {
  const { login, skipAuth, isLoading, isAuth } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await login(formData);
      navigate("../app/me"); // Redirect to the Me page
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleSkip = async () => {
    try {
      await skipAuth();
      navigate("../app/me"); // Redirect to a free-tier access route
    } catch (error) {
      console.error("Error skipping authentication:", error.message);
    }
  };

  return (
    <div className={`${styles.authPage} ${styles.loginPage}`}>
      <Link to="/" className={styles.logo}>
        <img src="/img/logo-final-light.png" alt="logo" />
      </Link>
      <h2>
        Home page isn&#39;t responsive yet, will be added soon ! <br /> Use
        desktop site in the options to check out. !
      </h2>
      <div className={`${styles.authContainer} ${styles.loginContainer}`}>
        {isAuth ? (
          <h3>
            You are already logged :) | <Link to="/app/me">Get in</Link>
          </h3>
        ) : isLoading.login ? (
          <Loader />
        ) : (
          <>
            <h1>Log in</h1>
            <form className={styles.authForm} onSubmit={handleLogin}>
              <div>
                <label>Email: </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="user@example.com"
                  required
                />
              </div>
              <div>
                <label>Password: </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              <div className={styles.signupContainer}>
                <p> New here ! Welcome to studysyncs</p>
                <Link to={"/auth"}>Sign up</Link>
              </div>
              <div className="button-container">
                <button
                  type="button"
                  className="btn btn-skip"
                  onClick={handleSkip}
                >
                  <img src="/img/next.png" alt="" />
                  Skip
                </button>
                <button type="submit" className="btn">
                  Login
                  <img src="/img/login.png" alt="login" />
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default MobileLoginPage;
