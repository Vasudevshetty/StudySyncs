import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../app/Loader";

function Modal({ isModalOpen, toggleModal }) {
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

  // src/components/Modal.js
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_SERVER_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include", // Include cookies
        }
      );
      if (response.ok) {
        navigate("app/me"); // Redirect to the Me page
        setIsLoading(false);
        toggleModal(); // Close the modal
      } else {
        setIsLoading(false);
        const result = await response.json();
        console.error("Login failed:", result.message);
        setErrorMessage(result.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsLoading(false);
      setErrorMessage(error.message);
    }
  };

  const handleSignup = () => {
    navigate("/auth"); // Navigate to the AuthPage
    toggleModal(); // Close the modal
  };

  const handleSkip = () => {
    navigate("/app/colleges/*"); // Or any route you want to redirect for free-tier access
    toggleModal(); // Close the modal
  };

  return (
    <div className={`modal ${!isModalOpen ? "hidden" : ""}`}>
      {isLoading ? (
        <Loader />
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
            />
            <label>Password: </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
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
