import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Modal({ isModalOpen, toggleModal }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "vasudeepu2815@gmail.com",
    password: "VasudevShetty@39",
  });

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

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem("profileData", JSON.stringify(formData)); // Store data in local storage
    navigate("/app/colleges/*");
    toggleModal(); // Close the modal
  };

  const handleSignup = () => {
    navigate("/auth"); // Navigate to the AuthPage
    toggleModal(); // Close the modal
  };

  const handleSkip = () => {
    navigate("/app/colleges"); // Or any route you want to redirect for free-tier access
    toggleModal(); // Close the modal
  };

  return (
    <div className={`modal ${!isModalOpen ? "hidden" : ""}`}>
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
          <button type="button" className="btn btn-skip" onClick={handleSkip}>
            Skip
          </button>
        </div>
      </form>
    </div>
  );
}

export default Modal;
