import { useState } from "react";
import Header from "./Header";
import Modal from "./Modal";

function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function toggleModal() {
    setIsModalOpen(!isModalOpen);
  }

  console.log(isModalOpen);

  return (
    <>
      <Header toggleModal={toggleModal} />
      <Modal isModalOpen={isModalOpen} toggleModal={toggleModal} />
      {isModalOpen && <div className="overlay"></div>}
    </>
  );
}

export default HomePage;
