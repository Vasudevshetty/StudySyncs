import { useEffect } from "react";

function Modal({ isModalOpen, toggleModal }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") toggleModal();
    };

    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isModalOpen]);

  return (
    <div className={`modal ${!isModalOpen ? "hidden" : ""}`}>
      <button className="btn--close-modal" onClick={toggleModal}>
        &times;
      </button>
      <h2 className="modal__header">
        Fill all the details to <br />
        <span className="highlight">Explore more</span>
      </h2>
      <form className="modal__form">
        <label>Name : </label>
        <input type="text" required />
        <label>USN : </label> <input type="text" required />
        <label>Email Address : </label>
        <input type="email" required />
        <button className="btn">Next step &rarr;</button>
      </form>
    </div>
  );
}

export default Modal;
