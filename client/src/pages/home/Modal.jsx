// src/components/Modal.js
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../app/Loader";
import { useAuth } from "../../contexts/AuthContext";

function Modal({ isModalOpen, toggleModal }) {
  const { login, skipAuth } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "vasudeepu2815@gmail.com",
    password: "vasudev@39",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") toggleModal();
    };

    if (isModalOpen) document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isModalOpen, toggleModal]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(formData);
      navigate("/app/me"); // Redirect to the Me page
      toggleModal(); // Close the modal
      setIsLoading(false);
    } catch (error) {
      setErrorMessage(error.message);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = () => {
    navigate("/auth"); // Navigate to the AuthPage
    toggleModal(); // Close the modal
  };

  const handleSkip = async () => {
    try {
      await skipAuth();
      navigate("/app/colleges/*"); // Redirect to a free-tier access route
    } catch (error) {
      console.error("Error skipping authentication:", error.message);
    } finally {
      toggleModal(); // Close the modal
    }
  };

  return (
    <div className={`modal ${!isModalOpen ? "hidden" : ""}`}>
      {isLoading ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <button className="btn--close-modal" onClick={toggleModal}>
            &times;
          </button>
          <h2 className="modal__header">
            Welcome to <span className="highlight">StudySyncs</span>
          </h2>

          <form className="modal__form" onSubmit={handleLogin}>
            <label>Email: </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label>Password: </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className="button-container">
              <button type="submit" className="btn">
                Login &rarr;
              </button>
              <button
                type="button"
                className="btn btn-signup"
                onClick={handleSignup}
              >
                New here? Sign up &rarr;
              </button>
              <button
                type="button"
                className="btn btn-skip"
                onClick={handleSkip}
              >
                Skip
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}

export default Modal;
