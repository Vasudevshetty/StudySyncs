import { useState } from "react";
import Header from "./Header";
import Modal from "./Modal";
import Footer from "./Footer";

function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function toggleModal() {
    setIsModalOpen(!isModalOpen);
  }

  return (
    <>
      <Header toggleModal={toggleModal} />
      <Footer />

      <Modal isModalOpen={isModalOpen} toggleModal={toggleModal} />
      {isModalOpen && <div className="overlay"></div>}
    </>
  );
}

export default HomePage;
