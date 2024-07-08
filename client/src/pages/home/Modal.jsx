import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Modal({ isModalOpen, toggleModal }) {
  const navigate = useNavigate();

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") toggleModal();
    };

    if (isModalOpen) document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isModalOpen, toggleModal]);

  function handleSubmit(e) {
    e.preventDefault();
    // Add your form submission logic here (e.g., form validation, API calls, etc.)
    // After form submission logic, navigate to the /app page
    navigate("/app");
  }

  return (
    <div className={`modal ${!isModalOpen ? "hidden" : ""}`}>
      <button className="btn--close-modal" onClick={toggleModal}>
        &times;
      </button>
      <h2 className="modal__header">
        Fill all the details to <br />
        <span className="highlight">Explore more</span>
        <br />
      </h2>

      <form className="modal__form" onSubmit={handleSubmit}>
        <label>Name : </label>
        <input type="text" disabled />
        <label>USN : </label> <input type="text" disabled />
        <label>Email Address : </label>
        <input type="email" disabled />
        <button className="btn">Next step &rarr;</button>
      </form>
      <div
        className="modal__message"
        style={{
          fontSize: "2.2rem",
          fontWeight: "bold",
          marginTop: "20px",
          textAlign: "center",
          color: "#333",
        }}
      >
        <span className="highlight">Authentication</span> will be added later.
      </div>
    </div>
  );
}

export default Modal;
