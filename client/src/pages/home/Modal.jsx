import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Modal({ isModalOpen, toggleModal }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "Vasudev D M",
    usn: "01JST22UCS169",
    email: "vasudeepu2815@gmail.com",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("profileData", JSON.stringify(formData)); // Store data in local storage
    navigate("/app/colleges/*");
    toggleModal(); // Close the modal
  };

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
        <label>Name: </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          disabled
          onChange={handleChange}
        />
        <label>USN: </label>
        <input
          type="text"
          name="usn"
          value={formData.usn}
          disabled
          onChange={handleChange}
        />
        <label>Email Address: </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          disabled
          onChange={handleChange}
        />
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
