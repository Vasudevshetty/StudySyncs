import { useState } from "react";
import Header from "./Header";
import Modal from "./Modal";
import Footer from "./Footer";
import Features from "./Features";
import Operations from "./Operations";
import Testimonials from "./Testimonials";
import Signup from "./Signup";

function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function toggleModal() {
    setIsModalOpen(!isModalOpen);
  }

  return (
    <>
      <Header toggleModal={toggleModal} />
      <Features />
      <Operations />
      <Testimonials />
      <Signup toggleModal={toggleModal} />
      <Footer />

      <Modal isModalOpen={isModalOpen} toggleModal={toggleModal} />
      {isModalOpen && <div className="overlay"></div>}
    </>
  );
}

export default HomePage;
